import type { LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import { db } from "~/utils/db.server";
import Tabs from "~/components/Tabs";
import { getUser } from "~/utils/session.server";
import { Outlet } from "react-router";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  // let superuser = await db.supervisor.findFirst({
  //   where: { email: user?.email },
  //   include: {
  //     supervisors: {
  //       include: {
  //         order: true
  //       }
  //     }
  //   }
  // })
  // let superuser = await db.order.findFirst({
  //   where: {
  //     supervisors: {
  //       some: {
  //         supervisor: {
  //           name: user?.name,
  //         },
  //       },
  //     },
  //   },
  //   include: {
  //     supervisors: true,
  //   },
  // });
  return { user };
};

export default function SupervisorPage() {
  let data = useLoaderData();
  return (
    <div className="p-12">
      <div className="bg-white sm:rounded-lg w-full px-2 sm:px-0 flex justify-between items-center">
        <div className="px-4 py-5 sm:px-6 flex-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            שלום, {data.user?.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">מנהל המערכת</p>
        </div>
        <div className="flex items-center justify-between max-w-md flex-1 px-4 py-5 sm:px-6">
          <Link to="orders">
            <div className="text-gray-800 font-semibold text-md">הזמנות</div>
          </Link>
          <Link to="supervisors">
            <div className="text-gray-800 font-semibold text-md">מפקחים</div>
          </Link>
          <Link to="teams">
            <div className="text-gray-800 font-semibold text-md">צוותים</div>
          </Link>
          <Link to="schools">
            <div className="text-gray-800 font-semibold text-md">מוסדות</div>
          </Link>
          <Link to="users">
            <div className="text-gray-800 font-semibold text-md">עובדים</div>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
