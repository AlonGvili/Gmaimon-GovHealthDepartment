import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import OrderCard from "~/components/orderCard";
import { getUser } from '~/utils/session.server';

// export let loader: LoaderFunction = async ({ request }) => {
//   let user = await getUser(request);
//   // let orders = await db.order.findFirst({
//   //   where: {
//   //     supervisors: {
//   //       some: {
//   //         supervisor: {
//   //           name: user?.name,
//   //         },
//   //       },
//   //     },
//   //   },
//   //   include: {
//   //     supervisors: true,
//   //   },
//   // });
//   // return { orders };
// };

export default function SupervisorPage() {
  let data = useLoaderData();
  return <OrderCard orders={[data?.orders, data?.orders]} />;
}
