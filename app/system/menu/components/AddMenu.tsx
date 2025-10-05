'use client'

import MesDrawer from "@/components/MesDrawer";
import MesForm, { MesFormField, MesFormRef } from "@/components/MesForm";
import { FORM_FIELD_TYPE, MENU_TYPE } from "@/lib/constant";
import { menuApi } from "@/lib/request/modules/menu";
import { AddMenuReq, AllMenusReq, MenuResp } from "@/types/menu";
import { addToast } from "@heroui/react";
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";


export type AddMenuRef = {
    open: (parentId?: number, parentName?: string, updateParams?: MenuResp) => void
}

const AddMenu = forwardRef<AddMenuRef, { refresh: () => void }>(({ refresh }, ref) => {
    const [showAddTopMenu, setShowAddTopMenu] = useState(false);
    const [parentId, setParentId] = useState(-1);
    const [parentName, setParentName] = useState('');
    const [loading, setLoading] = useState(false);
    const [updateParams, setUpdateParams] = useState<MenuResp>();
    const mesFormRef = useRef<MesFormRef>(null);

    useImperativeHandle(ref, () => {
        return {
            open: (parentId, parentName, updateParams) => {
                setParentId(-1);
                setParentName("");
                setUpdateParams(undefined);

                parentId && setParentId(parentId);
                parentName && setParentName(parentName);

                if (updateParams) {
                    setUpdateParams(updateParams);
                    setParentId(updateParams.parentId);
                    setParentName(updateParams.parentName ?? "");
                }
                setUpdateParams(updateParams);
                setShowAddTopMenu(true);

                mesFormRef.current?.onReset();
            }
        }
    });

    const formFields: MesFormField[] = useMemo(() => [
        {
            key: "parentName",
            type: FORM_FIELD_TYPE.INPUT,
            props: {
                name: "parentName",
                variant: 'bordered',
                label: "父级菜单",
                labelPlacement: 'outside',
                isRequired: true,
                isDisabled: true,
                defaultValue: (parentName === '' ? undefined : parentName) ?? '根菜单'
            },
        },
        {
            key: "menuName",
            type: FORM_FIELD_TYPE.INPUT,
            props: {
                name: "menuName",
                variant: 'bordered',
                label: "菜单名称",
                labelPlacement: 'outside',
                placeholder: "请输入菜单名称",
                isRequired: true,
                isClearable: true,
                defaultValue: updateParams?.menuName,
                validate: (value: string) => {
                    if (!value || !value.trim()) {
                        return '菜单名称不能为空'
                    }
                }
            },
        },
        {
            key: "menuType",
            type: FORM_FIELD_TYPE.SELECT,
            props: {
                name: "menuType",
                variant: 'bordered',
                label: "菜单类型",
                labelPlacement: 'outside',
                placeholder: "请输入菜单类型",
                options: Object.entries(MENU_TYPE).map(([key, value]) => ({ label: value, value: key })),
                isRequired: true,
                isClearable: true,
                defaultSelectedKeys: updateParams?.menuType ? [updateParams.menuType] : undefined,
                validate: (value: string) => {
                    if (!value || !value.trim()) {
                        return '菜单类型不能为空'
                    }
                }
            },
        },
        {
            key: "path",
            type: FORM_FIELD_TYPE.INPUT,
            props: {
                name: "path",
                variant: 'bordered',
                label: "菜单编码",
                labelPlacement: 'outside',
                placeholder: "请输入菜单编码",
                defaultValue: updateParams?.path,
            },
        },
        {
            key: "component",
            type: FORM_FIELD_TYPE.INPUT,
            props: {
                name: "component",
                variant: 'bordered',
                label: "路由编码",
                labelPlacement: 'outside',
                placeholder: "请输入路由编码",
                defaultValue: updateParams?.component,
            },
        },
        {
            key: 'perms',
            type: FORM_FIELD_TYPE.INPUT,
            props: {
                name: 'perms',
                variant: 'bordered',
                label: "菜单权限",
                labelPlacement: 'outside',
                placeholder: "请输入菜单权限",
                defaultValue: updateParams?.perms,
            }
        },
        {
            key: "icon",
            type: FORM_FIELD_TYPE.INPUT,
            props: {
                name: "icon",
                variant: 'bordered',
                label: "图标",
                labelPlacement: 'outside',
                placeholder: "请输入图标",
                defaultValue: updateParams?.icon,
            },
        },
        {
            key: 'isFrame',
            type: FORM_FIELD_TYPE.SWITCH,
            props: {
                name: 'isFrame',
                label: "是否外链",
                labelPlacement: 'outside',
                value: Boolean(Number(updateParams?.isFrame ?? 0)),
                defaultSelected: Boolean(Number(updateParams?.isFrame ?? 0))
            }
        },
        {
            key: 'isCache',
            type: FORM_FIELD_TYPE.SWITCH,
            props: {
                name: 'isCache',
                label: "是否缓存",
                labelPlacement: 'outside',
                value: Boolean(Number(updateParams?.isCache ?? 0)),
                defaultSelected: Boolean(Number(updateParams?.isCache ?? 0))
            }
        },
        {
            key: 'visible',
            type: FORM_FIELD_TYPE.SWITCH,
            props: {
                name: 'visible',
                label: "是否启用",
                labelPlacement: 'outside',
                value: Boolean(Number(updateParams?.visible ?? 1)),
                defaultSelected: Boolean(Number(updateParams?.visible ?? 1))
            }
        },
        {
            key: "orderNum",
            type: FORM_FIELD_TYPE.NUMBER_INPUT,
            props: {
                name: "orderNum",
                variant: 'bordered',
                label: "排序值",
                labelPlacement: 'outside',
                placeholder: "请输入排序值",
                defaultValue: updateParams?.orderNum ?? 1,
                minValue: 0,
                maxValue: 9999,
                formatOptions: {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                    useGrouping: false
                },
                isRequired: true,
                validate: (value: number) => {
                    if (!value) {
                        return '排序值不能为空'
                    }
                }
            },
        },
    ], [parentName, updateParams])



    const triggerSubmit = () => {
        if (mesFormRef.current) {
            mesFormRef.current.onSubmit();
        }

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());


        if (updateParams) {
            const params: MenuResp = {
                menuName: data.menuName as string,
                menuType: data.menuType as string,
                path: data.path as string,
                orderNum: data.orderNum as unknown as number,
                visible: data.visible ? '1' : '0',
                parentId: parentId,
                isFrame: data.isFrame ? '1' : '0',
                isCache: data.isCache ? '1' : '0',
                menuId: updateParams.menuId,
            }
            updateMenu(params)
        } else {
            const params: AddMenuReq = {
                menuName: data.menuName as string,
                menuType: data.menuType as string,
                path: data.path as string,
                orderNum: data.orderNum as unknown as number,
                visible: data.visible ? '1' : '0',
                parentId: parentId,
                isFrame: data.isFrame ? '1' : '0',
                isCache: data.isCache ? '1' : '0'
            }
            addMenu(params)
        }

    }

    const addMenu = async (params: AddMenuReq) => {
        try {
            const res = await menuApi.addMenuByParentId(params)
            if (res.code === 200) {
                addToast({
                    title: "请求成功",
                    description: res.message ?? '添加成功',
                    color: "success",
                    variant: 'bordered'
                })
                setLoading(false)
                setShowAddTopMenu(false)
                refresh()
            }
        } catch (err) {
            console.error("添加菜单失败", err)
            setLoading(false)
        }
    }

    const updateMenu = async (params: MenuResp) => {
        try {
            const res = await menuApi.updateMenuByMenuId(params)
            if (res.code === 200) {
                addToast({
                    title: "请求成功",
                    description: res.message ?? '更新成功',
                    color: "success",
                    variant: 'bordered'
                })
                setLoading(false)
                setShowAddTopMenu(false)
                refresh()
            }
        } catch (err) {
            console.error("更新菜单失败", err)
            setLoading(false)
        }
    }


    return <MesDrawer
        onCancel={() => setShowAddTopMenu(false)}
        onOk={triggerSubmit}
        open={showAddTopMenu}
        title={updateParams ? '更新菜单' : '添加菜单'}
        loading={loading}
    >
        <MesForm
            ref={mesFormRef}
            fields={formFields}
            handleSubmit={handleSubmit}
        />
    </MesDrawer>
})

AddMenu.displayName = "AddMenu";
export default AddMenu