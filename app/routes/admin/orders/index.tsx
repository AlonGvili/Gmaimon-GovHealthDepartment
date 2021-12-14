//@ts-nocheck
import Table from "~/components/Table";
import { LoaderFunction, useLoaderData, json, useFetcher } from "remix";
import { useColumns } from "./utils";
import { useTranslation } from "react-i18next";
import { findMany } from "~/api/orders/read";
import { useCallback, useState, Fragment } from 'react';
import { Row } from "react-table";
import { Order } from ".prisma/client";
import { getUser, isAdmin } from "~/utils/session.server";
import Toolbar from "~/components/table/toolbar";

export { CatchBoundary, ErrorBoundary } from "~/utils";

export let loader: LoaderFunction = async ({ request }) => {
  let user = getUser(request);
  let admin = await isAdmin(request);
  let res = await findMany();
  return json({ data: res[1]?.data, isAdmin: admin });
};

// A nested route for the Orders route
export default function OrderIndex() {
  // get a translation function
  let { t: translationFn } = useTranslation("common");
  // the raw data from the database, all the data disply transformation is been doing on the columns object.
  let data = useLoaderData();
  // use to get the selected rows from the deep table state object.
  const [selectedRows, setSelectedRows] = useState<Row<Order>[]>([]);
  // use this handle to remove an order from the table, it will not remove the record from the database, it will change the record deleted field to true.
  let removeHandle = useFetcher();
  // use this handle to get the new value of a cell and send it back to the endpoint
  let updateHandle = useFetcher();
  // table columns for the order table
  let columns = useColumns({ translationFn });
  // Handle for delete record or records
  let onDelete = useCallback(() => {
    removeHandle.submit(
      { ...selectedRows.map((i) => i.original.uid) },
      { action: "/api/orders", method: "delete" }
    );
  }, [removeHandle, selectedRows]);
  // Handle for update cell data when the blur change
  let onUpdate = useCallback(
    (values) => {
      updateHandle.submit(
        { ...values },
        { action: "/api/orders", method: "put" }
      );
    },
    [updateHandle]
  );
  return (
    <Fragment>
      {/* The table main toolbar actions, it have buttons for delete records, and filter the table */}
      <Toolbar removeHandle={onDelete} removeData={selectedRows} />
      {/* The main table component, this table was built using react-table library. */}
      {/* This lib don't give you a ui, instaed it give you hooks to build the table that you want. https://react-table.tanstack.com/ */}
      <Table
        // this is important primaryKey is used when any mutation is created, 
        // it is send back with the mutation data, the back endpoints uses it as forign key.
        // so for example: when we update or remove a record, the database know what record to remove or update base on the primaryKey
        primaryKey="uid" 
        // this handle is passes to the underline cells that need to update ther value after the user make changes
        updateHandle={onUpdate}
        // the raw data from the database we get it as output from the useLoaderData hook
        data={data?.data}
        // the columns object that render the table columns
        columns={columns}
        // using this handle we can get only the selected rows, the selected rows then used as input to the removeHandel function.
        setSelectedRows={setSelectedRows}
        // sets the table to be right-to-left (hebrew)
        dir="rtl"
        // add styles to every row
        rowProps={(row) => ({
          ...row,
          className: "hover:bg-gray-100",
        })}
        // add styles to every column
        columnProps={(column) => ({
          ...column,
          className: "text-coolgray-800  text-xs py-2 px-6 py-3 font-medium",
        })}
      />
    </Fragment>
  );
}
