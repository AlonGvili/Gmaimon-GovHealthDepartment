import React from "react";
import { CellProps, Row } from "react-table";
import { Link } from "remix";
import {
  OrderColumns,
  TicketWithTask as OrderWithTask,
} from "~/components/OrderBlade";
import { Order } from ".prisma/client";
import { TFunction } from "i18next";
import StatusSelector from "~/components/statusTag";
import { OrderStatus } from "@prisma/client";
import { EditableCell } from "~/components/table/EditableCell";

export const useColumns = ({
  translationFn,
}: {
  translationFn: TFunction;
}) => {
  return React.useMemo<OrderColumns>(
    () => [
      {
        Header: translationFn("trackingNumber") as string,
        accessor: "trackingNumber",
        inputType: "text",
      },
      {
        Header: translationFn("createdAt") as string,
        accessor: "createdAt",
        inputType: "date"
      },
      {
        Header: translationFn("delivaryDate") as string,
        accessor: "delivaryDate",
        inputType: "date",
      },
      {
        Header: translationFn("schoolName") as string,
        accessor: "schoolName",
        Cell: ({
          value,
          row: { original },
        }: React.PropsWithChildren<CellProps<OrderWithTask>>) => {
          return original.schoolId !== null ? (
            <Link
              to={`../schools/${original.schoolId}`}
              className="whitespace-nowrap text-xs text-emerald-500"
            >
              {value}
            </Link>
          ) : (
            <span className="whitespace-nowrap text-xs text-emerald-500">
              {value}
            </span>
          );
        },
        inputType: "text",
      },
      {
        Header: translationFn("status") as string,
        accessor: "status",
        inputType: "tag",
        // Cell: ({ value }: { value: OrderStatus }) => (
        //   <StatusSelector translationFn={translationFn} value={value} />
        // ),
      },
      {
        Header: translationFn("assignTo") as string,
        Cell: ({
          row: { original },
        }: React.PropsWithChildren<CellProps<OrderWithTask>>) => (
          <Link
            to={`../members/${original.Task[0]?.member?.socialNumber}`}
            className="whitespace-nowrap text-xs text-emerald-500"
          >
            {original.Task[0]?.member?.name}
          </Link>
        ),
        inputType: "text",
      },
      {
        Header: translationFn("address") as string,
        accessor: "address",
        inputType: "text",
        Cell: ({
          value,
          row: { original },
        }: React.PropsWithChildren<CellProps<OrderWithTask>>) => {
          if (original.school) {
            let { city, number, street } = original.school;
            return `${street} ${number}, ${city}`;
          } else {
            return value ?? null;
          }
        },
      },
      {
        Header: translationFn("contactName") as string,
        accessor: "contactName",
        Cell: EditableCell,
        inputType: "text",
      },
      {
        Header: translationFn("contactPhone") as string,
        accessor: "contactPhone",
        inputType: "text",
      },
      {
        Header: translationFn("devices") as string,
        accessor: "devices",
        inputType: "number",
      },
    ],
    []
  );
};
