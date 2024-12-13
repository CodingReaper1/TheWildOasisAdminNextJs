import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import NavLink from "./NavLink";

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        <li>
          <NavLink text="Home" href="/dashboard">
            <HiOutlineHome />
          </NavLink>
        </li>
        <li>
          <NavLink text="Bookings" href="/bookings">
            <HiOutlineCalendarDays />
          </NavLink>
        </li>
        <li>
          <NavLink text="Cabins" href="/cabins">
            <HiOutlineHomeModern />
          </NavLink>
        </li>
        <li>
          <NavLink text="Users" href="/users">
            <HiOutlineUsers />
          </NavLink>
        </li>
        <li>
          <NavLink text="Settings" href="/settings">
            <HiOutlineCog6Tooth />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
