import ky from "ky";
import { HttpCode } from "@/constants";

// 创建自定义实例
export const request = ky.create({
  prefixUrl: "/api", // 基础 URL
  timeout: 10_000, // 超时时间（10秒）
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
          response.status === HttpCode.noAuth &&
          typeof window !== "undefined"
        ) {
          window.location.href = "/login";
        }
        return response;
      },
    ],
  },
});

export default request;
