import Table from "~/components/Table";
import React from "react";
import { LoaderFunction, useActionData, useLoaderData, json, Link, useMatches } from 'remix';
import { db } from "~/utils/db.server";
import { useTranslation, TFunction } from 'react-i18next';
import { i18n } from "../../../utils/i18n.server";
import { Role, Member } from "@prisma/client";
import { Task, Team } from ".prisma/client";
import { Language } from "remix-i18next";
import TasksBlade from "~/components/TaskBlade";
import UserBlade from "~/components/UserBlade";
import TeamBlade from "~/components/TeamBlade";

export { CatchBoundary, ErrorBoundary } from "~/utils";

type LoaderData = {
  user: Member & {
    tasks: Task[];
    team: (Team & {
      members: (Member & {
        tasks: Task[];
      })[];
    })[];
  };
  i18n: Record<string, Language>;
};

export let loader: LoaderFunction = async ({ request, params }) => {
  let user = await db.member.findFirst({
    where: {
      socialNumber: params.socialNumber,
    },
    include: {
      team: {
        include: {
          members: {
            where:{
              socialNumber: {
                not: params.socialNumber
              }
            }
          },
        },
      },
      tasks: {
        include: {
          devices: {
            include: {
              Room: {
                include: {
                  building: true,
                },
              },
            },
          },
          order: {
            include: {
              school: true,
            },
          },
        },
      },
    },
  });
  console.log(user);
  return json({
    user,
    i18n: await i18n.getTranslations(request, ["common"]),
  });
};

export let handle = {
  breadcrumb: ({match}:{match: ReturnType<typeof useMatches>[0]}) => <Link to={match?.pathname}>{match.params.socialNumber}</Link>,
};

export default function User() {
  let { user, i18n } = useLoaderData<LoaderData>();
  let { t } = useTranslation("common");

  function UserRole({ value }: { value: Role }) {
    return (
      <span className="whitespace-nowrap text-xm font-medium">
        {t(`${value}`)}
      </span>
    );
  }

  return (
    <div className="w-full grid grid-cols-6 border-t-2 border-gray-100 bg-white ">
      {/* <div className="bg-white col-span-1">
        <UserBlade user={user} />
      </div> */}
      <div className="col-span-5">
        <div className="w-full flex justify-end items-center border-b-2 border-gray-100 bg-white h-12 px-12">
          <nav className="grid grid-flow-col-dense gap-2 w-full items-stretch justify-start">
            <button className="p-2 text-sm text-blue-500 hover:text-white hover:bg-blue-600 active:bg-blue-700 outline-none focus:outline-none">
              {t("remove")}
            </button>
            <button className="p-2 text-sm text-blue-500 hover:text-white hover:bg-blue-600 active:bg-blue-700 outline-none focus:outline-none">
              {t("update")}
            </button>
          </nav>
        </div>
        {/* <h1 className="text-lg text-gray-800 font-bold  pr-6 mt-12 mb-4">
          {t("team")}
        </h1> */}
        {/* <TeamBlade className="bg-white pt-4 mb-24" team={user.team?.members || []} /> */}
        <h1 className="text-lg text-gray-800 font-bold pr-6 mb-4">
          {t("tasks")}
        </h1>
        <TasksBlade
          tasks={user.tasks}
          className="bg-white h-full w-full"
        />
      </div>
    </div>
  );
}
