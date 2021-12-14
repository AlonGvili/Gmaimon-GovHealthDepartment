import { Order, OrderStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import dayjs from "dayjs";
import { db } from "~/utils/db.server";
import { normalizeorderStatus } from "./utils";

export async function update(order: Order | Order[]) {
  try {
    if (Array.isArray(order)) {
      let updatedOrders = await db.order.updateMany({
        where: {
          uid: {
            in: order.map((o) => o.uid),
          },
        },
        data: {
          ...order.map((o) => ({
            ...o,
            delivaryDate: dayjs(o.delivaryDate).toDate(),
            devices: o.devices ? parseInt(o.devices as unknown as string) : o.devices,
            status: o.status ? normalizeorderStatus(o.status) as OrderStatus : o.status,
          })),
        },
      });
      return updatedOrders;
    } else {
      let newOrder = await db.order.update({
        where: {
          uid: order.uid,
        },
        data: {
          ...order,
          delivaryDate: dayjs(order.delivaryDate).toDate(),
          devices: order.devices ? parseInt(order.devices as unknown as string) : order.devices,
          status: order.status ? normalizeorderStatus(order.status) as OrderStatus : order.status,
        },
      });
      return newOrder;
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("קיים הזמנה עם מספר הזמנה זה");
      }
      throw new Error(e.message);
    }
    console.log(e);
    throw new Error(`${e}`);
  }
}
