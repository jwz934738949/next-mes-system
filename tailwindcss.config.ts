import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
    content: [
        // 你的项目文件
        "components/**/*.{js,ts,jsx,tsx,mdx}",
        "app/**/*.{js,ts,jsx,tsx,mdx}", // Next.js App Router
        // HeroUI 的样式文件路径
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {

        },
    },
    plugins: [
        // 只需要调用 heroui()，不需要传入配置
        heroui({
            themes: {
                light: {
                },
                dark: {},
            },

        }),
    ],
    darkMode: "class", // 推荐的暗黑模式配置
};

export default config;