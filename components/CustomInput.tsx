import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Control, FieldPath, FieldValues, Path } from 'react-hook-form'

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="form-item">
          <FormLabel className="form-label" htmlFor={name}>{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                id={name}
                placeholder={placeholder}
                className="input-class"
                type={name === "password" ? 'password' : 'text'}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
