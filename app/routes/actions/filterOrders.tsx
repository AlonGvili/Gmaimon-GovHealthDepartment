import { User, Order } from ".prisma/client";
import { ActionFunction } from "remix";
import { db } from "~/utils/db.server";

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let orderQuery = Object.fromEntries(formData.entries()) as unknown as Order;
  console.log("formData", formData);
  console.log("orderQuery", orderQuery);
  try {
    let orders = await db.order.findMany({
      where: {
        status: {
          equals: orderQuery.status,
        },
      },
    });
    return orders;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
