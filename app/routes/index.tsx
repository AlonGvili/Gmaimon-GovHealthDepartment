import { LoaderFunction, redirect } from "remix";
import { getUser } from '~/utils/session.server';

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request)
  if (!user) return redirect("/login");
  if (user?.role === "SUPERVISOR") {
    return redirect(`members/${user.idNumber}/dashboard/supervisor/orders`);
  }
  if (user?.role === "ADMIN") {
    return redirect(`admin`);
  }
  return redirect(`/members/${user.idNumber}/dashboard`);
};
