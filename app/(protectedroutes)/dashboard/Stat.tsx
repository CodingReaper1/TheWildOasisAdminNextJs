import { tw } from "../../_utils/tw";
import React from "react";

type StatProps = {
  color: "green" | "indigo" | "yellow" | "blue";
  icon: React.ReactNode;
  title: string;
  value?: string;
};

function Stat({ icon, title, value, color }: StatProps) {
  const conditionalStyles = {
    green: tw(
      `bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200`,
    ),
    indigo: tw(
      `bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200`,
    ),
    yellow: tw(
      `bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200`,
    ),
    blue: tw(`bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200`),
  };

  return (
    <div className="grid min-h-[10rem] grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] gap-x-[1.6rem] gap-y-[0.4rem] rounded-[7px] border border-gray-100 bg-white p-[1.6rem] dark:border-gray-800 dark:bg-gray-0">
      <div
        className={`col-start-1 col-end-1 row-start-1 row-end-3 flex items-center justify-center rounded-[50%] text-[3.2rem] ${conditionalStyles[color]}`}
      >
        {icon}
      </div>
      <h5 className="self-end text-[1.2rem] font-semibold uppercase tracking-[0.4px] text-gray-500 dark:text-gray-400">
        {title}
      </h5>
      <p className="col-start-2 col-end-3 row-start-2 row-end-3 text-[2.4rem] font-medium leading-[1]">
        {value}
      </p>
    </div>
  );
}

export default Stat;
