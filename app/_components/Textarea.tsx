"use client";

import { useFormStatus } from "react-dom";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TextareaProps<T extends FieldValues> = {
  id: Path<T>;
  defaultValue?: string;
  register?: UseFormRegister<T>;
};

function Textarea<T extends FieldValues>({
  id,
  defaultValue,
  register,
}: TextareaProps<T>) {
  const { pending } = useFormStatus();

  return (
    <textarea
      id={id}
      disabled={pending}
      defaultValue={defaultValue}
      {...(register ? register(id) : { name: id })}
      className="h-[8rem] w-full rounded-md border border-gray-300 bg-white px-[1.2rem] py-[0.8rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)] disabled:bg-gray-300 dark:border-gray-600 dark:bg-gray-0 dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)] disabled:dark:bg-gray-600"
    />
  );
}

export default Textarea;
