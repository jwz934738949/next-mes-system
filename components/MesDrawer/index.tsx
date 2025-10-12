import { Button, Drawer } from "antd";

type MesDrawerProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  width?: string;
  okText?: string;
  cancelText?: string;
  loading?: boolean;
  maskClosable?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
};

const MesDrawer = ({
  open,
  title,
  children,
  width,
  okText,
  cancelText,
  loading = false,
  maskClosable = false,
  onOk,
  onCancel,
}: MesDrawerProps) => (
  <Drawer
    destroyOnHidden
    footer={
      <div className="flex justify-end gap-4">
        <Button disabled={loading} onClick={onCancel}>
          {cancelText ?? "取消"}
        </Button>
        <Button loading={loading} onClick={onOk} type="primary">
          {okText ?? "确定"}
        </Button>
      </div>
    }
    keyboard={maskClosable}
    maskClosable={maskClosable}
    onClose={onCancel}
    open={open}
    title={title ?? "标题"}
    width={width ?? "30%"}
  >
    <div className="h-full w-full">{children}</div>
  </Drawer>
);

export default MesDrawer;
