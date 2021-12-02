import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import Tabs from "~/components/Tabs";
import { getUser } from '~/utils/session.server';

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request)
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
    <>
      <div className="bg-white sm:rounded-lg w-full max-w-3xl px-2 mt-12 sm:px-0 mx-auto">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            שלום, {data.user?.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            המפקח של {data.superuser?.schoolName}
          </p>
        </div>
      </div>
      <Tabs
        tabs={[
          { label: "הזמנות", to: "orders", index: 0 },
          { label: "מבנים", to: "classes", index: 1 },
          { label: "התקנות", to: "reports", index: 2 },
        ]}
      />
    </>
  );
}
