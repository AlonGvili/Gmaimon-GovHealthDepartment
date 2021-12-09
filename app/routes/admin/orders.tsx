import { LoaderFunction, useLoaderData, useFetcher } from "remix";
import { db } from "~/utils/db.server";
import { Ticket } from ".prisma/client";
import OrdersBlade from "~/components/OrderBlade";
import { TicketWithTaskReturnType } from "../../components/OrderBlade";
import { Form } from "~/components/mantine/mantineForm";
import { Modal, ModalBase } from "~/components/modal";
import { Drawer, DrawerBase } from "~/components/drawer";

export { CatchBoundary, ErrorBoundary } from "~/utils";

export let loader: LoaderFunction = async ({
  request,
}): Promise<TicketWithTaskReturnType> => {
  let orders = await db.ticket.findMany({
    where: { deleted: false },
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
  let fetcher = useFetcher();
  return (
    <>
      <Drawer>
      <Modal>
        <DrawerBase>
          <Form<Ticket> {...fetcher} className="max-w-sm" />
        </DrawerBase>
        <ModalBase>
          <Form<Ticket> {...fetcher} className="max-w-sm" />
        </ModalBase>
        <OrdersBlade orders={orders} className="max-h-full w-full" />
      </Modal>
      </Drawer>
    </>
  );
}
