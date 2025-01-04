"use client";

import { useFormStatus } from "react-dom";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  type?: string;
  id?: Path<T>;
  autoComplete?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  hidden?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<T>;
};

function Input<T extends FieldValues>({
  type,
  id,
  autoComplete,
  disabled,
  placeholder,
  defaultValue,
  hidden,
  onBlur,
  register,
}: InputProps<T>) {
  const { pending } = useFormStatus();

  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      hidden={hidden}
      disabled={pending || disabled}
      {...(register && id
        ? register(id, { valueAsNumber: type === "number" })
        : { onBlur: onBlur, name: id })}
      className="rounded-md border border-gray-300 bg-white px-[1.2rem] py-[0.8rem] shadow-[0_0_0_rgba(0,0,0,0.04)] disabled:cursor-not-allowed disabled:bg-gray-300 dark:border-gray-600 dark:bg-gray-0 dark:shadow-[0_0_0_rgba(0,0,0,0.4)] disabled:dark:bg-gray-600"
    />
  );
}

export default Input;
