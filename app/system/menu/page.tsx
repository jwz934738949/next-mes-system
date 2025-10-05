"use client";


import { useEffect, useRef, useState } from "react";
import MesTable, { MesTableColumnProps } from "@/components/MesTable";
import { Button } from "@heroui/button";
import { menuApi } from "@/lib/request/modules/menu";
import type { MenuTreeResp } from "@/types/menu";
import dayjs from "dayjs";
import { HTTP_STATUS_CODE, MENU_TYPE } from "@/lib/constant";
import AddMenu, { AddMenuRef } from "./components/AddMenu";
import { Link } from "@heroui/react";
import MesConfirmModal, { type MesCOnfirmModalRef } from '@/components/MesConfirmModal';

const Menu = () => {
  const columns: MesTableColumnProps<MenuTreeResp>[] = [
    {
      key: "menuName",
      label: "菜单名称",
      width: 250,
    },
    {
      key: "menuType",
      label: "菜单类型",
      width: 120,
      render: (row) => {
        return <div>{MENU_TYPE[row.menuType] ?? undefined}</div>
      },
    },
    {
      key: "path",
      label: "菜单编码",
      width: 200,
    },
    {
      key: "component",
      label: "路由编码",
      width: 200,
    },
    {
      key: "orderNum",
      label: "排序值",
      width: 100,
    },
    {
      key: "perms",
      label: "权限",
      width: 150,
    },
    {
      key: "visible",
      label: "是否启用",
      width: 100,
      render: (row) => {
        return <div>{formatNumberToBoolean(row.visible)}</div>
      }
    },
    {
      key: "createBy",
      label: "创建人",
      width: 120,
    },
    {
      key: "createTime",
      label: "创建时间",
      width: 250,
      render: (row) => {
        const createTime = row.createTime
        return <div>{dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
      },
    },
    {
      key: "updateBy",
      label: "更新人",
      width: 120,
    },
    {
      key: "updateTime",
      label: "更新时间",
      width: 250,
      render: (row) => {
        const updateTime = row.updateTime;
        return <div>{dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")}</div>
      },
    },
    {
      key: "action",
      label: "操作",
      width: 200,
      render: (row) => {
        return <div className="grid grid-cols-2 gap-2">
          <Link className="cursor-pointer" size="sm" color="primary" onPress={() => {
            addMenuRef.current?.open(row.menuId, row.menuName);
          }}>添加子菜单</Link>
          <Link className="cursor-pointer" size="sm" color="primary" onPress={() => {
            addMenuRef.current?.open(row.menuId, row.menuName, row);
          }}>编辑</Link>
          <Link className="cursor-pointer" size="sm" color="danger" onPress={() => {
            mesConfirmModalRef.current?.open();
            setCurrentMenuId(row.menuId);
          }}>删除</Link>
        </div>
      },
    }
  ];

  const [menuData, setMenuData] = useState<MenuTreeResp[]>([]);
  const [deleteModalLoading, setDeleteModalLoading] = useState(false);
  const [currentMenuId, setCurrentMenuId] = useState(-1);
  const addMenuRef = useRef<AddMenuRef>(null);
  const mesConfirmModalRef = useRef<MesCOnfirmModalRef>(null);

  const formatNumberToBoolean = (num: string) => Boolean(num) ? "是" : "否"

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

  const handleDelete = async () => {
    try {
      setDeleteModalLoading(true);
      const res = await menuApi.deleteMenuByMenuId(currentMenuId);
      if (res.code === HTTP_STATUS_CODE.OK) {
        setDeleteModalLoading(false);
        mesConfirmModalRef.current?.close();
        getMenuData();
      }
    } catch (error) {
      console.error("删除菜单失败", error);
      setDeleteModalLoading(false);
    }
  }


  return (
    <div className="p-4">
      <MesTable
        rowKey="menuId"
        columns={columns}
        data={menuData}
        headerBtns={
          <Button color="primary" onPress={() => addMenuRef.current?.open()}>添加顶级菜单</Button>
        }
      />
      <AddMenu ref={addMenuRef} refresh={getMenuData} />
      <MesConfirmModal ref={mesConfirmModalRef} title="删除菜单" content="确定要删除该菜单吗?" onConfirm={handleDelete} loading={deleteModalLoading} />
    </div>
  );
};

export default Menu;
