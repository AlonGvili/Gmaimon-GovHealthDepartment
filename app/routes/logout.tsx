import type { ActionFunction, LoaderFunction } from "remix";
import { destroySession, getUserSession } from "../utils/session.server";
import { redirect } from "remix";

export let action: ActionFunction = async ({ request }) => {
  let session = await getUserSession(request);
  if (session) {
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
  return null;
};

export const loader: LoaderFunction = async () => {
  return redirect("/");
};
