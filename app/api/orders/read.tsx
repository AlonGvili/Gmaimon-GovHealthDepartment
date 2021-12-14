import { db } from "~/utils/db.server";
import { Prisma } from "@prisma/client";

export let findMany = async () =>
  await Promise.all([
    { count: await db.order.count() },
    {
      data: await db.order.findMany({
        where: {deleted: false},
        orderBy: {
          id: "desc"
        },
        select: {
          uid: true,
          deleted: true,
          status: true,
          school: true,
          trackingNumber: true,
          createdAt: true,
          opener: {
            select: {
              name: true,
            },
          },
          delivaryDate: true,
          devices: true,
          schoolName: true,
          address: true,
          contactName: true,
          contactPhone: true,
          supervisor: {
            select: {
              name: true,
            },
          },
          Task: {
            select: {
              member: {
                select: {
                  name: true,
                  socialNumber: true,
                },
              },
            },
          },
        },
      }),
    },
  ]);

export let findUnique = async (props: Prisma.OrderFindUniqueArgs) =>
  await Promise.all([
    {
      count: await db.order.count({
        where: {
          ...props.where,
        },
      }),
    },
    {
      data: await db.order.findUnique({
        ...props,
        select: {
          uid: true,
          deleted: true,
          deletedAt: true,
          schoolId: true,
          supervisorId: true,
          status: true,
          school: true,
          trackingNumber: true,
          createdAt: true,
          opener: {
            select: {
              name: true,
            },
          },
          delivaryDate: true,
          devices: true,
          schoolName: true,
          address: true,
          contactName: true,
          contactPhone: true,
          supervisor: {
            select: {
              name: true,
            },
          },
          Task: {
            select: {
              member: {
                select: {
                  name: true,
                  socialNumber: true,
                },
              },
            },
          },
        },
      }),
    },
  ]);

export let orderStats = async () => {
  return await db.order.groupBy({
    where: {deleted: false},
    by: ["status"],
    _count: {
      _all: true,
    },
    orderBy: {
      status: "desc",
    },
  });
};
export type OrdersReturnType = Prisma.PromiseReturnType<typeof findMany>;
export type OrderReturnType = Prisma.PromiseReturnType<typeof findUnique>;
export type StatsReturnType = Prisma.PromiseReturnType<typeof orderStats>;
