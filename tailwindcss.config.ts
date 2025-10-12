import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // 你的项目文件
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Next.js App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class", // 推荐的暗黑模式配置
};

export default config;
