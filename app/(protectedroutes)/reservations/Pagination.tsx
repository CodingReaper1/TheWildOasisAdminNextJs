"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { PAGE_SIZE } from "../../_utils/constants";
import { usePathname, useSearchParams } from "next/navigation";

function Pagination({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam === null ? 1 : +pageParam;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    const params = new URLSearchParams(searchParams);

    params.set("page", `${next}`);

    history.pushState(null, "", `${pathname}?${params.toString()}`);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    const params = new URLSearchParams(searchParams);

    params.set("page", `${prev}`);

    history.pushState(null, "", `${pathname}?${params.toString()}`);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <p className="ml-[0.8rem] text-[1.4rem] text-gray-900 dark:text-red-50">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-[0.6rem]">
        <button
          aria-label="Pagination"
          className={`flex items-center justify-center gap-[0.4rem] rounded-md border-none bg-gray-50 px-[0.8rem] py-[0.6rem] text-[1.4rem] font-medium transition-all duration-300 dark:bg-gray-900 dark:text-indigo-50 ${currentPage !== 1 ? "hover:bg-indigo-600 hover:text-indigo-50 dark:hover:bg-indigo-600 dark:hover:text-indigo-50" : ""}}`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft className="text-[1.8rem]" />
          <span className="pr-[0.4rem]">Previous</span>
        </button>

        <button
          aria-label="Pagination"
          className={`flex items-center justify-center gap-[0.4rem] rounded-md border-none bg-gray-50 px-[0.8rem] py-[0.6rem] text-[1.4rem] font-medium transition-all duration-300 dark:bg-gray-900 dark:text-indigo-50 ${currentPage !== pageCount ? "hover:bg-indigo-600 hover:text-indigo-50 dark:hover:bg-indigo-600 dark:hover:text-indigo-50" : ""}}`}
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span className="pl-[0.4rem]">Next</span>
          <HiChevronRight className="text-[1.8rem]" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
