import { PrismaClient } from "../generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prismaInstance = globalThis.prisma ?? new PrismaClient();

// 非生产模式，将prisma实例挂载到全局
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaInstance;
}
