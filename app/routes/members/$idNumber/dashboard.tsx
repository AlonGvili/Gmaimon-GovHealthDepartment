import { RiLogoutCircleLine } from "react-icons/ri";
import { LoaderFunction, Outlet, useLoaderData } from "remix";
import { db } from '~/utils/db.server';
import { getUser } from '~/utils/session.server';

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request)
  return await db.user.findFirst({
    where: {
      email: user?.email
    }
  })
};

export default function DashboardLayout() {
  let data = useLoaderData();
  return (
    <>
      <div
        dir="rtl"
        className="w-screen h-14 bg-white  flex justify-between items-center border-b-2"
      >
        <div className="flex justify-center items-center">
          <form action="/logout" method="post">
            <button
              type="submit"
              className="h-14 w-14 text-blue-500 flex justify-center"
            >
              <RiLogoutCircleLine className="self-center" />
            </button>
          </form>
          <p className="text-gray-600">{data.name}</p>
        </div>
        <h1 className="pl-6 text-gray-600 font-semibold">Meditav</h1>
      </div>
      <div className="flex flex-1 bg-blue-500 w-full h-full mx-auto justify-center flex-col">
        <Outlet />
      </div>
    </>
  );
}
