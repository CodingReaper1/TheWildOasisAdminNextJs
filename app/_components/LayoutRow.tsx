import React from "react";

type LayoutRowProps = {
  children: React.ReactNode;
};

function LayoutRow({ children }: LayoutRowProps) {
  return (
    <div className="flex flex-col gap-[3rem] sm:flex-row sm:items-center sm:justify-between">
      {children}
    </div>
  );
}

export default LayoutRow;
