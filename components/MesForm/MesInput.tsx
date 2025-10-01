import { Input } from "../ui/input";

interface MesInputProps extends React.ComponentProps<"input"> {
  placeholder?: string;
  className?: string;
}

const MesInput = (props: MesInputProps) => <Input {...props} />;

export default MesInput;
