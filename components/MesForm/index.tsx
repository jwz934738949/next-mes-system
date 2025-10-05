"use client";

import MesInput from "./MesInput";
import MesSelect, { MesSelectOptions } from "./MesSelect";
import { Button, Form } from "@heroui/react";
import { FORM_FIELD_TYPE } from "@/lib/constant";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import MesNumberInput from "./MesNumberInput";
import MesSwitch from "./MesSwitch";


export type MesFormRef = {
  onSubmit: () => void;
  onReset: () => void;
}
// 定义字段类型接口，增强类型安全性
export type MesFormField = {
  key: string;
  type: typeof FORM_FIELD_TYPE[keyof typeof FORM_FIELD_TYPE];
  props?: Record<string, unknown>
};
// 定义表单属性接口
type MesFormProps = {
  fields: MesFormField[];
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

const MesForm = forwardRef<MesFormRef, MesFormProps>(({ fields, handleSubmit }, ref) => {
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const resetBtnRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => {
    return {
      onSubmit: () => {
        submitBtnRef.current?.click();
      },
      onReset: () => {
        resetBtnRef.current?.click();
      },
    };
  })


  // 渲染表单字段组件
  const RenderFormField = (
    { fieldItem }: { fieldItem: MesFormField }
  ) => {
    const { type, props = {} } = fieldItem;

    if (type === FORM_FIELD_TYPE.INPUT) {
      return (
        <MesInput
          {...props}
        />
      );
    }

    if (type === FORM_FIELD_TYPE.SELECT) {
      return (
        <MesSelect props={props} options={props.options as MesSelectOptions[]} />
      );
    }

    if (type === FORM_FIELD_TYPE.NUMBER_INPUT) {
      return (
        <MesNumberInput {...props} />
      );
    }

    if (type === FORM_FIELD_TYPE.SWITCH) {
      return <MesSwitch {...props} />
    }

    return null;
  };



  return (
    <Form
      className="gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit?.(e);
      }}
    >
      {fields.map((fieldItem) => (
        <RenderFormField
          key={fieldItem.key}
          fieldItem={fieldItem}
        />
      ))}
      <Button ref={submitBtnRef} type="submit" hidden>submit</Button>
      <Button ref={resetBtnRef} type="reset" hidden>reset</Button>
    </Form>
  );
})

MesForm.displayName = "MesForm";
export default MesForm;
