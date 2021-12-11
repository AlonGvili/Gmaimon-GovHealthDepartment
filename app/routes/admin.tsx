import { LoaderFunction } from "remix";
import { useLoaderData, json, Outlet } from "remix";
import { getUser } from "~/utils/session.server";
import { i18n } from "~/utils/i18n.server"; // this is the first file you created
import SideBar from "~/components/sidebar";
import ButtonLogout from "~/components/button.logout";
import User from "~/components/user";
import {
  RiBuildingLine,
  RiCalendarTodoFill as RiCalendarFill,
  RiCpuLine,
  RiListCheck2,
  RiLogoutCircleRLine,
  RiUserLine,
} from "react-icons/ri";
import logo from "~/assets/logo.png";
import NavBarLink from "~/components/NavBarLink";
import { Modal } from "~/components/modal";
import { Drawer } from "~/components/drawer";

export { CatchBoundary, ErrorBoundary } from "~/utils";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  return json({
    i18n: await i18n.getTranslations(request, ["common"]),
    user,
  });
};

export default function Admin() {
  let data = useLoaderData();
  return (
    <div className="relative flex h-screen w-screen">
      <SideBar className="bg-white flex flex-col justify-evenly w-64 px-8 py-12">
        <img src={logo} className="w-24 mb-32 object-contain self-center" />
        <div className="h-full">
          <NavBarLink to="/admin/orders" icon={RiCalendarFill} label="orders" />
          <NavBarLink to="/admin/tasks" icon={RiListCheck2} label="tasks" />
          <NavBarLink
            to="/admin/schools"
            icon={RiBuildingLine}
            label="schools"
          />
          <NavBarLink to="/admin/devices" icon={RiCpuLine} label="devices" />
          <NavBarLink to="/admin/users" icon={RiUserLine} label="users" />
        </div>
        <div>
          <User user={data.user} className="w-full mb-6" />
          <ButtonLogout
            icon={RiLogoutCircleRLine}
            className="text-gray-500"
            children="logout"
          />
        </div>
      </SideBar>
      <div className="flex flex-col p-6 h-full w-full">
        <Drawer>
          <Outlet />
        </Drawer>
      </div>
    </div>
  );
}
