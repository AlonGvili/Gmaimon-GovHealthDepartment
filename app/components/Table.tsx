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
  usePagination,
} from "react-table";
import { TFunction } from "react-i18next";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { TicketWithTask } from "./OrderBlade";
import React from "react";
import { useFetcher } from "remix";
import { useDrawer } from "./drawer";
import { Row } from "react-table";
import { usePaginationFetcher } from "~/utils";
import Pagination from "./table/pagination";

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

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  update, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    update(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className="text-xs text-coolGray-500 border border-none focus:border-coolGray-200 rounded p-1"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

export interface RemixTableProps<D> {
  translationFn?: TFunction<"common", undefined>;
  data: D[];
  columns: Column<D>[];
  options?: TableOptions<D>;
  rowProps?: (row: Row<D>) => Partial<TableRowProps>;
  bodyProps?: (body: TableCommonProps<D>) => Partial<TableBodyProps>;
  cellProps?: (cell: Cell<D>) => Partial<TableCellProps>;
  headerProps?: (column: Column<D>) => Partial<TableHeaderProps>;
  columnProps?: (column: Column<D>) => any;
  dir?: "ltr" | "rtl";
  setSelectedRows?: (rows: Row<D>[]) => void;
  skipPageResetRef?: React.MutableRefObject<boolean>;
  fetchData?: (page: number, pageSize: number) => void;
  pageCount?: number;
}

export default function Table<D>({
  data = [],
  columns,
  rowProps = (row: Row<D>) => ({ ...row }),
  bodyProps = (body: TableBodyProps<D>) => ({ ...body }),
  cellProps = (cell: Cell<D>) => ({ ...cell }),
  headerProps = (column: Column<D>) => ({ ...column }),
  columnProps = (column: Column<D>) => ({ ...column }),
  setSelectedRows = (values: Row[]) => {},
  skipPageResetRef,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  ...props
}: RemixTableProps<D>): JSX.Element {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    selectedFlatRows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        hiddenColumns: ["מבצע"],
        pageIndex: 0,
      },
      autoResetPage: !skipPageResetRef,
      manualPagination: true,
      pageCount: controlledPageCount,
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
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row: { getToggleRowSelectedProps } }) => (
            <div>
              <IndeterminateCheckbox {...getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  React.useEffect(() => {
    setSelectedRows(selectedFlatRows);
  }, [selectedFlatRows]);

  return (
    <>
      <table
        {...props}
        {...getTableProps()}
        className="table-auto w-full bg-white"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  scope="col"
                  {...column.getHeaderProps([
                    headerProps(),
                    columnProps(),
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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps([rowProps()])}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps([columnProps()])}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {loading ? (
          // Use our custom loading state to show a loading indicator
          <td colSpan="10000">Loading...</td>
        ) : (
          <td colSpan="10000">
            Showing {page.length} of ~{controlledPageCount * pageSize} results
          </td>
        )}
      </table>
      <Pagination
        previousPage={previousPage}
        setPageSize={setPageSize}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        pageSize={10}
        pageCount={pageCount}
        pageOptions={pageOptions}
        page={page}
        pageIndex={pageIndex}
      />
    </>
  );
}
