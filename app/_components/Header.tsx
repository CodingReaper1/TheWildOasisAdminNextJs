"use client";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from "./UserAvatar";
import { FiMenu } from "react-icons/fi";
import PhoneNav from "./PhoneNav";

function Header() {
  return (
    <>
      <header className="gap--[2.4rem] fixed right-0 top-0 z-[99] flex w-full items-center justify-end border-b border-gray-100 bg-[#fff] px-[2.4rem] py-[1.2rem] dark:border-gray-800 dark:bg-gray-0 md:px-[4.8rem]">
        <PhoneNav>
          <PhoneNav.Open>
            <button
              aria-label="icon"
              className="mr-auto rounded-md border-none bg-none p-[0.6rem] text-[2.2rem] text-indigo-600 hover:bg-gray-100 hover:dark:bg-gray-800 md:hidden"
            >
              <FiMenu />
            </button>
          </PhoneNav.Open>
          <PhoneNav.Window />
        </PhoneNav>

        <UserAvatar />
        <HeaderMenu />
      </header>
    </>
  );
}

export default Header;
