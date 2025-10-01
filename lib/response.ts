import { NextResponse } from "next/server";
import type { ApiResponse, PageResponse } from "../types/request";
import { HTTP_STATUS_CODE } from "./constant";

/**
 * API 响应工具类
 * 用于统一处理 API 接口的成功和失败响应
 */
export class ResponseHandler {
  /**
   * 创建成功响应
   * @param data 业务数据
   * @param message 提示信息
   * @param status 状态码，默认为 200
   * @returns NextResponse 对象
   */
  static success<T = unknown>(
    data: T,
    message = "操作成功",
    status = 200
  ): NextResponse<ApiResponse<T>> {
    const response: ApiResponse<T> = {
      code: status,
      data,
      message,
    };

    return NextResponse.json(response, { status });
  }

  /**
   * 创建分页成功响应
   * @param list 数据列表
   * @param total 总条数
   * @param page 页码
   * @param pageSize 每页条数
   * @param message 提示信息
   * @returns NextResponse 对象
   */
  static successPage<T = unknown>(
    list: T[],
    total: number,
    page: number,
    pageSize: number,
    message = "查询成功"
  ): NextResponse<ApiResponse<PageResponse<T>>> {
    const data: PageResponse<T> = {
      list,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };

    return ResponseHandler.success(data, message);
  }

  /**
   * 创建错误响应
   * @param message 错误信息
   * @param code 错误码，默认为 500
   * @param data 可选的错误详细数据
   * @returns NextResponse 对象
   */
  static error<T = unknown>(
    message = "操作失败",
    data?: T,
    code?: number
  ): NextResponse<ApiResponse<T | null>> {
    const response: ApiResponse<T | null> = {
      code: code ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      data: data ?? null,
      message,
    };

    return NextResponse.json(response, {
      status: code ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }

  /**
   * 创建验证错误响应
   * @param message 验证错误信息
   * @param data 可选的验证错误详情
   * @returns NextResponse 对象
   */
  static validationError<T = unknown>(
    message = "数据验证失败",
    data?: T
  ): NextResponse<ApiResponse<T | null>> {
    return ResponseHandler.error(
      message,
      data,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    );
  }

  /**
   * 创建未授权响应
   * @param message 未授权提示信息
   * @returns NextResponse 对象
   */
  static unauthorized(message = "未授权访问"): NextResponse<ApiResponse<null>> {
    return ResponseHandler.error(message, null, HTTP_STATUS_CODE.UNAUTHORIZED);
  }

  /**
   * 创建资源未找到响应
   * @param message 资源未找到提示信息
   * @returns NextResponse 对象
   */
  static notFound(
    message = "请求的资源不存在"
  ): NextResponse<ApiResponse<null>> {
    return ResponseHandler.error(message, null, HTTP_STATUS_CODE.NOT_FOUND);
  }
}
