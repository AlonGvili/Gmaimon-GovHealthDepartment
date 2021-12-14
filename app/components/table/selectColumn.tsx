//@ts-nocheck
import { ColumnInstance } from 'react-table';
import { RowCheckbox } from "./RowCheckbox";

export default function selectColumn() {
  return {
    id: "selection",
    editable: false,
    minWidth: 35,
    width: 35,
    maxWidth: 35,
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <div>
        <RowCheckbox {...getToggleAllRowsSelectedProps()} />
      </div>
    ),
    Cell: ({ row: { getToggleRowSelectedProps }}: ColumnInstance["Cell"]): JSX.Element => (
      <div>
        <RowCheckbox {...getToggleRowSelectedProps()} />
      </div>
    ),
  };
}
