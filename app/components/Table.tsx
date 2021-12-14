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
  useFlexLayout,
} from "react-table";
import { TFunction } from "react-i18next";
import {
  HiChevronDown,
  HiChevronUp,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { Row } from "react-table";
import { EditableCell } from "./table/EditableCell";
import { useEffect } from "react";
import { Button } from "./shared/button";
import selectColumn from "./table/selectColumn";

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
}

export default function Table<D>({
  data = [],
  columns,
  updateHandle,
  primaryKey,
  rowProps = (row: Row<D>) => ({ ...row }),
  bodyProps = (body: TableBodyProps<D>) => ({ ...body }),
  cellProps = (cell: Cell<D>) => ({ ...cell }),
  headerProps = (column: Column<D>) => ({ ...column }),
  columnProps = (column: Column<D>) => ({ ...column }),
  setSelectedRows = (values: Row[]) => {},
  ...props
}: RemixTableProps<D>): JSX.Element {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    selectedFlatRows,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateHandle,
      primaryKey,
      initialState: {
        pageIndex: 0,
      },
    },
    useSortBy,
    usePagination,
    useFlexLayout,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [selectColumn(), ...columns]);
    }
  );

  // side effect on the table, when selectedFletRows value is change (we select or deselect a row),
  // the setSelectedRows function invoked, this function comes from the parent component as prop for this component.
  useEffect(() => {
    console.log(selectedFlatRows);
    setSelectedRows(selectedFlatRows);
  }, [selectedFlatRows]);

  return (
    // Table wrapper container
    <div>
      {/* The main table component (<table>) */}
      <div
        {...props}
        {...getTableProps()}
        className="table-auto w-full bg-white h-full"
      >
        <div className="bg-gray-50">
          {/* Table headers from here down */}
          {headerGroups.map((headerGroup) => (
            // The row that holds table headers ( <tr /> )
            <div {...headerGroup.getHeaderGroupProps()}>
              {/* loop for all the columns */}
              {headerGroup.headers.map((column) => (
                // table columns
                <div
                  scope="col"
                  {...column.getHeaderProps([
                    headerProps(),
                    columnProps(),
                    column.getSortByToggleProps(),
                  ])}
                >
                  {/* table column header renderer */}
                  <div className="flex w-full justify-between items-center">
                    {column.render("Header")}
                    {/* render the sort column header with the correct icon for sorting  */}
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
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Table body section, from here down we render the rows */}
        <div {...getTableBodyProps(bodyProps())}>
          {page.map((row, i) => {
            // loop for rows
            prepareRow(row);
            return (
              // render the row
              <div {...row.getRowProps(rowProps())}>
                {row.cells.map((cell) => {
                  // loop for cells in a row
                  return (
                    // render the cell with data
                    <div {...cell.getCellProps(columnProps())}>
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {/* Table pagination ( next/previous ) */}
      <div dir="rtl" className="p-6 w-full flex justify-start">
        {canPreviousPage && (
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <span className="sr-only">Previous</span>
            <HiChevronRight aria-hidden="true" />
          </Button>
        )}
        {canNextPage && (
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            <span className="sr-only">Previous</span>
            <HiChevronLeft aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );
}
