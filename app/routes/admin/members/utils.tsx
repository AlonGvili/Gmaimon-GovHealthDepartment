import { Member } from "@prisma/client";
import React from "react";
import { TFunction } from "react-i18next";
import { Column, Row } from "react-table";
import { Link } from "remix";
import { DeleteCell } from "~/components/table/deleteCell";
import { LinkCell } from "~/components/table/LinkCell";
import { SaveCell } from "~/components/table/SaveCell";

interface UseTeamColumnsProps {
  translationFn: TFunction;
}

type TeamColumns = Array<Column<Member>>;

const useColumns = ({ translationFn }: UseTeamColumnsProps) =>
  React.useMemo<TeamColumns>(
    () => [
      {
        Header: translationFn("name") as string,
        accessor: "name",
        Cell: ({ value, row: { original } }) => (
          <LinkCell
            className="font-semibold text-xs text-emerald-500"
            original={original}
            value={value}
            disabled={!original.socialNumber}
            to={`../${original.socialNumber}`}
          />
        ),
      },
      {
        Header: translationFn("email") as string,
        accessor: "email",
      },
      {
        Header: translationFn("phone") as string,
        accessor: "phone",
      },
      {
        Header: translationFn("role") as string,
        accessor: "role",
        Cell: ({ value }) => translationFn(value),
        minWidth: 50,
        maxWidth: 150,
      },
      {
        Header: translationFn("socialNumber") as string,
        accessor: "socialNumber",
        minWidth: 50,
        maxWidth: 150,
      },
    ],
    []
  );

export { useColumns };
