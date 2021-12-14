import React from "react";
import { CellProps, Column } from "react-table";
import { TFunction } from "i18next";
import { Prisma } from ".prisma/client";
import { LinkCell } from "~/components/table/LinkCell";

const deviceWithTask = Prisma.validator<Prisma.DeviceArgs>()({
  include: {
    room: {
      include: {
        school: {
          include: {
            supervisor: true,
          },
        },
      },
    },
    task: {
      include: {
        order: true,
      },
    },
  },
});
export type DeviceWithTask = Prisma.DeviceGetPayload<typeof deviceWithTask>;

export type DeviceColumns = Array<
  Column<DeviceWithTask> & { inputType?: string }
>;

export const useColumns = ({ translationFn }: { translationFn: TFunction }) => {
  return React.useMemo<DeviceColumns>(
    () => [
      {
        Header: translationFn("serialNumber") as string,
        accessor: "serialNumber",
        inputType: "text",
      },
      {
        Header: translationFn("status") as string,
        accessor: "status",
        inputType: "DeviceStatus",
      },
      {
        Header: translationFn("room") as string,
        accessor: "roomId",
        Cell: ({ value, row: { original } }) =>
          (
            <LinkCell
              to={`../../schools${original.room?.schoolId}/rooms/${value}`}
              original={original}
            />
          ) ??
          value ??
          null,
      },
      {
        Header: translationFn("task") as string,
        accessor: "taskId",
        Cell: ({ value, row: { original } }) =>
          <LinkCell to={`../../tasks${value}`} original={original} /> ??
          value ??
          null,
      },
      {
        Header: translationFn("schoolName") as string,
        Cell: ({
          value,
          row: { original },
        }: React.PropsWithChildren<CellProps<DeviceWithTask>>) => {
          return original.room?.school?.name !== null ? (
            <LinkCell
              to={`../../schools/${original.room?.school?.id}`}
              original
              className="whitespace-nowrap text-xs text-emerald-500"
            >
              {original.room?.school?.name}
            </LinkCell>
          ) : (
            <span className="whitespace-nowrap text-xs text-emerald-500">
              {value}
            </span>
          );
        },
      },
      {
        Header: translationFn("assignTo") as string,
        Cell: ({
          value,
          row: { original },
        }: React.PropsWithChildren<CellProps<DeviceWithTask>>) => {
          return original.task?.memberId !== null ? (
            <LinkCell
              to={`../../members/${original.task?.memberId}`}
              original
              className="whitespace-nowrap text-xs text-emerald-500"
            >
              {original.task?.memberId}
            </LinkCell>
          ) : (
            <span className="whitespace-nowrap text-xs text-emerald-500">
              {value}
            </span>
          );
        },
      },
      {
        Header: translationFn("installationLocation") as string,
        Cell: ({
          value,
          row: { original },
        }: React.PropsWithChildren<CellProps<DeviceWithTask>>) =>
          original.task?.deviceLocation ?? value ?? null,
      },
    ],
    []
  );
};
