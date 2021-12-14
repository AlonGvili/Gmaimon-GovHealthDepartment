import { OrderStatus } from "@prisma/client";

export let orderStatus = {
  "יצא למשלוח": OrderStatus.SHIPPED,
  הושלמה: OrderStatus.COMPLETED,
  נפתחה: OrderStatus.OPEN,
  בוטלה: OrderStatus.CANCELLED,
  מטופלת: OrderStatus.PROCESSING,
  אושרה: OrderStatus.APPROVED,
  מתעכבת: OrderStatus.DELAYED,
};

export function normalizeorderStatus(type: string): string {
  //@ts-ignore
  return orderStatus[type] as orderStatus;
}
