import { db } from "~/utils/db.server";
import { LoaderFunction } from "remix";
import { Prisma } from "@prisma/client";

export let page = async (params?: Prisma.OrderFindManyArgs) =>
  await Promise.all([
    { count: await db.order.count() },
    {
      data: await db.order.findMany({
        ...params,
        select: {
          deleter: {
            select: {
              deleterId: true,
              orderId: true,
            },
          },
          status: true,
          school: true,
          trackingNumber: true,
          createdAt: true,
          uid: true,
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

export let loader: LoaderFunction = async ({ request }) => {
  let searchParams = new URL(request.url).searchParams;
  const take = Number(searchParams.get("take") ?? 10);
  const skip = Number(searchParams.get("skip") ?? 0);
  let query = {
    take,
    skip,
  };
  try {
    let results = await page({ ...query });
    console.log(results);
    return results;
  } catch (error: any) {
    throw new Error(error);
  }
};

export type orderPaginationResult = Prisma.PromiseReturnType<typeof page>;
