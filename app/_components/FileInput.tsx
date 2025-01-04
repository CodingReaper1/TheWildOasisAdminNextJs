"use client";

import { useFormStatus } from "react-dom";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type FileInputProps<T extends FieldValues> = {
  id: Path<T>;
  accept?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  register?: UseFormRegister<T>;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FileInput<T extends FieldValues>({
  accept,
  id,
  defaultValue,
  register,
  disabled,
  onChange,
}: FileInputProps<T>) {
  const { pending } = useFormStatus();

  return (
    <input
      type="file"
      id={id}
      accept={accept}
      disabled={pending || disabled}
      defaultValue={defaultValue}
      {...(register ? register(id, { onChange }) : { name: id })}
      className="block rounded-md border-gray-300 shadow-[0_0_0_rgba(0,0,0,0.04)] file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-6 file:py-4 file:text-[1.3rem] file:font-semibold file:text-white hover:file:bg-indigo-700 focus:border-indigo-500 focus:ring-indigo-500 file:disabled:cursor-not-allowed dark:shadow-[0_0_0_rgba(0,0,0,0.4)]"
    />
  );
}

export default FileInput;
