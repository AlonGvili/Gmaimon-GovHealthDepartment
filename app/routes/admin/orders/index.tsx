import { json, LoaderFunction } from "remix";
import { findMany } from "~/routes/api/orders/read";
import { isAuthenticated } from '~/utils/session.server';
export { CatchBoundary, ErrorBoundary } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  await isAuthenticated(request);
  let data = await findMany({});
  return json({ data });
};

