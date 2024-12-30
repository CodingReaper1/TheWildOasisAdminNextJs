"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MotionComponent from "./MotionComponent";
import { sidebarVariants } from "./Sidebar";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  text: string;
};

function NavLink({ children, href, text }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      aria-label="Link for main nav"
      className={`flex items-center px-[2rem] py-[1.2rem] text-[2.4rem] transition-all duration-300 ${isActive ? "rounded-md bg-gray-50 text-indigo-600 dark:bg-gray-900 dark:text-indigo-600" : "text-gray-400 hover:rounded-md hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-500 hover:dark:bg-gray-900 hover:dark:text-indigo-600"}`}
      href={href}
    >
      {children}
      <MotionComponent
        as="span"
        className={`text-gray- text-[1.6rem] font-medium hover:text-gray-800 dark:text-gray-300 hover:dark:text-gray-100 ${isActive ? "text-gray-800 dark:text-gray-100" : ""}`}
        variants={sidebarVariants}
      >
        {text}
      </MotionComponent>
    </Link>
  );
}

export default NavLink;
