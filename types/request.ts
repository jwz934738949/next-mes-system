/**
 * 后端接口统一响应格式
 */
export type ApiResponse<T = unknown> = {
  code: number; // 状态码：200 成功，其他为错误
  data: T; // 业务数据
  message: string; // 提示信息
};

/**
 * 分页查询参数
 */
export type PageParams = {
  page: number; // 页码，从 1 开始
  pageSize: number; // 每页条数
};

/**
 * 分页响应数据
 */
export type PageResponse<T = unknown> = {
  list: T[]; // 列表数据
  total: number; // 总条数
  page: number;
  pageSize: number;
  totalPages: number; // 总页数
};
