"use client";

import { Button, message } from "antd";
import type { ColumnProps } from "antd/es/table";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import MesTable from "@/components/MesTable";
import { menuApi } from "@/lib/request/modules/menu";
import type { MenuTreeResp } from "@/types/menu";
import { showConfirm } from "@/utils/confirmModal";
import { HTTP_STATUS_CODE, MENU_TYPE } from "@/utils/constant";
import AddMenu, { type AddMenuRef } from "./components/AddMenu";

const Menu = () => {
  const columns: ColumnProps<MenuTreeResp>[] = [
    {
      key: "menuName",
      dataIndex: "menuName",
      title: "菜单名称",
      width: 250,
    },
    {
      key: "menuType",
      dataIndex: "menuType",
      title: "菜单类型",
      width: 120,
      render: (val) => MENU_TYPE[val] ?? undefined,
    },
    {
      key: "path",
      dataIndex: "path",
      title: "菜单编码",
      width: 200,
    },
    {
      key: "component",
      dataIndex: "component",
      title: "路由编码",
      width: 200,
    },
    {
      key: "orderNum",
      dataIndex: "orderNum",
      title: "排序值",
      width: 100,
    },
    {
      key: "perms",
      dataIndex: "perms",
      title: "权限",
      width: 150,
    },
    {
      key: "visible",
      dataIndex: "visible",
      title: "是否启用",
      width: 100,
      render: (val) => formatNumberToBoolean(val),
    },
    {
      key: "createBy",
      dataIndex: "createBy",
      title: "创建人",
      width: 120,
    },
    {
      key: "createTime",
      dataIndex: "createTime",
      title: "创建时间",
      width: 250,
      render: (val) => dayjs(val).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      key: "updateBy",
      dataIndex: "updateBy",
      title: "更新人",
      width: 120,
    },
    {
      key: "updateTime",
      dataIndex: "updateTime",
      title: "更新时间",
      width: 250,
      render: (val) => dayjs(val).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      key: "action",
      dataIndex: "action",
      title: "操作",
      width: 250,
      fixed: "right",
      render: (_, row) => (
        <div className="grid grid-cols-2 justify-items-start">
          <Button
            className="!p-0"
            color="primary"
            onClick={() => {
              addMenuRef.current?.open(row.menuId, row.menuName);
            }}
            size="small"
            variant="link"
          >
            添加子菜单
          </Button>
          <Button
            className="!p-0"
            color="primary"
            onClick={() => {
              addMenuRef.current?.open(row.menuId, row.menuName, row);
            }}
            size="small"
            variant="link"
          >
            编辑
          </Button>
          <Button
            className="!p-0"
            color="danger"
            onClick={async () => {
              const result = await showConfirm({
                title: "删除菜单",
                content: "确定要删除该菜单吗?",
                onOk: async () => {
                  const res = await menuApi.deleteMenuByMenuId(row.menuId);
                  if (res.code !== HTTP_STATUS_CODE.OK) {
                    throw new Error(res.message ?? "删除失败");
                  }

                  message.success(res.message ?? "删除成功");
                },
              });

              if (!result.success) {
                console.error("删除失败", result.error?.message);
              } 
            }}
            size="small"
            variant="link"
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  const [menuData, setMenuData] = useState<MenuTreeResp[]>([]);
  const addMenuRef = useRef<AddMenuRef>(null);

  const formatNumberToBoolean = (num: string) => (Boolean(num) ? "是" : "否");

  const getMenuData = useCallback(async () => {
    try {
      const res = await menuApi.getMenusTree({});
      if (res.code === HTTP_STATUS_CODE.OK) {
        setMenuData(res.data ?? []);
      }
    } catch (error) {
      console.error("获取菜单数据失败", error);
    }
  }, []);

  useEffect(() => {
    getMenuData();
  }, [getMenuData]);

  // const handleDelete = async () => {
  //   try {
  //     setDeleteModalLoading(true);
  //     const res = await menuApi.deleteMenuByMenuId(currentMenuId);
  //     if (res.code === HTTP_STATUS_CODE.OK) {
  //       setDeleteModalLoading(false);
  //       mesConfirmModalRef.current?.close();
  //       getMenuData();
  //     }
  //   } catch (error) {
  //     console.error("删除菜单失败", error);
  //     setDeleteModalLoading(false);
  //   }
  // };

  return (
    <div className="p-4">
      <MesTable
        columns={columns}
        data={menuData}
        headerBtns={
          <Button
            color="primary"
            onClick={() => {
              addMenuRef.current?.open();
            }}
          >
            添加顶级菜单
          </Button>
        }
        rowKey="menuId"
      />
      <AddMenu ref={addMenuRef} refresh={getMenuData} />
    </div>
  );
};

export default Menu;
