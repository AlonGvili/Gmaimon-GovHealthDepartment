import { RiBuildingFill, RiBuildingLine } from "react-icons/ri";
import { NavLink, Outlet, useLocation, useMatches } from "remix";

export default function Add() {
  return (
    <div dir="rtl" className="flex h-full">
      <section className="bg-white col-auto px-4 py-4 flex-initial">
        <nav className="flex flex-col space-y-8">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-purple-700 group" : "text-gray-400 group"
            }
            to="school"
          >
            <div className="flex flex-col justify-center items-center px-2">
              <RiBuildingFill className="w-6 h-6 group-hover:text-purple-500 group-active:text-purple-400" />
              <p className="text-xm break-words w-max">מוסד חינוך</p>
            </div>
          </NavLink>
        </nav>
      </section>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
