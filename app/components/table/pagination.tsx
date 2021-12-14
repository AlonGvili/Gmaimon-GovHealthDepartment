import { usePagination } from "@mantine/hooks";
import React from "react"
export default function Pagination(
  {total, initialPage, page, onChange}: Parameters<typeof usePagination>[0]
) {
  const pagination = usePagination({ total, initialPage, page });

  return (
    <div className="flex max-w-md">
      {pagination.first}
      {pagination.range}
      <button className="p-2 border" onClick={() => pagination.next()}>{`<`}</button>
      <button className="p-2 border" onClick={() => pagination.previous()}>{'>'}</button>
      <button className="p-2 border" onClick={onChange}>{'+'}</button>
    </div>
  )
  // pagination.range; // -> [1, 2, 3, 4, 5, 'dots', 10];

  // pagination.setPage(5);
  // pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];

  // pagination.next();
  // pagination.range; // -> [1, 'dots', 5, 6, 7, 'dots', 10];

  // pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];

  // pagination.last();
  // pagination.range; // -> [1, 'dots', 6, 7, 8, 9, 10];

  // pagination.first();
  // pagination.range; // -> [1, 2, 3, 4, 5, 'dots', 10];
}
