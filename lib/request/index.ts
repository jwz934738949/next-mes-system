import ky from "ky";
import { HTTP_STATUS_CODE } from "../constant";
import { addToast } from "@heroui/react";

// 创建自定义实例
export const request = ky.create({
  prefixUrl: "/api", // 基础 URL
  timeout: 30_000, // 超时时间（30秒）
  headers: {
    "Content-Type": "application/json",
  },
  // 请求拦截器
  hooks: {
    beforeRequest: [
      (req) => {
        // 示例：添加认证 token
        const token = localStorage.getItem("token"); // 仅客户端可用
        if (token) {
          req.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        // 示例：处理 401 未授权
        // 示例：处理 401 未授权
        if (
          response.status === HTTP_STATUS_CODE.UNAUTHORIZED &&
          typeof window !== "undefined"
        ) {
          window.location.href = "/login";
        }

        console.log('error', response)

        if (response.status !== HTTP_STATUS_CODE.OK) {
          addToast({
            title: "请求失败",
            description: response.statusText,
            color: "danger",
            variant: 'bordered'
          });
        }
        return response;
      },
    ],
  },
});

export default request;
