import React from "react";

type DataItemProps = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
};

function DataItem({ icon, label, children }: DataItemProps) {
  return (
    <div className="flex items-center gap-[1.6rem] py-[0.8rem]">
      <span className="flex items-center gap-[0.8rem] text-[1.6rem] font-medium text-gray-700 dark:text-gray-200">
        {icon}
        <span
          className={`${label === "Total price" && "text-green-700 dark:text-green-200"}`}
        >
          {label}
        </span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;
