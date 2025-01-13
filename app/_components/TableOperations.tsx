function TableOperations({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[1.6rem] sm:flex-row sm:items-center">
      {children}
    </div>
  );
}

export default TableOperations;
