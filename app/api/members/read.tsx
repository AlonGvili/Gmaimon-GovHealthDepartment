import { db } from "~/utils/db.server";
import { Prisma } from "@prisma/client";

export let findMany = async () =>
  await Promise.all([
    { count: await db.member.count() },
    {
      data: await db.member.findMany({
        where: {deleted: false},
        include: {
          tasks: {
            include: {
              order: {
                include: {
                  supervisor: {
                    include: {
                      School: true,
                      supervisorOrders: {
                        include: {
                          school: true,
                        },
                      },
                    },
                  },
                },
              },
              _count: true,
              devices: {
                include: {
                  room: {
                    include: {
                      school: true,
                    },
                  },
                },
              },
            },
          },
          School: true,
          openOrders: true,
          deletedOrder: true,
          supervisorOrders: true,
          deletedMember: true,
          _count: true,
        },
      }),
    },
  ]);

export let findUnique = async (props: Prisma.MemberFindUniqueArgs) =>
  await Promise.all([
    {
      count: await db.member.count({
        where: {
          ...props.where,
        },
      }),
    },
    {
      data: await db.member.findUnique({
        ...props,
        include: {
          tasks: {
            include: {
              order: {
                include: {
                  supervisor: {
                    include: {
                      School: true,
                      supervisorOrders: {
                        include: {
                          school: true,
                        },
                      },
                    },
                  },
                },
              },
              _count: true,
              devices: {
                include: {
                  room: {
                    include: {
                      school: true,
                    },
                  },
                },
              },
            },
          },
          School: true,
          openOrders: true,
          deletedOrder: true,
          supervisorOrders: true,
          deletedMember: true,
          _count: true,
        },
      }),
    },
  ]);

export type MembersReturnType = Prisma.PromiseReturnType<typeof findMany>;
export type MemberReturnType = Prisma.PromiseReturnType<typeof findUnique>;
