import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { Classroom } from ".prisma/client";
import { getUser } from "~/utils/session.server";
import { db } from "~/utils/db.server";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  let school = await db.supervisor.findMany({
    where: {
      email: user?.email,
    },
    include: {
      Order: {
        include: {
          
        }
      }
    }
  });
};

export default function SuperVisorSchoolPage() {
  let data = useLoaderData<Classroom[]>();
  return data?.map((c) => (
    <div className="space-y-4">
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6  text-xs">
        <dd className="text-sm font-medium mt-1 text-gray-900 text-right">
          שם מבנה
          <dt className="mt-2">רמון 2</dt>
        </dd>
        <dd className="text-sm font-medium mt-1 text-gray-900 text-center">
          כמות כיתות
          <dt className="mt-2">12</dt>
        </dd>
        <dd className="text-sm font-medium mt-1 text-gray-900 text-left">
          כמות מכשירים
          <dd className="mt-2 font-normal text-xs">23</dd>
        </dd>
      </div>
    </div>
  ));
}
