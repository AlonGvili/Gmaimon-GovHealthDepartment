import React from "react";
import { TFunction, useTranslation } from "react-i18next";
import { Column, Row } from "react-table";
import { Task } from ".prisma/client";
import Table from "~/components/Table";
import { Link, useLocation } from "remix";
import dayjs from "dayjs";

interface UseTaskColumnsProps {
  translationFn: TFunction;
}

type TaskColumns = Array<Column<Task>>;

export function normalizeDate(date: string | null | undefined) {
  if (!date) return "";
  const d = dayjs(date).locale('he').format('DD/MM/YY');
  return d;
}

export const useTaskColumns = ({ translationFn }: UseTaskColumnsProps) => {
  let location = useLocation();
  return React.useMemo<TaskColumns>(
    () => [
      {
        Header: translationFn("installedBy") as string,
        accessor: !location.pathname.includes("/admin/users")
          ? "member.name"
          : "",
        Cell: ({ value, row }: { value: string; row: Row }) => (
          <Link
            to={`../users/${row.original?.member?.socialNumber}`}
            className="whitespace-nowrap text-xm text-blue-500 font-medium"
          >
            {value}
          </Link>
        ),
      },
      {
        Header: translationFn("startDate") as string,
        accessor: "startDate",
        Cell: ({ value }: { value: string }) => normalizeDate(value),
      },
      {
        Header: translationFn("endDate") as string,
        accessor: "endDate",
        Cell: ({ value }: { value: string }) => normalizeDate(value),
      },
      {
        Header: translationFn("status") as string,
        accessor: "status",
        Cell: ({ value }: { value: string }) => translationFn(value),
      },
      {
        Header: translationFn("note") as string,
        accessor: "note",
      },
      {
        Header: translationFn("room") as string,
        accessor: "devices.0.Room.name",
      },
      {
        Header: translationFn("building") as string,
        accessor: "devices.0.Room.building.name",
      },
      {
        Header: translationFn("school") as string,
        accessor: location.pathname.includes("/admin/users")
          ? "order.school.name"
          : "devices.0.Room.building.school.name",
        Cell: ({ value, row }: { value: string; row: Row }) => (
          <Link
            to={`/admin/schools/${
              !location.pathname.includes("/admin/users") ? row.original?.devices[0]?.Room.building?.school?.id : row.original?.order?.school?.id
            }`}
            className="whitespace-nowrap text-xm text-blue-500 font-medium"
          >
            {value}
          </Link>
        ),
      },
      {
        Header: translationFn("serial") as string,
        accessor: "devices.0.serialNumber",
        Cell: ({ value, row }: { value: string; row: Row }) => (
          <Link
            to={`../devices/${row.values["devices.0.serialNumber"]}`}
            className="whitespace-nowrap text-xm text-blue-500 font-medium"
          >
            {value}
          </Link>
        ),
      },
    ],
    []
  );
};
type TaskBladeProps = { tasks: Task[] } & React.HTMLAttributes<HTMLDivElement>;
export default function TasksBlade({ tasks, ...props }: TaskBladeProps) {
  let { t } = useTranslation("common");
  const columns = useTaskColumns({ translationFn: t });
  return (
      <Table
        columns={columns}
        data={tasks}
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
  );
}
