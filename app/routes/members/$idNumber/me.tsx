import { Team, User } from ".prisma/client";
import { Form, LoaderFunction, redirect, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { getUser } from '~/utils/session.server';

type LoaderData = User & {
  Team: Team | null;
};

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await getUser(request);
  let user = await db.user.findUnique({
    where: {
      email: userId?.email!,
    },
    include: {
      Team: true,
    },
  });
  if (!user) {
    return redirect("/login");
  }
  return user;
};

export default function User() {
  let data = useLoaderData<LoaderData>();
  return (
    <div className="flex flex-col justify-center items-center">
      <Form>
        <fieldset>
          <label className="text-2xl text-gray-600">פרטי משתמש</label>
          <input
            className="w-full border-2 border-gray-200"
            type="text"
            name="name"
            value={data.name}
            disabled
          />
          <input
            className="w-full border-2 border-gray-200"
            type="email"
            name="email"
            value={data.email}
            disabled
          />
          <input
            className="w-full border-2 border-gray-200"
            type="text"
            name="idNumber"
            value={data.idNumber}
            disabled
          />
          <input
            className="w-full border-2 border-gray-200"
            type="tel"
            name="phone"
            value={data.phone}
            disabled
          />
        </fieldset>
        <fieldset>
          <label>פרטי צוות</label>
          <input
            className="w-full border-2 border-gray-200"
            type="number"
            name="teamId"
            value={data.Team?.id}
            disabled
          />
          <input
            className="w-full border-2 border-gray-200"
            type="text"
            name="leaderName"
            value={data.Team?.leaderName}
            disabled
          />
          <input
            className="w-full border-2 border-gray-200"
            type="text"
            name="leaderNumber"
            value={data.Team?.leaderIdNumber}
            disabled
          />
        </fieldset>
      </Form>
    </div>
  );
}
