"use client";

import Heading from "./_components/Heading";
import Button from "./_components/Button";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();

  return (
    <main className="flex h-[100vh] items-center justify-center bg-gray-50 p-[4.8rem] dark:bg-gray-900">
      <div className="flex-[0_1_96rem] rounded-[7px] border border-gray-100 bg-white p-[4.8rem] text-center dark:border-gray-800 dark:bg-gray-0">
        <Heading className="mb-[3.2rem]" as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <Button onClick={() => router.back()} size="large">
          &larr; Go back
        </Button>
      </div>
    </main>
  );
}

export default NotFound;
