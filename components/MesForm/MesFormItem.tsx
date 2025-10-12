// 渲染表单字段组件

import { Form } from "antd";
import { MES_FORM_ITEM_TYPE } from "@/utils/constant";
import type { MesFormItemProps } from ".";
import MesInput from "./MesInput";
import MesNumberInput from "./MesNumberInput";
import MesSelect from "./MesSelect";
import MesSwitch from "./MesSwitch";

const MesFormItem = ({ formItem }: { formItem: MesFormItemProps }) => {
  const { type, formItemProps, compProps } = formItem;

  if (type === MES_FORM_ITEM_TYPE.INPUT) {
    return (
      <Form.Item {...formItemProps}>
        <MesInput {...compProps} />
      </Form.Item>
    );
  }

  if (type === MES_FORM_ITEM_TYPE.SELECT) {
    return (
      <Form.Item {...formItemProps}>
        <MesSelect {...compProps} />
      </Form.Item>
    );
  }

  if (type === MES_FORM_ITEM_TYPE.NUMBER_INPUT) {
    return (
      <Form.Item {...formItemProps}>
        <MesNumberInput {...compProps} />
      </Form.Item>
    );
  }

  if (type === MES_FORM_ITEM_TYPE.SWITCH) {
    return (
      <Form.Item {...formItemProps}>
        <MesSwitch {...compProps} />
      </Form.Item>
    );
  }

  return null;
};

export default MesFormItem;
