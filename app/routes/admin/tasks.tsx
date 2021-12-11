import { json, LoaderFunction, Outlet, useLoaderData } from "remix";
import TasksBlade from "~/components/TaskBlade";
import { findMany } from "~/routes/api/tasks/findMany";
import type { TaskReturnType } from "~/routes/api/tasks/delete";
import { isAuthenticated } from '~/utils/session.server';
export { CatchBoundary, ErrorBoundary } from "~/utils";

type LoaderData = {
  count: TaskReturnType[0];
  data: TaskReturnType[1]
}
export let loader: LoaderFunction = async ({request}) => {
  await isAuthenticated(request);
  let [{count}, {data}] = await findMany({});
  return json({ count, data });
};

export default function TasksView() {
  let {count, data} = useLoaderData<LoaderData>();
  return (
    <div className="w-full h-full">
      {/* all tasks overview placeholder */}
      <Outlet />
    </div>
  );
}
