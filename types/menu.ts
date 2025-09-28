export type AllMenusReq = {
  parentId?: number;
  menuName?: string;
};

export type MenuResp = {
  menuId: number;
  menuName: string;
  menuType: string;
  parentId: number;
  path: string;
  query: string;
  component?: string;
  orderNum: number;
  icon: string;
  isFrame: string;
  isCache: string;
  perms: string;
  visible: string;
  status: string;
  delFlag: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  remark?: string;
};

export interface MenuTreeResp extends MenuResp {
  children?: MenuResp[];
}

export type UseMenuState = {
  menuList: { key: string; icon: string; label: string }[];
  setMenuList: () => void;
};
