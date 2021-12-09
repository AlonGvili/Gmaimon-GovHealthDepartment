import { Form } from "remix";
import { useTranslation } from "react-i18next";

export default function ButtonLogout({
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  let { t } = useTranslation("common");
  return (
    <Form method="post" action="/logout" reloadDocument>
      <button type="submit" {...props}>{children || t("logout")}</button>
    </Form>
  );
}
