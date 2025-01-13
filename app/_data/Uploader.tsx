import Button from "../_components/Button";
import MotionComponent from "../_components/MotionComponent";
import { sidebarVariants } from "../_components/Sidebar";
import { uploadAll } from "../_lib/actions";

function Uploader() {
  return (
    <MotionComponent
      className="flex w-full flex-col items-center justify-center gap-[8px] rounded-md bg-white p-[0.8rem] text-center dark:bg-gray-0 md:w-auto md:items-start md:justify-normal"
      variants={sidebarVariants}
    >
      <form className="w-[16rem]" action={uploadAll}>
        <h3 className="mb-5 text-[1.8rem] font-extrabold text-gray-700 dark:text-gray-200">
          SAMPLE DATA
        </h3>

        <Button ariaLabel="Upload reservations">Upload All</Button>
      </form>
    </MotionComponent>
  );
}

export default Uploader;
