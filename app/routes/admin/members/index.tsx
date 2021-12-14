//@ts-nocheck
import Table from "~/components/Table";
import { LoaderFunction, useLoaderData, json, useFetcher } from "remix";
import { useColumns } from "./utils";
import { useTranslation } from "react-i18next";
import { findMany } from "~/api/members/read";
import { useCallback, useState } from "react";
import { Row } from "react-table";
import { Member } from ".prisma/client";
import { getUser } from "~/utils/session.server";
import Toolbar from "~/components/table/toolbar";

export { CatchBoundary, ErrorBoundary } from "~/utils";

export let loader: LoaderFunction = async ({ request }) => {
  let user = getUser(request);
  let res = await findMany();
  return json({ data: res[1]?.data });
};
export default function MembersIndex() {
  let { t } = useTranslation("common");
  let data = useLoaderData();
  let columns = useColumns({ translationFn: t });
  const [selectedRows, setSelectedRows] = useState<Row<Member>[]>([]);
  let removeHandle = useFetcher();
  let updateHandle = useFetcher();

  // Handle for delete record or records
  let onDelete = useCallback(() => {
    removeHandle.submit(
      { ...selectedRows.map((i) => i.original.socialNumber) },
      { action: "/api/members", method: "delete" }
    );
  }, [removeHandle, selectedRows]);

  // Handle for update cell data when the blur change
  let onUpdate = useCallback(
    (values) => {
      updateHandle.submit(
        { ...values },
        { action: "/api/members", method: "put" }
      );
    },
    [updateHandle]
  );
  return (
    <>
      <Toolbar removeHandle={onDelete} removeData={selectedRows} />
      <Table
        primaryKey="socialNumber"
        updateHandle={onUpdate}
        action={`/api/members`}
        data={data?.data}
        columns={columns}
        setSelectedRows={setSelectedRows}
        dir="rtl"
        rowProps={(row) => ({
          ...row,
          className: "hover:bg-gray-100",
        })}
        columnProps={(column) => ({
          ...column,
          className: "text-coolgray-800  text-xs py-2 px-6 py-3 font-medium",
        })}
      />
    </>
  );
}
