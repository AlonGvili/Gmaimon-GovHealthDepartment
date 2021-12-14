import React from "react";
import { TFunction, useTranslation } from "react-i18next";
import { Column, Row } from "react-table";
import { Prisma, Ticket } from ".prisma/client";
import { Link, useFetcher } from "remix";
import StatusTag from "./statusTag";
import TableWrapper from "~/components/table/toolbar";
import { TicketPaginationResult } from "~/apiorders/pagination";
import { usePaginationData } from "~/utils";
import Table from "./Table";

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

interface UseOrderColumnsProps {
  translationFn: TFunction;
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
        Header: translationFn("delivaryDate") as string,
        accessor: "delivaryDate",
        Cell: ({ value }: { value: string }) => normalizeDate(value),
      },
      {
        Header: translationFn("schoolName") as string,
        accessor: "schoolName",
        Cell: ({ value, row }: { value: string; row: Row<Ticket> }) => {
          return row.original.schoolId !== null ? (
            <Link
              to={`../schools/${row.original.schoolId}`}
              className="whitespace-nowrap text-xs text-sky-600"
            >
              {value}
            </Link>
          ) : (
            <span className="whitespace-nowrap text-xs text-sky-600">
              {value}
            </span>
          );
        },
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
        accessor: "address",
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
  // orders: Array<TicketWithTask>;
} & React.HTMLAttributes<HTMLDivElement>;

export default function OrdersBlade(props: OrderBladeProps) {
  let { t: translationFn } = useTranslation("common");
  let fetcher = useFetcher();
  let { data, fetchData, loading, pageCount, skipPageResetRef } =
    usePaginationData<TicketPaginationResult>();
  const [selectedRows, setSelectedRows] = React.useState<Row<any>[]>([]);
  const columns = useOrderColumns({ translationFn });

  return (
    <div {...props}>
      <div className="w-full my-4  py-4 flex justify-between">
        <button
          // onClick={() => onOpen()}
          className="bg-brand hover:bg-brand-dark  text-white text-sm font-medium py-2 px-2 rounded-sm"
        >
          {translationFn("orders.new")}
        </button>
        <div className="grid gap-2 grid-flow-col">
          <button className="bg-white text-gray-700 text-sm font-medium py-2 px-2 rounded-sm">
            {translationFn("assign")}
          </button>
          <button
            onClick={() =>
              fetcher.submit(
                //@ts-ignore
                { ...selectedRows.map((row) => row.original.uid) },
                { method: "delete", action: "/api/orders" }
              )
            }
            className="bg-white text-gray-700 text-sm font-medium py-2 px-2 rounded-sm"
          >
            {translationFn("remove")}
          </button>
        </div>
      </div>
      <Table
        translationFn={translationFn}
        setSelectedRows={setSelectedRows}
        columns={columns}
        data={data}
        skipPageResetRef={skipPageResetRef}
        userPageCount={pageCount}
        fetchData={fetchData}
        loading={loading}
        rowProps={(row) => ({
          ...row,
          className: "hover:bg-gray-100",
        })}
        columnProps={(column) => ({
          className:
            "text-gray-800 text-justify text-xs py-2 px-6 py-3 font-medium",
        })}
      />
    </div>
  );
}

// const columns = React.useMemo<OrderColumns>(
//   () => [
//     {
//       Header: translationFn("trackingNumber") as string,
//       accessor: "trackingNumber",
//     },
//     {
//       Header: translationFn("createdAt") as string,
//       accessor: "createdAt",
//       Cell: ({ value }: { value: string }) => normalizeDate(value),
//     },
//     {
//       Header: translationFn("delivaryDate") as string,
//       accessor: "delivaryDate",
//       Cell: ({ value }: { value: string }) => normalizeDate(value),
//     },
//     {
//       Header: translationFn("schoolName") as string,
//       accessor: "schoolName",
//       Cell: ({ value, row }: { value: string; row: Row<Ticket> }) => {
//         return row.original.schoolId !== null ? (
//           <Link
//             to={`../schools/${row.original.schoolId}`}
//             className="whitespace-nowrap text-xs text-sky-600"
//           >
//             {value}
//           </Link>
//         ) : (
//           <span className="whitespace-nowrap text-xs text-sky-600">
//             {value}
//           </span>
//         );
//       },
//     },
//     {
//       Header: translationFn("status") as string,
//       accessor: "status",
//       Cell: ({ value }) => (
//         <StatusTag translationFn={translationFn} value={value} />
//       ),
//     },
//     {
//       Header: translationFn("assignTo") as string,
//       Cell: ({ row }: { value: string; row: Row<TicketWithTask> }) => (
//         <Link
//           to={`../users/${row.original.Task[0]?.member?.socialNumber}`}
//           className="whitespace-nowrap text-xs text-brand"
//         >
//           {row.original.Task[0]?.member?.name}
//         </Link>
//       ),
//     },
//     {
//       Header: translationFn("address") as string,
//       accessor: "address",
//       Cell: ({ value, row }: { value: string; row: Row<TicketWithTask> }) => {
//         if (row.original.school) {
//           let { city, number, street } = row.original.school;
//           return `${street} ${number}, ${city}`;
//         }
//         return value;
//       },
//     },
//     {
//       Header: translationFn("contactName") as string,
//       accessor: "contactName",
//     },
//     {
//       Header: translationFn("contactPhone") as string,
//       accessor: "contactPhone",
//     },
//     {
//       Header: translationFn("devices") as string,
//       accessor: "devices",
//     },
//   ],
//   []
// );
