import type { LoaderFunction } from "remix";
import { useLoaderData,  } from "remix";
import { db } from "~/utils/db.server";

// export let loader: LoaderFunction = async ({ request }) => {
//   let user = await getUser(request);
//   let superuser = await db.order.findFirst({
//     where: {
//       supervisors: {
//         some: {
//           supervisor: {
//             name: user?.name,
//           },
//         },
//       },
//     },
//     include: {
//       supervisors: true,
//     },
//   });
//   return { user, superuser };
// };

export default function SupervisorPage() {
  let data = useLoaderData();
  return <div bg-red-500></div>
}
