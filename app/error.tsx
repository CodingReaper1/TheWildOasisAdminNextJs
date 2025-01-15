"use client";

import Heading from "./_components/Heading";
import Button from "./_components/Button";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex h-[100vh] items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="m-[2.4rem] flex-[0_1_96rem] rounded-[7px] border border-gray-100 bg-white p-[2.4rem] text-center dark:border-gray-800 dark:bg-gray-0 sm:m-[4.8rem] sm:p-[4.8rem]">
        <Heading className="mb-[1.6rem]" as="h1">
          Something went wrong 😥
        </Heading>
        <p className="mb-[3.2rem] font-sono text-gray-500 dark:text-gray-400">
          {error.message}
        </p>
        <Button ariaLabel="retry" size="large" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}

export default Error;
