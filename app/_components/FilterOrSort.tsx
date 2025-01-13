"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Select from "./Select";
import Filter from "./Filter";
import useBreakPoint from "../_hooks/useBreakPoint";

type FilterProps = {
  field: "sortBy" | "status" | "discount" | "last";
  options: { value: string; label: string }[];
  horizontalUntil?: number;
};

function FilterOrSort({ options, field, horizontalUntil }: FilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentFilter = searchParams.get(field) || options[0].value;

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(field, value);
    if (searchParams.get("page")) params.set("page", "1");

    history.pushState(null, "", `${pathname}?${params.toString()}`);
  }

  const { isLowerThan } = useBreakPoint(horizontalUntil);
  // to show horizontally until screenwidth reaches some point
  return (
    <>
      {horizontalUntil && !isLowerThan ? (
        <Filter
          options={options}
          currentFilter={currentFilter}
          handleClick={handleClick}
        />
      ) : (
        <Select
          options={options}
          value={currentFilter}
          type="white"
          handleClick={handleClick}
        />
      )}
    </>
  );
}

export default FilterOrSort;
