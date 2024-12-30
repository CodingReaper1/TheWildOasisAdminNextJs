"use client";

import { createContext, useContext } from "react";

type TableContextTypes = {
  columns: string;
};

const TableContext = createContext<null | TableContextTypes>(null);

type TableProps = {
  columns: string;
  children: React.ReactNode;
};

function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className="overflow-hidden rounded-[7px] border border-gray-200 dark:border-gray-700"
        role="table"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function useTableContext() {
  const context = useContext(TableContext);

  if (context === null)
    throw new Error("TableContext was used outside of Table");

  return context;
}

type HeaderProps = {
  role?: string;
  children: React.ReactNode;
};

function Header({ children, role }: HeaderProps) {
  const { columns } = useTableContext();

  return (
    <header
      className="grid items-center gap-y-[2.4rem] border-b border-gray-100 bg-gray-50 px-[2.4rem] py-[1.6rem] text-[1.4rem] font-semibold uppercase tracking-[0.4px] text-gray-600 transition-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
      style={{ gridTemplateColumns: columns }}
      role={role || "row"}
    >
      {children}
    </header>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  const { columns } = useTableContext();
  return (
    <div
      className="col grid items-center gap-x-[2.4rem] border-b border-gray-100 bg-white px-[2.4rem] py-[1.2rem] text-[1.4rem] text-gray-600 transition-none last:border-none dark:border-gray-800 dark:bg-gray-0 dark:text-gray-300"
      style={{ gridTemplateColumns: columns }}
      role="row"
    >
      {children}
    </div>
  );
}

type BodyProps<T> = {
  data: T[];
  render: (reservationOrCabin: T, i: number) => JSX.Element;
};

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length)
    return (
      <p className="m-[2.4rem] text-center text-[1.6rem] font-medium">
        No data to show at the moment
      </p>
    );

  return <section>{data.map(render)}</section>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer
      className={`flex justify-center bg-gray-50 p-[1.2rem] dark:bg-gray-900 ${!children ? "hidden" : ""}`}
    >
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
