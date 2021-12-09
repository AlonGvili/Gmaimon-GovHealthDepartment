import ButtonLogout from "~/components/button.logout";
import { HiHome, HiLogout } from "react-icons/hi";
import { Link } from "remix";
import { useTranslation } from "react-i18next";
import User from "./user";
import { Attributes, ElementType, ReactHTMLElement } from "react";
import React from "react";

export default function AppBar({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { t } = useTranslation();
  return (
    <div
      className="bg-white w-full px-2 h-14 sm:px-0 flex justify-between items-center flex-row-reverse"
      {...props}
    >
      {children}
    </div>
  );
}
