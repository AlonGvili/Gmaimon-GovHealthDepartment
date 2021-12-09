import { Column, HeaderProps } from "react-table";

export default function Header<D>(props: HeaderProps<{}>) {
  return(
    <thead dir={dir} className="bg-gray-50">
      {props.headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th
              scope="col"
              {...column.getHeaderProps([column.getSortByToggleProps()])}
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
  );
}
