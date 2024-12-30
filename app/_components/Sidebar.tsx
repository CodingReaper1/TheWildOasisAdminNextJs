import Uploader from "../_data/Uploader";
import MotionComponent from "./MotionComponent";
import { Variants } from "framer-motion";
import Image from "next/image";
import MainNav from "./MainNav";

export const sidebarVariants: Variants = {
  initial: {
    width: 0,
    opacity: 0,
    paddingLeft: 0,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeInOut",
    },
  },
  hover: {
    width: 120,
    opacity: 1,
    paddingLeft: 12,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeInOut",
    },
  },
};

function Sidebar() {
  return (
    <MotionComponent
      as="aside"
      className="fixed left-0 top-0 z-[999] flex h-full min-h-[55rem] flex-col justify-between overflow-hidden border-r border-gray-100 bg-white px-[2.4rem] py-[3.2rem] text-gray-0 dark:border-gray-800 dark:bg-gray-0"
      // initial="hover"
      initial="initial"
      whileHover="hover"
    >
      <div className="relative mb-14 ml-3 h-[5rem] w-[5rem]">
        <Image
          fill
          src="/favicon.png"
          className="aspect-1 object-contain"
          alt="Wild oasis logo"
          quality={70}
          sizes="20vw"
        />
      </div>

      <MainNav />

      <Uploader />
    </MotionComponent>
  );
}

export default Sidebar;
