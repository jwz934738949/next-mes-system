import type { AddMenuReq, AllMenusReq, MenuResp, MenuTreeResp } from "@/types/menu";
import type { ApiResponse } from "@/types/request";
import client from "../index";

export const menuApi = {
  // 获取所有菜单
  getAllMenus: async (params: AllMenusReq) =>
    await client
      .get("menus", {
        searchParams: { ...params },
      })
      .json<ApiResponse<MenuResp[]>>(),
  // 获取树形菜单
  getMenusTree: async (params: AllMenusReq) =>
    await client
      .get("menu", {
        searchParams: { ...params },
      })
      .json<ApiResponse<MenuTreeResp[]>>(),
  // 新增菜单
  addMenuByParentId: async (params: AddMenuReq) =>
    await client
      .post("menu", {
        json: params,
      })
      .json<ApiResponse<MenuResp>>(),
  // 更新菜单
  updateMenuByMenuId: async (params: MenuResp) =>
    await client
      .put("menu", {
        json: params,
      })
      .json<ApiResponse<MenuResp>>(),
  // 删除菜单
  deleteMenuByMenuId: async (menuId: number) => await client.delete("menu", { json: { menuId } }).json<ApiResponse<null>>(),
};
