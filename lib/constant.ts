/**
 * HTTP 状态码常量
 */
export const HTTP_STATUS_CODE = {
  // 成功
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // 重定向
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,

  // 客户端错误
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  GONE: 410,
  UNPROCESSABLE_ENTITY: 422,

  // 服务器错误
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

/**
 * Form 字段类型
 */
export const FORM_FIELD_TYPE = {
  INPUT: 'input',
  SELECT: 'select',
  NUMBER_INPUT: 'number-input',
  SWITCH: 'switch',
} as const;

/**
 * 菜单类型
 */
export const MENU_TYPE: Record<string, string> = {
  M: '目录',
  C: '菜单',
  U: '按钮',
} as const;

/**
 * 提示弹窗状态
 */
export const CONFIRM_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
}
