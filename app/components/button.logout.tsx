import { Form } from "remix";
import { useTranslation } from "react-i18next";
import { IconBaseProps } from "react-icons/lib";

export default function ButtonLogout({
  children,
  icon,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  icon: (props: IconBaseProps) => JSX.Element;
}) {
  let { t } = useTranslation("common");
  const Icon = icon;
  return (
    <Form method="post" action="/logout" reloadDocument>
      <button type="submit" className="flex w-full items-center mb-2 p-2 hover:bg-gray-100 hover:rounded-md text-sm">
        <Icon className="h-5 w-5 ml-6 text-center" />
        <p className="text-current">{t("logout")}</p>
      </button>
    </Form>
  );
}
