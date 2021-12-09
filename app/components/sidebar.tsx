import { useTranslation } from "react-i18next";
import { NavLink } from "remix";
import { ReactHTMLElement } from "react";

export default function SideBar({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  let { t } = useTranslation("common");
  return (
    <div
      {...props}
    >
      {children}
    </div>
  );
}
