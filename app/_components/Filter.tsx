"use client";

type FilterProps = {
  options: { value: string; label: string }[];
  handleClick: (value: string) => void;
  currentFilter: string;
};

function Filter({ options, handleClick, currentFilter }: FilterProps) {
  return (
    <div className="flex gap-[0.4rem] rounded-md border border-gray-100 bg-white p-[0.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-gray-800 dark:bg-gray-0 dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
      {options.map((option, i) => (
        <button
          className={`font rounded-md border-none px-[0.8rem] py-[0.44rem] text-[1.2rem] font-medium transition-all duration-300 sm:text-[1.3rem] md:text-[1.4rem] ${option.value === currentFilter ? "bg-indigo-600 text-indigo-50" : "bg-white text-gray-900 hover:bg-indigo-600 hover:text-indigo-50 dark:bg-gray-0 dark:text-indigo-50 dark:hover:bg-indigo-600"}`}
          key={option.value}
          aria-label={`Filter button ${i}`}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
