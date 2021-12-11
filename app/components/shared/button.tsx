import {
  NavLink,
  useFetcher,
  useNavigate,
  useSearchParams,
  useSubmit,
  Form,
} from "remix";
import { classNames } from "~/utils";
import { To } from "history";
import { useEffect, useRef, useState } from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function PageSelect({
  skip,
  page,
  take
}: {
  take: number;
  skip: number;
  page: number;
}) {
  let submit = useSubmit();
  let [searchParams, setSearchParams] = useSearchParams();
  let [selectValue, setSelectValue] = useState(searchParams.get("take") || take);

  useEffect(() => {
    setSelectValue(searchParams.get("take")!);
  }, [searchParams]);

  return (
    <Form
      method="get"
      action={`?page=${page}&take=${Number(searchParams.get("take"))}&skip=${skip}`}
    >
      <span className="sr-only">Items Per Page</span>
      <select
        name="take"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={selectValue}
        onChange={(e) => {
          submit(e.currentTarget.form)
        }}
      >
        {[5, 10, 20].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </Form>
  );
}
export function PageButton({
  children,
  className = "",
  to,
  disabled,
  ...rest
}: ButtonProps & { to: To }) {
  return disabled ? (
    <div
      className={classNames(
        "relative inline-flex items-center px-2 py-2 border border-gray-100 bg-coolGray-100 text-sm font-medium text-gray-200 disabled:hover:cursor-not-allowed",
        className
      )}
    >
      {children}
    </div>
  ) : (
    <NavLink to={to}>
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
    </NavLink>
  );
}
