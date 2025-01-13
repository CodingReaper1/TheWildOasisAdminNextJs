"use client";

import { useFormStatus } from "react-dom";
import { tw } from "../_utils/tw";
import Link from "next/link";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  variation?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  pendingStatus?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  ariaLabel: string;
};

function Button({
  size = "medium",
  variation = "primary",
  children,
  onClick,
  type,
  disabled,
  pendingStatus,
  href,
  ariaLabel,
}: ButtonProps) {
  const sizeStyles = {
    small: tw(
      `px-[0.8rem] py-[0.4rem] text-center text-[1.2rem] font-semibold uppercase`,
    ),
    medium: tw(`px-[1.6rem] py-[1.2rem] text-[1.4rem] font-medium`),
    large: tw(`px-[1.6rem] py-[1.2rem] text-[1.6rem] font-medium`),
  };

  const variationsStyles = {
    primary: tw(`border-none bg-indigo-600 text-indigo-50 hover:bg-indigo-700`),
    secondary: tw(
      `border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:dark:bg-gray-900`,
    ),
    danger: tw(`border-none bg-red-700 text-red-100 hover:bg-red-800`),
  };

  const { pending } = useFormStatus();

  return (
    <>
      {!href ? (
        <button
          disabled={pending || disabled}
          onClick={onClick}
          type={type}
          aria-label={ariaLabel}
          className={`rounded-md shadow-[0_0_0_rgba(0,0,0,0.04)] disabled:cursor-not-allowed dark:shadow-[0_0_0_rgba(0,0,0,0.4)] ${sizeStyles[size]} ${variationsStyles[variation]} `}
        >
          {pending && pendingStatus ? pendingStatus : children}
        </button>
      ) : (
        <Link
          onClick={disabled ? (e) => e.preventDefault() : onClick}
          type={type}
          href={disabled ? "#" : href}
          aria-label={ariaLabel}
          className={`rounded-md shadow-[0_0_0_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_rgba(0,0,0,0.4)] ${sizeStyles[size]} ${variationsStyles[variation]} ${disabled ? "cursor-not-allowed" : ""}`}
        >
          {pending && pendingStatus ? pendingStatus : children}
        </Link>
      )}
    </>
  );
}

export default Button;
