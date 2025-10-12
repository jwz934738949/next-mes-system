import { Select, type SelectProps } from "antd";

export type MesSelectOptions = {
  label: string;
  value: string;
};

const MesSelect = (props: SelectProps) => {
  // 处理空字符串值，转换为 undefined 以显示 placeholder
  const processedProps = {
    ...props,
    value: props.value === "" ? undefined : props.value,
  };

  return <Select {...processedProps} />;
};

export default MesSelect;
