import { json, LoaderFunction, Outlet, useLoaderData } from "remix";
import { findMany } from "~/routes/api/tasks/findMany";
import { isAuthenticated } from '~/utils/session.server';
import { OrderReturnType } from "../api/orders/read";
export { CatchBoundary, ErrorBoundary } from "~/utils";

type LoaderData = {
  count: OrderReturnType[0];
  data: OrderReturnType[1]
}
export let loader: LoaderFunction = async ({request}) => {
  await isAuthenticated(request);
  let [{count}, {data}] = await findMany({});
  return json({ count, data });
};

export default function OrderView() {
  let {count, data} = useLoaderData<LoaderData>();
  return (
    <div className="w-full h-full">
      {/* all orders overview placeholder */}
      <Outlet />
    </div>
  );
}
