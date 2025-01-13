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
import useOutsideClick from "../_hooks/useOutsideClick";
import MotionComponent from "./MotionComponent";
import Image from "next/image";
import MainNav from "./MainNav";
import Uploader from "../_data/Uploader";
import { Variants } from "framer-motion";

type PhoneNavContextTypes = {
  openName: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
};

const PhoneNavContext = createContext<null | PhoneNavContextTypes>(null);

function PhoneNav({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <PhoneNavContext.Provider value={{ openName, close, open }}>
      {children}
    </PhoneNavContext.Provider>
  );
} // some state in parent component and then child components to how to change these states

function usePhoneNavContext() {
  const context = useContext(PhoneNavContext);

  if (!context) throw new Error("PhoneNavContext was used outside of PhoneNav");

  return context;
}

function Open({ children }: { children: ReactElement }) {
  const { open } = usePhoneNavContext();

  return cloneElement(children, { onClick: () => open("phoneNav") });
}

export const sidebarVariants: Variants = {
  initial: {
    width: 0,
    opacity: 0,
    paddingLeft: 0,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeInOut",
    },
  },
  hover: {
    width: 120,
    opacity: 1,
    paddingLeft: 12,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeInOut",
    },
  },
};

function Window() {
  const { openName, close } = usePhoneNavContext();

  const { ref } = useOutsideClick(close);

  useEffect(() => {
    if ("phoneNav" === openName) document.body.style.overflow = "hidden";

    if ("phoneNav" !== openName) document.body.style.overflow = "visible";
  }, [openName]);

  if ("phoneNav" !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-[1000] h-[100vh] w-full bg-backdrop backdrop-blur-sm transition-all duration-500 dark:bg-darkBackdrop">
      <MotionComponent
        className="dark:shadow-[0_2.4rem_3.2rem_rgba(0,0,0,0.4) fixed mt-48 h-full w-full overflow-y-scroll rounded-lg bg-white px-[4rem] py-[3.2rem] shadow-[0_2.4rem_3.2rem_rgba(0,0,0,0.12)] dark:bg-gray-0"
        reactRef={ref as React.RefObject<HTMLDivElement>}
        initial={{
          y: 700,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
      >
        <MotionComponent
          as="aside"
          className="mb-48 flex min-h-[60rem] w-full flex-col justify-between overflow-hidden bg-white px-2 py-[3.2rem] text-gray-0 dark:bg-gray-0 xs:px-[2rem] md:hidden"
          // onClick={close}
        >
          <div className="relative ml-[2rem] h-[5rem] w-[5rem]">
            <Image
              fill
              src="/favicon.png"
              className="aspect-1 object-contain"
              alt="Wild oasis logo"
              quality={70}
              sizes="20vw"
            />
          </div>

          <MainNav onClick={close} />

          <Uploader />
        </MotionComponent>
      </MotionComponent>
    </div>,
    document.body,
  );
}

PhoneNav.Open = Open;
PhoneNav.Window = Window;

export default PhoneNav;
