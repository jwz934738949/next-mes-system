"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import MesDrawer from "@/components/MesDrawer";
import MesForm from "@/components/MesForm";
import MesTable from "@/components/MesTable";
import { Button } from "@/components/ui/button";
import { HTTP_STATUS_CODE } from "@/lib/constant";
import { menuApi } from "@/lib/request/modules/menu";
import type { AllMenusReq, MenuTreeResp } from "@/types/menu";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

const Menu = () => {
  const [showAddTopMenu, setShowAddTopMenu] = useState(false);
  const [menuData, setMenuData] = useState<MenuTreeResp[]>([]);

  const menuTypeOptions = [
    { value: "M", label: "目录" },
    { value: "C", label: "菜单" },
    { value: "U", label: "按钮" },
  ];

  const columns: ColumnDef<MenuTreeResp>[] = [
    {
      header: "菜单名称",
      accessorKey: "menuName",
    },
    {
      header: "菜单类型",
      accessorKey: "menuType",
      cell: ({ row }) => {
        const menuType = row.getValue("menuType") as string;

        return <div>{menuTypeOptions.find(item => item.value === menuType)?.label ?? menuType}</div>
      },
    },
    {
      header: '菜单编码',
      accessorKey: "path",
    },
    {
      header: '路由编码',
      accessorKey: "component",
    },
    {
      header: '排序值',
      accessorKey: "orderNum",
    },
    {
      header: '权限',
      accessorKey: "perms",
    },
    {
      header: '是否可见',
      accessorKey: "visible",
    },
    {
      header: '是否启用',
      accessorKey: "status",
    },
    {
      header: '创建人',
      accessorKey: "createBy",
    },
    {
      header: '创建时间',
      accessorKey: "createTime",
      cell: ({ row }) => {
        const createTime = row.getValue("createTime") as string;

        return <div>{dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
      },
    },
    {
      header: '更新人',
      accessorKey: "updateBy",
    },
    {
      header: '更新时间',
      accessorKey: "updateTime",
      cell: ({ row }) => {
        const updateTime = row.getValue("updateTime") as string;

        return <div>{dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")}</div>
      },
    }
  ];



  useEffect(() => {
    getMenuData();
  }, []);


  const getMenuData = async () => {
    try {
      const res = await menuApi.getMenusTree({});
      if (res.code === HTTP_STATUS_CODE.OK) {
        console.log("success", res.data);
        setMenuData(res.data ?? []);
      }
    } catch (error) {
      console.error("获取菜单数据失败", error);
    }
  }

  const formSchema = z.object({
    menuName: z.string().min(1, { message: "菜单名称是必填项" }),
    menuType: z.string().min(1, { message: "菜单类型是必填项" }),
  });
  const formInstance = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: "",
      menuType: "",
    },
  });

  const handleSubmit = formInstance.handleSubmit(async (values: unknown) => {
    try {
      console.log(values);

      const res = await menuApi.addMenuByParentId(values as AllMenusReq);
      if (res.code === HTTP_STATUS_CODE.OK) {
        console.log("success", res.data);
      } else {
        console.error("添加菜单失败");
      }
    } catch (error) {
      console.error("添加菜单失败", error);
    }
  });

  return (
    <div>
      <MesTable
        columns={columns}
        data={menuData}
        headerBtns={
          <Button onClick={() => setShowAddTopMenu(true)}>添加顶级菜单</Button>
        }
      />
      <MesDrawer
        onCancel={() => setShowAddTopMenu(false)}
        onOk={handleSubmit}
        open={showAddTopMenu}
        title="添加菜单"
      >
        <MesForm
          fields={[
            {
              type: "input",
              name: "menuName",
              label: "菜单名称",
              props: {
                placeholder: "请输入菜单名称",
              },
            },
            {
              type: "select",
              name: "menuType",
              label: "菜单类型",
              props: {
                placeholder: "请输入菜单类型",
                options: menuTypeOptions,
              },
            },
          ]}
          formInstance={formInstance}
          formSchema={formSchema}
        />
      </MesDrawer>
    </div>
  );
};

export default Menu;
