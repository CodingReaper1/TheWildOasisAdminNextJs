import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`grid h-[100vh] grid-cols-[26rem_1fr] grid-rows-[auto_1fr]`}
    >
      <Header />
      <Sidebar />
      <main className="overflow-auto bg-gray-50 p-[4rem] px-[4.8rem] pb-[6.4rem] dark:bg-gray-900">
        <div className="mx-auto my-0 flex max-w-[120rem] flex-col gap-[3.2rem]">
          {children}
        </div>
      </main>
    </div>
  );
}

export default layout;
