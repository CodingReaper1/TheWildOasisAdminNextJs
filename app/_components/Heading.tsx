type HeadingProps = {
  children: React.ReactNode;
  as: "h1" | "h2" | "h3" | "h4";
  className?: string;
};

function Heading({ children, as, className }: HeadingProps) {
  return (
    <h1
      className={`leading-[1.4] text-gray-800 dark:text-gray-100 ${as === "h1" && "text-[2rem] font-semibold xs:text-[2.5rem] sm:text-[3rem]"} ${as === "h2" && "text-[2rem] font-semibold"} ${as === "h3" && "text-[2rem] font-medium"} ${as === "h4" && "text-center text-[3rem] font-semibold"} ${className}`}
    >
      {children}
    </h1>
  );
}

export default Heading;
