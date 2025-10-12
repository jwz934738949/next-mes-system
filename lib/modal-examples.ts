import {
  showConfirm,
  showConfirmWithLoading,
  showSimpleConfirm,
} from "../utils/confirmModal";

// 常量定义
const DELAY_SHORT = 1000;
const DELAY_MEDIUM = 2000;
const DELAY_LONG = 3000;
const SUCCESS_THRESHOLD = 0.5;
const ERROR_THRESHOLD = 0.7;

// 使用示例

// 1. 基本确认对话框
export const basicConfirmExample = async () => {
  const result = await showConfirm({
    title: "确认删除",
    content: "您确定要删除这条记录吗？此操作不可撤销。",
    type: "warning",
    okText: "删除",
    cancelText: "取消",
    onOk: () => {
      console.log("用户确认删除");
      // 这里可以执行删除操作
    },
  });

  if (result.success) {
    console.log("操作成功");
  } else {
    console.log("操作取消或失败", result.error);
  }
};

// 2. 异步操作确认
export const asyncConfirmExample = async () => {
  const result = await showConfirm({
    title: "保存数据",
    content: "是否保存当前修改？",
    type: "info",
    onOk: async () => {
      // 模拟异步API调用
      await new Promise((resolve) => setTimeout(resolve, DELAY_MEDIUM));

      // 模拟可能的错误
      if (Math.random() > SUCCESS_THRESHOLD) {
        throw new Error("保存失败");
      }

      console.log("数据保存成功");
    },
  });

  if (result.success) {
    console.log("保存成功");
  } else {
    console.log("保存失败:", result.error?.message);
  }
};

// 3. 简化版确认（只返回boolean）
export const simpleConfirmExample = async () => {
  const confirmed = await showSimpleConfirm({
    title: "确认操作",
    content: "是否继续执行此操作？",
    type: "warning",
  });

  if (confirmed) {
    console.log("用户确认");
    // 执行操作
  } else {
    console.log("用户取消");
  }
};

// 4. 带加载状态的确认
export const loadingConfirmExample = async () => {
  const result = await showConfirmWithLoading({
    title: "提交表单",
    content: "确定要提交表单吗？",
    type: "info",
    okText: "提交",
    onOk: async () => {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, DELAY_LONG));

      // 模拟可能的错误
      if (Math.random() > ERROR_THRESHOLD) {
        throw new Error("网络错误");
      }

      console.log("表单提交成功");
    },
  });

  if (result.success) {
    console.log("提交成功");
  } else {
    console.log("提交失败:", result.error?.message);
  }
};

// 5. 错误类型确认
export const errorConfirmExample = async () => {
  const result = await showConfirm({
    title: "操作失败",
    content: "检测到错误，是否重试？",
    type: "error",
    okText: "重试",
    cancelText: "取消",
    onOk: async () => {
      // 重试逻辑
      await new Promise((resolve) => setTimeout(resolve, DELAY_SHORT));
      console.log("重试完成");
    },
  });

  if (result.success) {
    console.log("重试成功");
  } else {
    console.log("用户取消重试");
  }
};

// 6. 成功类型确认
export const successConfirmExample = async () => {
  const result = await showConfirm({
    title: "操作完成",
    content: "数据已成功处理，是否继续下一步？",
    type: "success",
    okText: "继续",
    cancelText: "稍后",
    onOk: () => {
      console.log("继续下一步");
    },
  });

  if (result.success) {
    console.log("继续下一步");
  } else {
    console.log("稍后处理");
  }
};
