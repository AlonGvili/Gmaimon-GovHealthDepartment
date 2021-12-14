import { Order, OrderStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { db } from "~/utils/db.server";
import { normalizeorderStatus } from "./utils";

export async function create(order: Order): Promise<Order> {
    try {
      let newOrder = await db.order.create({
        data: {
          ...order,
          devices: parseInt(order.devices as unknown as string),
          createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
          delivaryDate: order.delivaryDate,
          status: normalizeorderStatus(order.status) as OrderStatus,
        },
      });
      return newOrder;
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