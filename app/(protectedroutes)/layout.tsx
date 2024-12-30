import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Header />
      <Sidebar />
      <main className="ml-[9rem] mt-[5rem] min-h-[100vh] overflow-auto bg-gray-50 p-[4rem] px-[4.8rem] pb-[6.4rem] dark:bg-gray-900">
        <div className="mx-auto my-0 flex max-w-[120rem] flex-col gap-[3.2rem]">
          {children}
        </div>
      </main>
    </div>
  );
}

export default layout;
