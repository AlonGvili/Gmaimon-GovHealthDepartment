import { Role } from "@prisma/client";
import React, { ChangeEvent } from "react";
import { Row, Column } from "react-table";
import { Link, LinkProps, useFetcher } from "remix";
import { useTranslation } from "react-i18next";
import { RiSave3Line } from "react-icons/ri";
import { classNames } from "../shared/utils";

type SaveCellProps<D extends Object> = {
  value?: string | number | readonly string[] | undefined;
  original: D;
  column?: Column<D>;
  disabled?: boolean;
  userRole?: Role;
} & LinkProps;
export function SaveCell<D>({
  value,
  original,
  column,
  disabled,
  userRole,
  ...props
}: SaveCellProps<D>) {
  let { t } = useTranslation();
  let fetcher = useFetcher();
  return userRole !== "ADMIN" ? null : (
    <fetcher.Form method="put" action="/api/members">
      <button
        disabled={disabled}
        type="submit"
        className={classNames(
          "whitespace-nowrap text-sm text-coolgray-500 font-medium",
          props.className
        )}
      >
        <RiSave3Line />
      </button>
    </fetcher.Form>
  );
}
