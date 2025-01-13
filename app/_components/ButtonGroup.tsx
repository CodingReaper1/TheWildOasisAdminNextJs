function ButtonGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap justify-end gap-[1.2rem]">{children}</div>
  );
}

export default ButtonGroup;
