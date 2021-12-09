import { LoaderFunction, useLoaderData, json, useFetcher } from "remix";
import { db } from "~/utils/db.server";
import { useTranslation } from "react-i18next";
import { i18n } from "~/utils/i18n.server";
import { School, Ticket } from ".prisma/client";
import { Language } from "remix-i18next";
import OrdersBlade from "~/components/OrderBlade";
import {
  TicketWithTask,
  TicketWithTaskReturnType,
} from "../../components/OrderBlade";
import { useRef } from "react";

export { CatchBoundary, ErrorBoundary } from "~/utils";

type LoaderData = {
  orders: TicketWithTask[];
};

export let loader: LoaderFunction = async ({
  request,
}): Promise<TicketWithTaskReturnType> => {
  let orders = await db.ticket.findMany({
    where:{deleted: false},
    include: {
      school: true,
      Task: {
        include: {
          member: {
            select: {
              name: true,
              socialNumber: true,
            },
          },
        },
      },
    },
  });
  return orders;
};

export default function Orders() {
  let orders = useLoaderData<TicketWithTaskReturnType>();
  let { t } = useTranslation();
  return (
    <div className="w-full border-t-2 border-gray-100 h-full">
      <OrdersBlade orders={orders} className="max-h-full min-h-[440] w-full" />
    </div>
  );
}
