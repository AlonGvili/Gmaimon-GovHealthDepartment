import type { LoaderFunction } from "remix";
import { getUser, getUserId } from "~/utils/session.server";
import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  let superuser = await db.order.findFirst({
    where: {
      supervisors: {
        some: {
          supervisor: {
            idNumber: user?.idNumber,
          },
        },
      },
    },
    include: {
      supervisors: true,
    },
  });
  return { user, superuser };
};

export default function GreetingCard() {
  let data = useLoaderData();
  console.log(data);
  return (
    <div>
      <h1>{data.user?.name} שלום </h1>
      <p>{data.user?.phone} הטלפון שלך </p>
      <p>{data.superuser?.schoolName} הינך המפקי של </p>
    </div>
  );
}
