import type { AllMenusReq, MenuResp, MenuTreeResp } from "@/types/menu";
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
      .get("menus/tree", {
        searchParams: { ...params },
      })
      .json<ApiResponse<MenuTreeResp[]>>(),
  // 新增菜单
  addMenuByParentId: async (params: AllMenusReq) => {
    await client
      .post("menus", {
        json: params,
      })
      .json<ApiResponse<null>>();
  },
};
