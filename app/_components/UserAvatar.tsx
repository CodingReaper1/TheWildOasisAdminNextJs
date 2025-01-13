"use client";

import Image from "next/image";
import defaultAvatar from "@/public/default-user.jpg";
import { useSession } from "next-auth/react";
import SpinnerMini from "./SpinnerMini";

function UserAvatar() {
  const { data: session } = useSession();

  return (
    <div className="flex h-[3.6rem] items-center gap-[1.2rem] pr-6 text-[1.4rem] font-medium">
      {session ? (
        <>
          <Image
            className="block aspect-square h-[3.6rem] w-[3.6rem] rounded-[50%] object-cover object-center outline-2 outline-[var(--color-grey-100)]"
            src={session?.user.image || defaultAvatar}
            quality={70}
            alt="Avatar of person"
            sizes="10vw"
            width={36}
            height={36}
          />
          <span className="hidden md:inline-block">{session?.user.name}</span>
        </>
      ) : (
        <SpinnerMini />
      )}
    </div>
  );
}

export default UserAvatar;
