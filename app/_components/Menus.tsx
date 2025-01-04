"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import useOutsideClick from "../_hooks/useOutsideClick";
import Link from "next/link";

function Menu({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

type MenusContextTypes = {
  openId: number | null;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<number | null>>;
  position: { x: number; y: number } | null;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    } | null>
  >;
};

const MenusContext = createContext<null | MenusContextTypes>(null);

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  const close = () => setOpenId(null);
  const open = setOpenId;

  useEffect(() => {
    const handleScroll = () => {
      close();
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function useMenusContext() {
  const context = useContext(MenusContext);

  if (context === null)
    throw new Error("Menus context was used outside of meus provider");

  return context;
}

type ToggleProps = {
  id: number;
  disabled?: boolean;
};

function Toggle({ id, disabled }: ToggleProps) {
  const { openId, open, close, setPosition } = useMenusContext();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const target = e.target as HTMLElement;

    const rect = target?.closest("button")?.getBoundingClientRect();

    if (!rect) return;

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === null || openId !== id ? open(id) : close();
  }

  return (
    <button
      aria-label="Icon"
      className="translate-x-[0.8rem] rounded-md border-none bg-none p-[0.4rem] text-[2.4rem] text-gray-700 transition-all duration-200 hover:bg-gray-100 disabled:cursor-not-allowed dark:text-gray-200 dark:hover:bg-gray-800"
      onClick={handleClick}
      disabled={disabled}
    >
      <HiEllipsisVertical />
    </button>
  );
}

type ListProps = {
  id: number;
  children: React.ReactNode;
};

function List({ id, children }: ListProps) {
  const { openId, position, close } = useMenusContext();
  const { ref } = useOutsideClick(close, false);

  if (openId !== id || position === null) return null;

  return createPortal(
    <ul
      className="fixed rounded-md bg-white shadow-[0_0.6rem_2.4rem_rgba(0,0,0,0.06)] dark:bg-gray-0 dark:shadow-[0_0.6rem_2.4rem_rgba(0,0,0,0.3)]"
      style={{ right: position.x, top: position.y }}
      ref={ref as React.RefObject<HTMLUListElement>}
    >
      {children}
    </ul>,
    document.body,
  );
}

type ButtonProps = {
  onClick?: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
};

function Button({ children, icon, onClick }: ButtonProps) {
  const { close } = useMenusContext();

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        className="flex w-full items-center gap-[1.6rem] border-none bg-none px-[2.4rem] py-[1.2rem] text-left text-[1.6rem] text-gray-400 transition-all duration-300 hover:bg-gray-50 dark:text-gray-500 dark:hover:bg-gray-900"
        onClick={handleClick}
        aria-label="icon and text"
      >
        {icon}
        <span className="text-[1.4rem] text-gray-700 transition-all duration-200 dark:text-gray-200">
          {children}
        </span>
      </button>
    </li>
  );
}

type MenusLinkProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  href: string;
};

function MenusLink({ children, icon, href }: MenusLinkProps) {
  const { close } = useMenusContext();

  function handleClick() {
    close();
  }

  return (
    <li>
      <Link
        className="flex w-full items-center gap-[1.6rem] border-none bg-none px-[2.4rem] py-[1.2rem] text-left text-[1.6rem] text-gray-400 transition-all duration-300 hover:bg-gray-50 dark:text-gray-500 dark:hover:bg-gray-900"
        href={href}
        onClick={handleClick}
        aria-label="Link for menus"
      >
        {icon}
        <span className="text-[1.4rem] text-gray-700 transition-all duration-200 dark:text-gray-200">
          {children}
        </span>
      </Link>
    </li>
  );
}

Menus.Menu = Menu;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.MenusLink = MenusLink;

export default Menus;
