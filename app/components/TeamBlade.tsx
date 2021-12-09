import React from "react";
import { TFunction, useTranslation } from "react-i18next";
import { Column, Row } from "react-table";
import { Member, Task, Team } from ".prisma/client";
import Table from "~/components/Table";
import { Link } from "remix";
import { Button, MultiSelect, Select } from "@mantine/core";

interface UseTeamColumnsProps {
  translationFn: TFunction;
}

type TeamColumns = Array<Column<Member>>;

const useTeamColumns = ({ translationFn }: UseTeamColumnsProps) =>
  React.useMemo<TeamColumns>(
    () => [
      {
        Header: translationFn("name") as string,
        accessor: "name",
        Cell: ({ value, row }: { value: string; row: Row }) => (
          <Link
            to={`../${row.original?.socialNumber}`}
            className="whitespace-nowrap text-xm text-blue-500 font-medium"
          >
            {value}
          </Link>
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
      },
      {
        Header: translationFn("socialNumber") as string,
        accessor: "socialNumber",
      },
    ],
    []
  );

type TeamBladeProps = {
  team: (Team & {
    members: (Member & {
      tasks: Task[];
    })[];
  })[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function TeamBlade({ team, ...props }: TeamBladeProps) {
  let { t } = useTranslation("common");
  const columns = useTeamColumns({ translationFn: t });
  return (
    <div {...props}>
      <Button color="dark">My awesome app</Button>

      <div className="max-w-sm">
      <MultiSelect
        data={[
          { value: "React", label: "React" },
          { value: "Angular", label: "Angular" },
          { value: "Svelte", label: "Svelte" },
          { value: "Vue", label: "Vue" },
        ]}
        />
        </div>
      <Table
        columns={columns}
        data={team}
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
