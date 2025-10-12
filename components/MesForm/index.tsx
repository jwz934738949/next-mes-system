"use client";

import {
  Form,
  type FormInstance,
  type FormItemProps,
  type FormProps,
} from "antd";
import { forwardRef, useImperativeHandle } from "react";
import type { MES_FORM_ITEM_TYPE } from "@/utils/constant";
import MesFormItem from "./MesFormItem";

export type MesFormRef = {
  formInstance: FormInstance;
};

export type MesFormItemProps = {
  key: string;
  type: (typeof MES_FORM_ITEM_TYPE)[keyof typeof MES_FORM_ITEM_TYPE];
  formItemProps?: FormItemProps;
  compProps?: Record<string, unknown>;
};

// 定义表单属性接口
type MesFormProps = {
  formItems: MesFormItemProps[];
} & FormProps;

const MesForm = forwardRef<MesFormRef, MesFormProps>(
  ({ formItems, ...props }, ref) => {
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
      formInstance: form,
    }));

    return (
      <Form form={form} layout="vertical" {...props}>
        {formItems.map((formItem) => (
          <MesFormItem formItem={formItem} key={formItem.key} />
        ))}
      </Form>
    );
  }
);

MesForm.displayName = "MesForm";
export default MesForm;
