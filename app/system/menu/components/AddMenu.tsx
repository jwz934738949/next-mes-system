"use client";

import { message } from "antd";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import MesDrawer from "@/components/MesDrawer";
import MesForm, {
  type MesFormItemProps,
  type MesFormRef,
} from "@/components/MesForm";
import MesSvgIcon from "@/components/MesSvgIcon";
import { menuApi } from "@/lib/request/modules/menu";
import type { AddMenuReq, MenuResp } from "@/types/menu";
import {
  HTTP_STATUS_CODE,
  ICONFONT_ICON,
  MENU_TYPE,
  MES_FORM_ITEM_TYPE,
} from "@/utils/constant";

export type AddMenuRef = {
  open: (
    parentId?: number,
    parentName?: string,
    updateParams?: MenuResp
  ) => void;
};

const AddMenu = forwardRef<AddMenuRef, { refresh: () => void }>(
  ({ refresh }, ref) => {
    const [showAddTopMenu, setShowAddTopMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const mesFormRef = useRef<MesFormRef>(null);
    const [addForm, setAddForm] = useState<MenuResp>();

    useImperativeHandle(ref, () => ({
      open: (parentId, parentName, updateParams) => {
        if (updateParams) {
          setAddForm({
            ...updateParams,
            parentId: updateParams.parentId,
            parentName: updateParams.parentName ?? "根菜单",
          });
        } else {
          setAddForm({
            menuId: -1,
            path: "",
            menuName: "",
            menuType: "",
            parentId: parentId ?? -1,
            parentName: parentName ?? "根菜单",
            orderNum: 0,
            isFrame: "0",
            isCache: "0",
            visible: "1",
            component: "",
            perms: "",
            icon: "",
          });
        }
        setShowAddTopMenu(true);
      },
    }));

    const formItems: MesFormItemProps[] = [
      {
        key: "parentName",
        type: MES_FORM_ITEM_TYPE.INPUT,
        formItemProps: {
          label: "父级菜单",
          name: "parentName",
          rules: [{ required: true }],
        },
        compProps: {
          placeholder: "请输入父级菜单",
          disabled: true,
        },
      },
      {
        key: "menuName",
        type: MES_FORM_ITEM_TYPE.INPUT,
        formItemProps: {
          label: "菜单名称",
          name: "menuName",
          rules: [{ required: true }],
        },
        compProps: {
          name: "menuName",
          placeholder: "请输入菜单名称",
          allowClear: true,
        },
      },
      {
        key: "menuType",
        type: MES_FORM_ITEM_TYPE.SELECT,
        formItemProps: {
          label: "菜单类型",
          name: "menuType",
          rules: [{ required: true }],
        },
        compProps: {
          placeholder: "请输入菜单类型",
          options: Object.entries(MENU_TYPE).map(([key, value]) => ({
            label: value,
            value: key,
          })),
          allowClear: true,
        },
      },
      {
        key: "path",
        type: MES_FORM_ITEM_TYPE.INPUT,
        formItemProps: {
          label: "菜单编码",
          name: "path",
        },
        compProps: {
          placeholder: "请输入菜单编码",
          allowClear: true,
        },
      },
      {
        key: "component",
        type: MES_FORM_ITEM_TYPE.INPUT,
        formItemProps: {
          label: "路由编码",
          name: "component",
        },
        compProps: {
          placeholder: "请输入路由编码",
          allowClear: true,
        },
      },
      {
        key: "perms",
        type: MES_FORM_ITEM_TYPE.INPUT,
        formItemProps: {
          label: "菜单权限",
          name: "perms",
        },
        compProps: {
          placeholder: "请输入菜单权限",
          allowClear: true,
        },
      },
      {
        key: "icon",
        type: MES_FORM_ITEM_TYPE.SELECT,
        formItemProps: {
          label: "图标",
          name: "icon",
        },
        compProps: {
          placeholder: "请选择图标",
          allowClear: true,
          labelInValue: true,
          options: Object.values(ICONFONT_ICON).map((value) => ({
            value,
            label: (
              <div className="flex gap-2">
                <MesSvgIcon name={value} />
                <span>{value}</span>
              </div>
            ),
          })),
        },
      },
      {
        key: "isFrame",
        type: MES_FORM_ITEM_TYPE.SWITCH,
        formItemProps: {
          label: "是否外链",
          name: "isFrame",
          rules: [{ required: true }],
        },
        compProps: {
          checkedChildren: "是",
          unCheckedChildren: "否",
        },
      },
      {
        key: "isCache",
        type: MES_FORM_ITEM_TYPE.SWITCH,
        formItemProps: {
          label: "是否缓存",
          name: "isCache",
          rules: [{ required: true }],
        },
        compProps: {
          checkedChildren: "是",
          unCheckedChildren: "否",
        },
      },
      {
        key: "visible",
        type: MES_FORM_ITEM_TYPE.SWITCH,
        formItemProps: {
          label: "是否启用",
          name: "visible",
          rules: [{ required: true }],
        },
        compProps: {
          checkedChildren: "是",
          unCheckedChildren: "否",
        },
      },
      {
        key: "orderNum",
        type: MES_FORM_ITEM_TYPE.NUMBER_INPUT,
        formItemProps: {
          label: "排序值",
          name: "orderNum",
          rules: [{ required: true }],
        },
        compProps: {
          placeholder: "请输入排序值",
          min: 0,
          max: 9999,
          precision: 0,
        },
      },
    ];

    const handleSubmit = async () => {
      try {
        const values = await mesFormRef.current?.formInstance.validateFields();

        if (addForm && addForm.menuId !== -1) {
          const params: MenuResp = {
            menuName: values.menuName,
            menuType: values.menuType,
            path: values.path,
            orderNum: values.orderNum,
            visible: values.visible ? "1" : "0",
            parentId: addForm?.parentId ?? -1,
            isFrame: values.isFrame ? "1" : "0",
            isCache: values.isCache ? "1" : "0",
            menuId: addForm.menuId,
          };
          updateMenu(params);
        } else {
          const params: AddMenuReq = {
            menuName: values.menuName,
            menuType: values.menuType,
            path: values.path,
            orderNum: values.orderNum,
            visible: values.visible ? "1" : "0",
            parentId: addForm?.parentId ?? -1,
            isFrame: values.isFrame ? "1" : "0",
            isCache: values.isCache ? "1" : "0",
          };
          addMenu(params);
        }
      } catch (error) {
        console.error("表单验证失败:", error);
      }
    };

    const addMenu = async (params: AddMenuReq) => {
      try {
        setLoading(true);
        const res = await menuApi.addMenuByParentId(params);
        if (res.code === HTTP_STATUS_CODE.OK) {
          message.success(res.message ?? "添加成功");
          setLoading(false);
          setShowAddTopMenu(false);
          refresh();
        }
      } catch (err) {
        console.error("添加菜单失败", err);
        setLoading(false);
      }
    };

    const updateMenu = async (params: MenuResp) => {
      try {
        setLoading(true);
        const res = await menuApi.updateMenuByMenuId(params);
        if (res.code === HTTP_STATUS_CODE.OK) {
          message.success(res.message ?? "更新成功");
          setLoading(false);
          setShowAddTopMenu(false);
          refresh();
        }
      } catch (err) {
        console.error("更新菜单失败", err);
        setLoading(false);
      }
    };

    return (
      <MesDrawer
        loading={loading}
        onCancel={() => setShowAddTopMenu(false)}
        onOk={handleSubmit}
        open={showAddTopMenu}
        title={addForm?.menuId !== -1 ? "更新菜单" : "添加菜单"}
      >
        <MesForm
          formItems={formItems}
          initialValues={{
            ...addForm,
            isFrame: addForm?.isFrame === "1",
            isCache: addForm?.isCache === "1",
            visible: addForm?.visible === "1",
          }}
          ref={mesFormRef}
        />
      </MesDrawer>
    );
  }
);

AddMenu.displayName = "AddMenu";
export default AddMenu;
