import Table from "~/components/Table";
import React from "react";
import {
  LoaderFunction,
  useActionData,
  useLoaderData,
  json,
  Link,
  useMatches,
} from "remix";
import { db } from "~/utils/db.server";
import { useTranslation, TFunction } from "react-i18next";
import { i18n } from "../../../utils/i18n.server";
import { Role, Member } from "@prisma/client";
import { Prisma, Task, Team } from ".prisma/client";
import { Language } from "remix-i18next";
import TasksBlade from "~/components/TaskBlade";
import UserBlade from "~/components/UserBlade";
import TeamBlade from "~/components/TeamBlade";
import { Params } from "react-router";
export { CatchBoundary, ErrorBoundary } from "~/utils";

async function getSpecificUser(params: Params) {
  let user = await db.member.findFirst({
    where: {
      socialNumber: params.socialNumber,
    },
    include: {
      tasks: {
        include: {
          devices: {
            include: {
              Room: true,
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
  return user;
}

const memberWithTasks = Prisma.validator<Prisma.MemberArgs>()({
  include: {
    tasks: {
      include: {
        devices: {
          include: {
            Room: true,
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

type MemberWithTask = Prisma.MemberGetPayload<typeof memberWithTasks>;
type GetUserReturnType = Prisma.PromiseReturnType<typeof getSpecificUser>;

export let loader: LoaderFunction = async ({ request, params }) => {
  let user = await getSpecificUser(params);
  return json({
    user,
  });
};

export default function User() {
  let data = useLoaderData<GetUserReturnType>();
  let { t } = useTranslation("common");

  return (
    <div className="w-full grid grid-cols-6 border-t-2 border-gray-100 bg-white ">
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
        <h1 className="text-lg text-gray-800 font-bold pr-6 mb-4">
          {t("tasks")}
        </h1>
        <TasksBlade tasks={data && data.tasks} className="bg-white h-full w-full" />
      </div>
    </div>
  );
}
