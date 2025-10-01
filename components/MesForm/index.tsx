"use client";

import type {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import MesInput from "./MesInput";
import MesSelect from "./MesSelect";

// 定义字段类型接口，增强类型安全性
type MesFormField<T> = {
  type: "input" | "select";
  name: Path<z.infer<T> & FieldValues>;
  label: string;
  props?: Record<string, unknown>;
  description?: string;
};

// 定义表单属性接口
type MesFormProps<T extends z.ZodType> = {
  formSchema: T;
  formInstance: UseFormReturn<z.infer<T> & FieldValues>;
  fields: MesFormField<T>[];
};

const MesForm = <T extends z.ZodType>({
  formInstance,
  fields,
}: MesFormProps<T>) => {
  const handleBlur = (fieldName: Path<z.infer<T> & FieldValues>) => {
    // 触发当前字段的验证
    formInstance.trigger(fieldName);
  };

  // 渲染表单字段组件
  const renderFormField = (
    fieldItem: MesFormField<T>,
    field: ControllerRenderProps<
      z.core.output<T> & FieldValues,
      Path<z.core.output<T> & FieldValues>
    >
  ) => {
    const { type, props = {} } = fieldItem;

    if (type === "input") {
      return (
        <MesInput
          {...props}
          onBlur={() => handleBlur(fieldItem.name)}
          onChange={field.onChange}
          value={field.value}
        />
      );
    }

    if (type === "select") {
      // 确保 options 类型安全
      const options = props.options as
        | { value: string; label: string }[]
        | undefined;

      if (!options) {
        throw new Error(
          `Select field "${fieldItem.name as string}" requires options property`
        );
      }

      return (
        <MesSelect
          {...props}
          onBlur={() => handleBlur(fieldItem.name)}
          onValueChange={field.onChange}
          options={options}
          value={field.value}
        />
      );
    }

    return null;
  };

  return (
    <Form {...formInstance}>
      <form className="space-y-8">
        {fields.map((fieldItem) => (
          <FormField
            control={formInstance.control}
            key={fieldItem.name as string}
            name={fieldItem.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldItem.label}</FormLabel>
                <FormControl>{renderFormField(fieldItem, field)}</FormControl>
                {fieldItem.description && (
                  <p className="mt-1 text-muted-foreground text-sm">
                    {fieldItem.description}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
};

export default MesForm;
