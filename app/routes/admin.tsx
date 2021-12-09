import { LoaderFunction, NavLink, Link, useMatches } from "remix";
import { useLoaderData, json, Outlet } from "remix";
import { getUser } from "~/utils/session.server";
import { i18n } from "~/utils/i18n.server"; // this is the first file you created
import { useTranslation } from "react-i18next";
import SideBar from "~/components/sidebar";
import ButtonLogout from "~/components/button.logout";
import User from "~/components/user";
import {
  RiBuildingLine,
  RiCalendarTodoFill,
  RiCpuLine,
  RiListCheck2,
  RiLogoutCircleRLine,
  RiTeamLine,
  RiUserLine,
} from "react-icons/ri";
import logo from "~/assets/logo.png";
import { t } from "i18next";

export { CatchBoundary, ErrorBoundary } from "~/utils";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  return json({
    i18n: await i18n.getTranslations(request, ["common"]),
    user,
  });
};

export let handle = {
  breadcrumb: () => <Link to="/admin">{t("admin")}</Link>,
};

export default function Admin() {
  let matches = useMatches();
  let data = useLoaderData();
  let { t } = useTranslation("common");

  return (
    <div className="relative flex h-screen w-screen">
      <SideBar className="bg-white flex flex-col justify-evenly w-64 px-8 py-12">
        <img src={logo} className="w-24 mb-32 object-contain self-center" />
        <div className="h-full">
          <NavLink
            to="orders"
            prefetch="intent"
            className={({ isActive }) =>
              isActive ? "text-brand" : "text-gray-500 "
            }
          >
            <div className="flex w-full items-center mb-2 p-2 hover:bg-gray-100 hover:rounded-md text-sm">
              <RiCalendarTodoFill className="h-5 w-5 ml-6 text-center" />
              <p className="text-current">{t("orders")}</p>
            </div>
          </NavLink>
          <NavLink
            to="tasks"
            prefetch="intent"
            className={({ isActive }) =>
              isActive ? "text-brand" : "text-gray-500"
            }
          >
            <div className="flex w-full items-center mb-2 p-2 hover:bg-gray-100 hover:rounded-md text-sm">
              <RiListCheck2 className="h-5 w-5 ml-6 text-center" />
              <p className="text-current">{t("tasks")}</p>
            </div>
          </NavLink>
          <NavLink
            to="schools"
            prefetch="intent"
            className={({ isActive }) =>
              isActive ? "text-brand" : "text-gray-500"
            }
          >
            <div className="flex w-full items-center mb-2 p-2 hover:bg-gray-100 hover:rounded-md text-sm">
              <RiBuildingLine className="h-5 w-5 ml-6 text-center" />
              <p className="text-current">{t("schools")}</p>
            </div>
          </NavLink>
          <NavLink
            to="devices"
            prefetch="intent"
            className={({ isActive }) =>
              isActive ? "text-brand" : "text-gray-500"
            }
          >
            <div className="flex w-full items-center mb-2 p-2 hover:bg-gray-100 hover:rounded-md text-sm">
              <RiCpuLine className="h-5 w-5 ml-6 text-center" />
              <p className="text-current">{t("devices")}</p>
            </div>
          </NavLink>
          <NavLink
            to="users"
            prefetch="intent"
            className={({ isActive }) =>
              isActive ? "text-brand" : "text-gray-500"
            }
          >
            <div className="flex w-full items-center mb-2 p-2 hover:bg-gray-100 hover:rounded-md text-sm">
              <RiUserLine className="h-5 w-5 ml-6 text-center" />
              <p className="text-current">{t("users")}</p>
            </div>
          </NavLink>
          <NavLink
            to="teams"
            prefetch="intent"
            className={({ isActive }) =>
              isActive ? "text-brand" : "text-gray-500"
            }
          >
            <div className="flex w-full items-center mb-2 p-2 hover:bg-gray-100 hover:rounded-md text-sm">
              <RiTeamLine className="h-5 w-5 ml-6 text-center" />
              <p className="text-current font-medium">{t("teams")}</p>
            </div>
          </NavLink>
        </div>
        <div>
          <User t={t} className="w-full mb-6">
            <User.Title t={t} user={data.user} />
          </User>
          <ButtonLogout dir="rtl" className="text-gray-500">
            <div className="flex w-full items-center mb-6">
              <RiLogoutCircleRLine className="h-5 w-5 ml-6 text-center" />
              <p className="text-current">{t("logout")}</p>
            </div>
          </ButtonLogout>
        </div>
      </SideBar>
      <div className="flex flex-col w-full">
        {/* <div className="max-w-md w-full flex">
          {matches
            .filter((match) => match.handle && match.handle.breadcrumb)
            .map((match, index) => (
              <div key={index}>{match.handle.breadcrumb({match, t})}</div>
            ))}
        </div> */}
        <div className="bg-gray-100 p-12 h-full w-full">
        <Outlet />
        </div>
      </div>
    </div>
  );
}
