import MesSvgIcon from "../MesSvgIcon";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

type MesDrawerProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  width?: string;
  okText?: string;
  cancelText?: string;
  loading?: boolean;
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
  onOk,
  onCancel,
}: MesDrawerProps) => (
  <Drawer isOpen={open} hideCloseButton onOpenChange={() => {
    if (!loading) {
      onCancel?.();
    }
  }}>
    <DrawerContent className="max-w-auto" style={{ width: width ?? "30%" }}>
      {(onClose) => (
        <>
          <DrawerHeader className="font-semibold text-base border-b border-gray-300 flex justify-between items-center">
            {title ?? "标题"}
            <Button isIconOnly variant="light" className="text-gray-500 hover:text-gray-900" onPress={onCancel}>
              <MesSvgIcon
                name="close"
                className="cursor-pointer"
              />
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <div className="h-full w-full p-4 overflow-auto">{children}</div>
          </DrawerBody>
          <DrawerFooter className="flex justify-end gap-4 border-gray-300 border-t">
            <Button isLoading={loading} onPress={onCancel} variant="bordered">
              {cancelText ?? "取消"}
            </Button>
            <Button isLoading={loading} color="primary" onPress={onOk}>{okText ?? "确定"}</Button>
          </DrawerFooter>
        </>
      )}
    </DrawerContent>
  </Drawer>
);

export default MesDrawer;
