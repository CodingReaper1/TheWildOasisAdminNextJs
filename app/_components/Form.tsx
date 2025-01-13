import { MutableRefObject } from "react";

type FormProps = {
  type?: "regular" | "modal";
  children: React.ReactNode;
  action?: (FormData: FormData) => void;
  onSubmit?: () => void;
  useRef?: MutableRefObject<HTMLFormElement | null>;
};

function Form({
  type = "regular",
  children,
  action,
  onSubmit,
  useRef,
}: FormProps) {
  return (
    <form
      action={action}
      onSubmit={onSubmit}
      ref={useRef}
      className={`overflow-hidden text-[1.4rem] ${type === "regular" ? "rounded-lg border border-gray-100 bg-[#fff] px-[2rem] py-[2.4rem] dark:border-gray-800 dark:bg-gray-0 sm:px-[4rem]" : "mt-[4rem] max-h-[70vh] w-[80vw] overflow-y-auto overflow-x-hidden px-[2rem] pb-[4rem] sm:px-[4rem] lg:h-auto lg:w-[80rem]"}`}
    >
      {children}
    </form>
  );
}

export default Form;
