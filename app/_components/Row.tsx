type RowProps = {
  children: React.ReactNode;
  type?: "vertical" | "horizontal";
  className?: string;
};

function Row({ children, type = "vertical", className }: RowProps) {
  return (
    <div
      className={`flex ${className} ${type === "vertical" ? "flex-col gap-[2.5rem]" : "items-center justify-between"}`}
    >
      {children}
    </div>
  );
}

export default Row;
