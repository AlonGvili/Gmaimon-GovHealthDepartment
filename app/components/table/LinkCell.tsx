import React, { ChangeEvent } from "react";
import { Row, Column } from "react-table";
import { Link, LinkProps } from "remix";
import { classNames } from '../shared/utils';

type LinkCellProps<D extends Object> = {
  value?: string | number | readonly string[] | undefined;
  original: D;
  column?: Column<D>;
  disabled?: boolean;
} & LinkProps;
export function LinkCell<D>({
  value,
  original,
  column,
  disabled,
  ...props
}: LinkCellProps<D>) {
  return disabled ? (
    <p className={classNames(["whitespace-nowrap text-sm text-emerald-500 font-medium", props.className])}>
      {value}
    </p>
  ) : (
    <Link
      className={classNames(["whitespace-nowrap text-sm text-emerald-500 font-medium", props.className])}
      {...props}
    >
      {value}
    </Link>
  );
}
