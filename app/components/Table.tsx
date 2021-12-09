//@ts-nocheck
import {
  useTable,
  TableOptions,
  useSortBy,
  Column,
  Row,
  Cell,
  useRowSelect,
  TableRowProps,
  TableCellProps,
  TableHeaderProps,
  TableBodyProps,
  TableCommonProps,
} from "react-table";
import { TFunction } from "react-i18next";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { TicketWithTask } from "./OrderBlade";
import React from "react";
import { useFetcher } from "remix";

const IndeterminateCheckbox = React.forwardRef<TicketWithTask>(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <input
        {...rest}
        type="checkbox"
        ref={resolvedRef}
        className="rounded text-brand border border-coolGray-300 focus:outline-none focus:ring-0"
      />
    );
  }
);

export interface RemixTableProps<D> {
  translationFn?: TFunction<"common", undefined>;
  columns: Column<D & { hidden: Boolean }>[];
  data: D[];
  options?: TableOptions<D>;
  rowProps?: (row: Row<D>) => Partial<TableRowProps>;
  bodyProps?: (body: TableCommonProps<D>) => Partial<TableBodyProps>;
  cellProps?: (cell: Cell<D>) => Partial<TableCellProps>;
  headerProps?: (column: Column<D>) => Partial<TableHeaderProps>;
  columnProps?: (column: Column<D>) => any;
  dir?: "ltr" | "rtl";
}

export default function Table<D>({
  columns,
  data,
  rowProps = (row: Row<D>) => ({ ...row }),
  bodyProps = (body: TableBodyProps<D>) => ({ ...body }),
  cellProps = (cell: Cell<D>) => ({ ...cell }),
  headerProps = (column: Column<D>) => ({ ...column }),
  columnProps = (column: Column<D>) => ({ ...column }),
  dir,
  translationFn,
  ...props
}: RemixTableProps<D>) {
  let fetcher = useFetcher();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["מבצע"],
      },
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          disableResizing: true,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  return (
    <>
      <div className="w-full my-4  p-4 flex justify-between">
        <button className="bg-brand hover:bg-green-900 text-white text-sm font-medium py-2 px-2 rounded-sm">
          {translationFn("orders.new")}
        </button>
        <div className="grid gap-2 grid-flow-col">
          <button className="bg-white text-gray-700 text-sm font-medium py-2 px-2 rounded-sm">
            {translationFn("assign")}
          </button>
          <button
            onClick={() =>
              fetcher.submit(
                { ...selectedFlatRows.map(ticket => ticket.original.uid) },
                { method: "delete", action: "/api/orders", replace: true }
              )
            }
            className="bg-white text-gray-700 text-sm font-medium py-2 px-2 rounded-sm"
          >
            {translationFn("remove")}
          </button>
        </div>
      </div>
      <table
        {...props}
        {...getTableProps()}
        className="table-auto w-full bg-white"
      >
        <thead dir={dir} className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  scope="col"
                  {...column.getHeaderProps([
                    headerProps(column),
                    columnProps(column),
                    column.getSortByToggleProps(),
                  ])}
                >
                  <div className="flex w-full justify-between items-center">
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <HiChevronDown />
                        ) : (
                          <HiChevronUp />
                        )
                      ) : null}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps([bodyProps()])}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps([rowProps(row)])}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps([
                        columnProps(cell.column),
                        cellProps(cell),
                      ])}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
