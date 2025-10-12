import type React from "react";
import "../../public/iconfont/iconfont.css";

const MesSvgIcon = ({
  name,
  className,
  ...props
}: {
  name: string;
  className?: string;
  props?: React.HTMLAttributes<HTMLElement>;
}) => <i className={`iconfont icon-${name} ${className || ""}`} {...props} />;

export default MesSvgIcon;
