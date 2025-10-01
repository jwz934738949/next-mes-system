import MesSvgIcon from "../MesSvgIcon";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetFooter, SheetTitle } from "../ui/sheet";

type MesDrawerProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  width?: string;
  okText?: string;
  cancelText?: string;
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
  onOk,
  onCancel,
}: MesDrawerProps) => (
  <Sheet open={open}>
    <SheetContent className="max-w-auto" style={{ width: width ?? "30%" }}>
      <div className="flex h-[48px] items-center justify-between border-gray-300 border-b px-3 py-4">
        <SheetTitle className="font-semibold text-base">
          {title ?? "标题"}
        </SheetTitle>
        <Button className="p-2" onClick={onCancel} variant="ghost">
          <MesSvgIcon className="text-sm" name="close" />
        </Button>
      </div>
      <div className="h-full w-full px-4">{children}</div>
      <SheetFooter className="flex justify-end gap-4 border-gray-300 border-t">
        <Button onClick={onCancel} variant="outline">
          {cancelText ?? "取消"}
        </Button>
        <Button onClick={onOk}>{okText ?? "确定"}</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export default MesDrawer;
