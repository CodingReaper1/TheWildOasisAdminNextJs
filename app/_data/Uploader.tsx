import Button from "../_components/Button";
import { createDummyReservations } from "../_lib/reservationActions";
import MotionComponent from "../_components/MotionComponent";
import { sidebarVariants } from "../_components/Sidebar";

function Uploader() {
  return (
    <MotionComponent
      className="flex flex-col gap-[8px] rounded-md bg-white p-[0.8rem] text-center dark:bg-gray-0"
      variants={sidebarVariants}
    >
      <form className="w-[16rem]" action={createDummyReservations}>
        <h3 className="mb-5 text-[1.8rem] font-extrabold text-gray-700 dark:text-gray-200">
          SAMPLE DATA
        </h3>

        <Button ariaLabel="Upload reservations">
          Upload reservations ONLY
        </Button>
      </form>
    </MotionComponent>
  );
}

export default Uploader;
