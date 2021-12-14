import { Ticket } from "@prisma/client";
import { LoaderFunction, useLoaderData, json, Link } from "remix";
import { page as getOrders } from "~/apiorders/pagination";
import { ButtonProps } from "./shared/button";
import { classNames } from "./shared/utils";
import { HiChevronLeft } from "react-icons/hi";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? 0);
  const take = Number(url.searchParams.get("take") ?? 5);
  let skip = page * take;
  let [{count},{data}] = await getOrders(take, skip);
  return json({ data, page, take, count });
};

type PaginationProps = {
  page: number;
  take: number;
  data: Ticket[];
  count: number;
};
export default function (): JSX.Element {
  const { data, page, take, count } = useLoaderData<PaginationProps>();
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>schoolName</th>
            <th>devices</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.uid}>
              <td>{item.schoolName}</td>
              <td>{item.devices}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="navLinks">
        <Link to={`?page=${page - 1}&take${take}&skip=${(page - 1) * take}`}>
          <PageButton disabled={page < 1}>
            <span className="sr-only">Previous</span>
            <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
          </PageButton>
        </Link>
        <Link to={`?page=${page + 1}&take${take}&skip=${(page + 1) * take}`}>
          <PageButton disabled={(page * take) > count}>
            <span className="sr-only">Previous</span>
            <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
          </PageButton>
        </Link>
      </div>
    </div>
  );
}

export function PageButton({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
