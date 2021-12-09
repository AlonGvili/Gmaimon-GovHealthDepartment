import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Column, HeaderGroup, HeaderProps } from 'react-table';

interface HeaderGroup {
    render(arg0: string): import("react-table").Renderer<{}>;
    isSortedDesc: any;
    isSorted: boolean;
    sortDirection: 'asc' | 'desc';
};

export function ColumnSorter(column: HeaderGroup) {
  return (
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
  );
}
