import { LoaderFunction, useLoaderData, json } from "remix";
import { db } from "~/utils/db.server";
import { useTranslation } from "react-i18next";
import { i18n } from "~/utils/i18n.server";
import {
  Building,
  Device,
  Room,
  Task,
  School,
  Ticket,
} from ".prisma/client";
import { Language } from "remix-i18next";
import TasksBlade from "~/components/TaskBlade";

export { CatchBoundary, ErrorBoundary } from "~/utils";

type LoaderData = {
  tasks: Tasks;
  i18n: Record<string, Language>;
};

type Tasks = (Task & {
  devices: (Device & {
    Room:
      | (Room & {
          building:
            | (Building & {
                school: School & {
                  Ticket: Ticket[];
                };
                rooms: Room[];
              })
            | null;
        })
      | null;
  })[];
})[];
export let loader: LoaderFunction = async ({ request, params }) => {
  let tasks = await db.task.findMany({
    include: {
      member: true,
      devices: {
        include: {
          Room: {
            include: {
              building: {
                include: {
                  rooms: true,
                  school: {
                    include: {
                      Ticket: {
                        include:{
                          school: true
                        }
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  console.log(tasks);
  return json({
    tasks,
    i18n: await i18n.getTranslations(request, ["common"]),
  });
};

export default function Tasks() {
  let { tasks, i18n } = useLoaderData<LoaderData>();
  let { t } = useTranslation("common");
  return (
    <div className="w-full border-t-2 border-gray-100 bg-blue-500 h-full">
      <TasksBlade tasks={tasks} className="bg-white h-full w-full"/>
    </div>
  );
}
