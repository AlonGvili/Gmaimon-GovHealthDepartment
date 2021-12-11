import { usePagination } from "react-table";

export default function Pagination(props: Parameters<typeof usePagination>[0]["useOptions"]) {
  return (
    <div className="navLinks">
      {console.log(userpage <= 0)}
      <PageButton disabled={userpage - 1 <= 0} to={`?page=${userpage - 1}`}>
        <span className="sr-only">Previous</span>
        <HiChevronRight className="h-5 w-5" aria-hidden="true" />
      </PageButton>
      <PageButton
        to={`?page=${userpage + 1}`}
        disabled={userpage * take > count}
      >
        <span className="sr-only">Next</span>
        <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
      </PageButton>
    </div>
  );
}
