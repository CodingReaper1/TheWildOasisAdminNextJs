"use client";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from "./UserAvatar";

function Header() {
  return (
    <>
      <header className="gap--[2.4rem] fixed right-0 top-0 z-[99] flex w-full items-center justify-end border-b border-gray-100 bg-[#fff] px-[4.8rem] py-[1.2rem] dark:border-gray-800 dark:bg-gray-0">
        <UserAvatar />
        <HeaderMenu />
      </header>
    </>
  );
}

export default Header;
