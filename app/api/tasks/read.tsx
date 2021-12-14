import { db } from "~/utils/db.server";
import { Prisma } from "@prisma/client";

export let findMany = async () =>
  await Promise.all([
    { count: await db.task.count() },
    {
      data: await db.task.findMany({
        include: {
          order: true,
          devices: {
            include: {
              room: {
                include: {
                  school: true,
                },
              },
            },
          },
          member: true,
          deleter: {
            select: {
              deleter: {
                select: {
                  name: true,
                  phone: true,
                },
              },
            },
          },
        },
      }),
    },
  ]);

export let findUnique = async (props: Prisma.TaskFindUniqueArgs) =>
  await Promise.all([
    {
      count: await db.task.count({
        where: {
          ...props.where,
        },
      }),
    },
    {
      data: await db.task.findUnique({
        ...props,
        include: {
          order: true,
          devices: {
            include: {
              room: {
                include: {
                  school: true,
                },
              },
            },
          },
          member: true,
          deleter: {
            select: {
              deleter: {
                select: {
                  name: true,
                  phone: true,
                },
              },
            },
          },
        },
      }),
    },
  ]);

export type TasksReturnType = Prisma.PromiseReturnType<typeof findMany>;
export type TaskReturnType = Prisma.PromiseReturnType<typeof findUnique>;
