import {
  RiCalendarFill,
  RiListCheck2,
  RiBuildingLine,
  RiCpuLine,
  RiUserLine,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { json, LoaderFunction, Outlet, useLoaderData } from "remix";
import ButtonLogout from "~/components/button.logout";
import NavBarLink from "~/components/NavBarLink";
import SideBar from "~/components/sidebar";
import User from "~/components/user";
import logo from "~/assets/logo.png";
import { i18n } from "~/utils/i18n.server";
import { getUser } from "~/utils/session.server";

export { CatchBoundary, ErrorBoundary } from "~/utils";
export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  return json({
    i18n: await i18n.getTranslations(request, ["common"]),
    user,
  });
};
export default function Index() {
  let data = useLoaderData();
  return (
    <div className="relative flex h-screen w-screen">
      <SideBar className="bg-white flex flex-col justify-evenly w-64 px-8 py-12">
        <img src={logo} className="w-24 mb-32 object-contain self-center" />
        <div className="h-full">
          <NavBarLink
            to={`/member/${data.user.socialNumber}/orders`}
            icon={RiCalendarFill}
            label="orders"
          />
          <NavBarLink
            to={`/member/${data.user.socialNumber}/tasks`}
            icon={RiListCheck2}
            label="tasks"
          />
          <NavBarLink
            to={`/member/${data.user.socialNumber}/schools`}
            icon={RiBuildingLine}
            label="schools"
          />
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
        <Outlet />
      </div>
    </div>
  );
}
