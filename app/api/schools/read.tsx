import { db } from "~/utils/db.server";
import { Prisma } from "@prisma/client";

export let findMany = async () =>
  await Promise.all([
    { count: await db.school.count() },
    {
      data: await db.school.findMany({
        include: {
          order: {
            include: {
              opener: true,
            },
          },
          room: {
            include: {
              devices: {
                include: {
                  task: true,
                },
              },
            },
          },
          supervisor: {
            select: {
              name: true,
              phone: true,
              openOrders: true,
              email: true,
            },
          },
        },
      }),
    },
  ]);

export let findUnique = async (props: Prisma.SchoolFindUniqueArgs) =>
  await Promise.all([
    {
      count: await db.school.count({
        where: {
          ...props.where,
        },
      }),
    },
    {
      data: await db.school.findUnique({
        ...props,
        include: {
          order: {
            include: {
              opener: true,
            },
          },
          room: {
            include: {
              devices: {
                include: {
                  task: true,
                },
              },
            },
          },
          supervisor: {
            select: {
              name: true,
              phone: true,
              openOrders: true,
              email: true,
            },
          },
        },
      }),
    },
  ]);

export let schoolStats = async () => {
  return await db.school.groupBy({
    where: { deleted: false },
    by: ["schoolType"],
    _count: {
      _all: true,
    },
    orderBy: {
      schoolType: "desc",
    },
  });
};
export type SchoolsReturnType = Prisma.PromiseReturnType<typeof findMany>;
export type SchoolReturnType = Prisma.PromiseReturnType<typeof findUnique>;
export type SchoolStatsReturnType = Prisma.PromiseReturnType<
  typeof schoolStats
>;
