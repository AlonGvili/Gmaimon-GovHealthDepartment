import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import {
  CellProps,
  Column,
  defaultColumn,
  HeaderGroup,
  HeaderProps,
  Row,
  usePagination,
  useRowSelect,
  UseRowSelectHooks,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  useSortBy,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  useTable,
  UseTableHeaderGroupProps,
} from "react-table";

export default function Table({columns, data,  ...props}: Parameters<typeof useTable>[0]) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        initialState: {
          hiddenColumns: ["מבצע"],
          pageIndex: 0,
        },
        autoResetPage: false,
        manualPagination: true,
        pageCount: 0,
      },
      useSortBy,
      usePagination,
      useRowSelect,
      (hooks) => {
        hooks.allColumns.push((columns) => [
          {
            id: "selection",
            minWidth: 35,
            width: 35,
            maxWidth: 35,
            Header: ({
              getToggleAllRowsSelectedProps,
            }: UseRowSelectHooks<HeaderProps<{}>>) => (
              <div>
                <RowCheckbox {...row.getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row: { getToggleRowSelectedProps } }) => (
              <div>
                <RowCheckbox {...getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    );
  return (
    <table
      {...props}
      {...getTableProps()}
      className="table-auto w-full bg-white"
    >
      <thead className="bg-gray-50">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: HeaderGroup<{}>) => (
              <th
                scope="col"
                {...column.getHeaderProps([
                  {
                    className:
                      "text-gray-800 text-justify text-xs py-2 px-6 py-3 font-medium",
                  },
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
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps({
                className: "hover:bg-gray-100",
              })}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps({
                      className:
                        "text-gray-800 text-justify text-xs py-2 px-6 py-3 font-medium",
                    })}
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
  );
}
