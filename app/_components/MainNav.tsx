import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import NavLink from "./NavLink";

type MainNavProps = {
  onClick?: () => void;
};

function MainNav({ onClick }: MainNavProps) {
  return (
    <nav className="mb-2">
      <ul className="flex flex-col gap-[0.8rem]">
        <li onClick={onClick}>
          <NavLink text="Home" href="/dashboard">
            <HiOutlineHome />
          </NavLink>
        </li>
        <li onClick={onClick}>
          <NavLink text="Reservations" href="/reservations">
            <HiOutlineCalendarDays />
          </NavLink>
        </li>
        <li onClick={onClick}>
          <NavLink text="Cabins" href="/cabins">
            <HiOutlineHomeModern />
          </NavLink>
        </li>
        <li onClick={onClick}>
          <NavLink text="Users" href="/users">
            <HiOutlineUsers />
          </NavLink>
        </li>
        <li onClick={onClick}>
          <NavLink text="Settings" href="/settings">
            <HiOutlineCog6Tooth />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
