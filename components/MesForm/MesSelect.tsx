import { Select, SelectItem, SelectProps } from "@heroui/react";


export type MesSelectOptions = {
  label: string;
  value: string;
}

type MesSelectProps = Omit<SelectProps, 'children'>

const MesSelect = ({ props, options }: { props: MesSelectProps; options: MesSelectOptions[] }) => {


  return (
    <Select {...props}>
      {(options).map((option: MesSelectOptions) => <SelectItem key={option.value}>{option.label}</SelectItem>)}
    </Select>

  );
};

export default MesSelect;
