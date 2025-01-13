import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Header />
      <Sidebar />

      <main className="mt-[5rem] min-h-[100vh] overflow-y-auto overflow-x-hidden bg-gray-50 p-[4rem] px-[1.6rem] pb-[6.4rem] dark:bg-gray-900 xs:px-[2.4rem] md:ml-[9rem] md:px-[4.8rem]">
        <div className="mx-auto my-0 flex max-w-[120rem] flex-col gap-[1rem] sm:gap-[3.2rem]">
          {children}
        </div>
      </main>
    </div>
  );
}

export default layout;
