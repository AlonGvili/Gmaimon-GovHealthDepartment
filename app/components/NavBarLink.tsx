import { NavLink, NavLinkProps } from "remix";
import { TFunction, useTranslation } from 'react-i18next';
import { RiCalendarTodoFill } from "react-icons/ri";
import { FunctionComponentElement } from "react";
import React from 'react';
import { IconBaseProps, IconType } from "react-icons/lib";

type NavBarLinkProps = NavLinkProps & {
  label?: string
  icon: (props: IconBaseProps) => JSX.Element
};

export default function NavBarLink({
  icon,
  children,
  label,
  ...props
}: NavBarLinkProps) {
  let {t} = useTranslation("common");
  const Icon = icon
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        isActive ? "text-trueGray-800 font-bold text-sm" : "text-gray-500 "
      }
    >
      <div className="flex w-full items-center mb-2 p-2 hover:bg-gray-100 hover:rounded-md text-sm">
        <Icon className="h-5 w-5 ml-6 text-center" />
        {label ? <p className="text-current">{t(`${label}`)}</p> : children}
      </div>
    </NavLink>
  );
}
