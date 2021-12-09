import React from "react";
import { TFunction, useTranslation } from "react-i18next";
import { Column, Row } from "react-table";
import { Prisma, Ticket } from ".prisma/client";
import Table from "~/components/Table";
import { Link } from "remix";
import { db } from "~/utils/db.server";
import StatusTag from "./statusTag";

const ticketWithTask = Prisma.validator<Prisma.TicketArgs>()({
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
export type TicketWithTask = Prisma.TicketGetPayload<typeof ticketWithTask>;

export type OrderColumns = Array<Column<TicketWithTask>>;

export let getTicketWithTask = async () =>
  await db.ticket.findMany({
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

export type TicketWithTaskReturnType = Prisma.PromiseReturnType<
  typeof getTicketWithTask
>;
interface UseOrderColumnsProps {
  translationFn: TFunction;
}

export function normalizeDate(date: string | null | undefined) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString();
}

export const useOrderColumns = ({ translationFn }: UseOrderColumnsProps) => {
  return React.useMemo<OrderColumns>(
    () => [
      {
        Header: translationFn("trackingNumber") as string,
        accessor: "trackingNumber",
      },
      {
        Header: translationFn("createdAt") as string,
        accessor: "createdAt",
        Cell: ({ value }: { value: string }) => normalizeDate(value),
      },
      {
        Header: translationFn("schoolName") as string,
        accessor: "schoolName",
        Cell: ({ value, row }: { value: string; row: Row<Ticket> }) => (
          <Link
            to={`../schools/${row.original.schoolId}`}
            className="whitespace-nowrap text-xs text-brand"
          >
            {value}
          </Link>
        ),
      },
      {
        Header: translationFn("status") as string,
        accessor: "status",
        Cell: ({ value }) => (
          <StatusTag translationFn={translationFn} value={value} />
        ),
      },
      {
        Header: translationFn("assignTo") as string,
        Cell: ({ row }: { value: string; row: Row<TicketWithTask> }) => (
          <Link
            to={`../users/${row.original.Task[0]?.member?.socialNumber}`}
            className="whitespace-nowrap text-xs text-brand"
          >
            {row.original.Task[0]?.member?.name}
          </Link>
        ),
      },
      {
        Header: translationFn("address") as string,
        Cell: ({ value, row }: { value: string; row: Row<TicketWithTask> }) => {
          if (row.original.school) {
            let { city, number, street } = row.original.school;
            return `${street} ${number}, ${city}`;
          }
          return null;
        },
      },
      {
        Header: translationFn("contactName") as string,
        accessor: "contactName",
      },
      {
        Header: translationFn("contactPhone") as string,
        accessor: "contactPhone",
      },
      {
        Header: translationFn("devices") as string,
        accessor: "devices",
      },
    ],
    []
  );
};
type OrderBladeProps = {
  orders: Array<TicketWithTask>;
} & React.HTMLAttributes<HTMLDivElement>;

export default function OrdersBlade({ orders, ...props }: OrderBladeProps) {
  let { t } = useTranslation("common");
  const columns = useOrderColumns({ translationFn: t });
  return (
    <div {...props}>
      <Table
        translationFn={t}
        columns={columns}
        data={orders}
        rowProps={(row) => ({
          ...row,
          className: "hover:bg-gray-100",
        })}
        columnProps={(column) => ({
          ...column,
          className:
            "text-gray-800 text-justify text-xs py-2 px-6 py-3 font-medium",
        })}
      />
    </div>
  );
}
