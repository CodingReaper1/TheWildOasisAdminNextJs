"use client";

import React, {
  cloneElement,
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useCloseModal from "../_hooks/useOutsideClick";

type ModalContextTypes = {
  openName: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
};

const ModalContext = createContext<null | ModalContextTypes>(null);

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
} // some state in parent component and then child components to how to change these states

function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) throw new Error("ModalContext was used outside of Modal");

  return context;
}

type OpenProps = {
  opens: string;
  children: ReactElement;
};

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useModalContext();

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

type WindowProps = {
  children: ReactElement;
  name: string;
};

function Window({ children, name }: WindowProps) {
  const { openName, close } = useModalContext();

  const { ref } = useCloseModal(close);

  useEffect(() => {
    if (name === openName) document.body.style.overflow = "hidden";

    if (name !== openName) document.body.style.overflow = "visible";
  }, [openName, name]);

  if (name !== openName) return null;

  return createPortal(
    // used to avoid parent css overflow:hidden
    <div className="fixed left-0 top-0 z-[1000] h-[100vh] w-full bg-backdrop backdrop-blur-sm transition-all duration-500 dark:bg-darkBackdrop">
      <div
        className="fixed left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white py-[3.2rem] shadow-[0_2.4rem_3.2rem_rgba(0,0,0,0.12)] transition-all duration-500 dark:bg-gray-0 dark:shadow-[0_2.4rem_3.2rem_rgba(0,0,0,0.4)] lg:w-[80rem]"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <button
          className="absolute right-[1.9rem] top-[1.2rem] translate-x-[0.8rem] transform rounded-md border-none bg-none p-[0.4rem] text-[2.4rem] text-gray-500 transition-all duration-200 hover:bg-gray-100 dark:text-gray-400 hover:dark:bg-gray-800"
          onClick={close}
          aria-label="Icon"
        >
          <HiXMark />
        </button>

        <div className="flex items-center justify-center overflow-hidden">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
