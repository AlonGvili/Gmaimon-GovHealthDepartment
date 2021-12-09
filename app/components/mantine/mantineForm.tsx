import {
  PaperProps,
  Paper,
  Group,
  TextInput,
  Anchor,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { RiGoogleLine, RiTwitterLine } from "react-icons/ri";
import { useFetcher } from "remix";
import { useTranslation } from "react-i18next";

type PropsGetter<Type> = {
  [Property in keyof Type]: Type[Property];
};

type FormProps<T> = {
  wrapperProps?: PaperProps<"div">;
  className: string;
} & ReturnType<typeof useFetcher>;

export function Form<T>({ wrapperProps, className, ...props }: FormProps<T>) {
  let { t } = useTranslation();

  return (
      <>
      <LoadingOverlay visible={props.state === "submitting"} />
      <props.Form method="post" action="/api/orders">
        <Paper {...wrapperProps}>
          <div className="flex flex-col justify-evenly max-w-md">
            <input
              type="text"
              className="text-xs text-coolGray-500 border border-coolGray-200 rounded mb-4"
              placeholder={t("schoolName")}
              name="schoolName"
            />
            <input
              type="text"
              className="text-xs text-coolGray-500 border border-coolGray-200 rounded mb-4"
              placeholder={t("address")}
              name="address"
            />
            <input
              type="text"
              className="text-xs text-coolGray-500 border border-coolGray-200 rounded mb-4"
              placeholder={t("trackingNumber")}
              name="trackingNumber"
            />
            <input
              type="text"
              className="text-xs text-coolGray-500 border border-coolGray-200 rounded mb-4"
              placeholder={t("delivaryDate")}
              name="delivaryDate"
            />
            <input
              type="number"
              placeholder={t("devices")}
              name="devices"
              className="text-xs text-coolGray-500 border border-coolGray-200 rounded mb-4"
            />
            <input
              type="text"
              className="text-xs text-coolGray-500 border border-coolGray-200 rounded mb-4"
              placeholder={t("contactName")}
              name="contactName"
            />
            <input
              type="tel"
              placeholder={t("contactPhone")}
              name="contactPhone"
              className="text-xs text-coolGray-500 border border-coolGray-200 rounded mb-4"
            />
            <input
              type="text"
              className="text-xs text-coolGray-500 border border-coolGray-200 rounded mb-4"
              placeholder={t("contactSignature")}
              name="contactSignature"
            />
          </div>

          <Button
            className="bg-brand hover:bg-brand-dark  text-white text-sm font-medium py-2 px-2 rounded"
            type="submit"
            disabled={props.state === "submitting"}
          >
            {t("add")}
          </Button>
        </Paper>
      </props.Form>
      </>
  );
}
