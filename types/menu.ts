export type AllMenusReq = {
  parentId?: number;
  menuName?: string;
};

export type MenuResp = {
  menuId: number;
  menuName: string;
  menuType: string;
  parentId: number;
  parentName?: string;
  path: string;
  component?: string;
  orderNum: number;
  icon?: string;
  isFrame: string;
  isCache: string;
  perms?: string;
  visible: string;
  delFlag?: string;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
};

export type MenuTreeResp = MenuResp & {
  children?: MenuResp[];
}

export type AddMenuReq = Omit<MenuResp, 'menuId'>

export type UseMenuState = {
  menuList: { key: string; icon: string; label: string }[];
  setMenuList: () => void;
};
