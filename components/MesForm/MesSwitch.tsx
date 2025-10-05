import { Switch, SwitchProps } from "@heroui/react"

type MesSwitchProps = SwitchProps & {
    label?: string;
    labelPlacement?: 'outside';
};
const MesSwitch = (props: MesSwitchProps) => {
    const { label, labelPlacement, ...rest } = props;

    return <div className="flex flex-col gap-3">
        {label && <span className="text-small">{label}</span>}
        <Switch {...rest} />
    </div>
}

export default MesSwitch;