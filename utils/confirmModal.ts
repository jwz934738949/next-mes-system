import { Modal } from "antd";
import type { ModalFuncProps } from "antd/es/modal/interface";

export type ConfirmOptions = {
  title: string;
  content?: string;
  type?: "success" | "info" | "warning" | "error";
  okText?: string;
  cancelText?: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
};

export type ConfirmResult = {
  success: boolean;
  error?: Error;
};

/**
 * 通用的确认对话框方法
 * @param options 配置选项
 * @returns Promise<ConfirmResult> 返回操作结果
 */
export const showConfirm = (
  options: ConfirmOptions
): Promise<ConfirmResult> => {
  const {
    title,
    content,
    type = "warning",
    okText = "确认",
    cancelText = "取消",
    onOk,
    onCancel,
  } = options;

  return new Promise<ConfirmResult>((resolve) => {
    const modalProps: ModalFuncProps = {
      title,
      content,
      okText,
      cancelText,
      okType: type === "error" ? "danger" : "primary",
      icon: type === "error" ? "error" : undefined,
      onOk: async () => {
        try {
          if (onOk) {
            await onOk();
          }
          resolve({ success: true });
        } catch (error) {
          resolve({
            success: false,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      },
      onCancel: () => {
        if (onCancel) {
          onCancel();
        }
        resolve({ success: false });
      },
    };

    // 使用 Modal.confirm 统一处理，避免兼容性问题
    Modal.confirm(modalProps);
  });
};
