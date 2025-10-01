import type { FocusEventHandler } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface MesSelectProps extends React.ComponentProps<typeof Select> {
  options: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  className?: string;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
}

const MesSelect = (props: MesSelectProps) => {
  const { options, placeholder, onBlur, ...selectProps } = props;

  return (
    <Select {...selectProps}>
      <SelectTrigger className="w-full" onBlur={onBlur}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MesSelect;
