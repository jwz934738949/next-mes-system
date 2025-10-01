import { sql } from "drizzle-orm";
import db from "@/lib/db";
import { sysMenu } from "@/lib/db/schema";
import { ResponseHandler } from "@/lib/response";
import { MenuResp, MenuTreeResp } from "@/types/menu";

// 定义 GET 请求处理函数
export async function GET() {
  try {
    // 从数据库查询菜单数据
    const menuData: MenuResp[] = await db
      .select()
      .from(sysMenu)
      .where(sql`del_flag = '0' and status = '0'`)
      .orderBy(sql`order_num asc`)
      .execute();

    // 转换为树形结构
    const buildTree = (menuList: MenuResp[], parentId: number = -1): MenuTreeResp[] => {
      // 查找当前父节点的所有子节点
      const children = menuList.filter(menu => menu.parentId === parentId);

      // 递归处理每个子节点，为其添加children属性
      return children.map((child: MenuResp) => ({
        ...child,
        children: buildTree(menuList, child.menuId)
      }));
    }


    const treeData = buildTree(menuData);

    // 使用 ResponseHandler 返回成功响应
    return ResponseHandler.success(treeData, "获取菜单数据成功");
  } catch (error) {
    console.error("获取菜单数据时发生错误:", error);

    // 使用 ResponseHandler 返回错误响应
    return ResponseHandler.error(
      "获取菜单数据失败",
      error instanceof Error ? error.message : undefined
    );
  }
}

// 定义 POST 请求处理函数
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("接收到的新菜单数据:", body);

    // 使用 drizzle 向 sysMenu 表中插入数据
    await db
      .insert(sysMenu)
      .values({
        menuName: body.menuName,
        menuType: body.menuType ?? "M",
        parentId: body.parentId ?? -1,
        path: body.path ?? "",
        query: body.query ?? "",
        component: body.component ?? "",
        orderNum: body.orderNum ?? 0,
        icon: body.icon ?? "",
        isFrame: body.isFrame ?? "1",
        isCache: body.isCache ?? "0",
        perms: body.perms ?? "",
        visible: body.visible ?? "0",
        status: body.status ?? "0",
        delFlag: "0",
        createBy: body.createBy ?? "system",
        updateBy: body.updateBy ?? "system",
        createTime: sql`(CURRENT_TIMESTAMP(6))`,
        updateTime: sql`(CURRENT_TIMESTAMP(6))`,
        remark: body.remark ?? "",
      })
      .execute();

    // 查询刚插入的菜单数据
    const newMenu = await db
      .select()
      .from(sysMenu)
      .where(sql`menu_id = LAST_INSERT_ID()`)
      .execute();

    // 使用 ResponseHandler 返回成功响应
    return ResponseHandler.success(
      { menu: newMenu[0] }, // 返回创建的菜单数据
      "菜单创建成功"
    );
  } catch (error) {
    console.error("创建菜单时发生错误:", error);

    // 使用 ResponseHandler 返回错误响应
    return ResponseHandler.error(
      "创建菜单失败",
      error instanceof Error ? error.message : undefined
    );
  }
}
