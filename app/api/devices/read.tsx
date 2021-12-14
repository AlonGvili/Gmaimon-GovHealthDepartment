import { db } from "~/utils/db.server";
import { Prisma } from "@prisma/client";

export let findMany = async () =>
  await Promise.all([
    { count: await db.device.count() },
    {
      data: await db.device.findMany({
        orderBy: {
          id: "desc",
        },
        include: {
          room: {
            include: {
              school: {
                include: {
                  supervisor: true,
                },
              },
            },
          },
          task: {
            include: {
              order: true,
            },
          },
        },
      }),
    },
  ]);

export let findUnique = async (props: Prisma.DeviceFindUniqueArgs) =>
  await Promise.all([
    {
      count: await db.device.count({
        where: {
          ...props.where,
        },
      }),
    },
    {
      data: await db.device.findUnique({
        ...props,
        include: {
          room: {
            include: {
              school: {
                include: {
                  supervisor: true,
                },
              },
            },
          },
          task: {
            include: {
              order: true,
            },
          },
        },
      }),
    },
  ]);

export let deviceStats = async () => {
  return await db.device.groupBy({
    by: ["status"],
    _count: {
      _all: true,
    },
    orderBy: {
      status: "desc",
    },
  });
};
export type DevicesReturnType = Prisma.PromiseReturnType<typeof findMany>;
export type DeviceReturnType = Prisma.PromiseReturnType<typeof findUnique>;
export type StatsReturnType = Prisma.PromiseReturnType<typeof deviceStats>;
