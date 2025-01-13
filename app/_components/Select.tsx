type SelectProps = {
  options: { value: string; label: string }[];
  value: string;
  type: string;
  handleClick: (value: string) => void;
};

function Select({ options, value, type, handleClick }: SelectProps) {
  return (
    <select
      className={`w-[18rem] rounded-md border border-gray-100 bg-white px-[1.2rem] py-[0.8rem] text-[1.3rem] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-gray-800 dark:bg-gray-0 dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)] sm:w-auto sm:text-[1.4rem] ${type === "white" ? "text-gray-800 dark:text-gray-100" : "text-gray-300 dark:text-gray-600"}`}
      value={value}
      onChange={(e) => handleClick(e.target.value)}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
