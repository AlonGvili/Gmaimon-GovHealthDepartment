import { Member, Order } from "@prisma/client";
import { db } from "~/utils/db.server";

/**
 * @route   DELETE api/orders/:uid
 * @route   DELETE api/orders?uid=<order uid>
 * @route   DELETE api/orders?uid=[<order uid>,<order uid>,...]
 * @desc    Delete many or one order, by providing the order uid
 * @returns Order or Order[]  The deleted order or an array of deleted orders
 */
export async function remove(uid: string | string[], deletedBy: Member) {
  if (Array.isArray(uid)) {
    let logdeleted = await db.deletedOrder.createMany({
      skipDuplicates: true,
      data: uid.map((uid) => ({
        deleterId: deletedBy.socialNumber,
        orderId: uid,
      })),
    });
    let deletedOrders = await db.order.updateMany({
      where: {
        uid: {
          in: uid,
        },
      },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });
    return deletedOrders;
  }
  let deletedorder = await db.deletedOrder.create({
    data: {
      deleterId: deletedBy.socialNumber,
      orderId: uid,
    },
  });
  let deletedOrder = await db.order.update({
    where: { uid },
    data: {
      deleted: true,
      deletedAt: new Date(),
    },
  });
  return deletedOrder;
}
