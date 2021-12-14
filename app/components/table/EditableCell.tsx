import React from "react";
import { CellProps } from "react-table";
import { useFetcher } from "remix";
import "dayjs/locale/he";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { OrderColumns } from "../OrderBlade";
import { DeviceColumns } from "../../routes/admin/devices/utils";
import StatusSelector from "~/components/statusTag";
import { TFunction, useTranslation } from "react-i18next";
import StatusTag from "~/components/statusTag";
import { InputWrapper, TextInput, NumberInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useCallback } from "react";
dayjs.extend(localizedFormat);

export function EditableCell({
  updateHandle,
  primaryKey,
  column: { id, inputType },
  value,
  row: { original },
}: React.PropsWithChildren<
  CellProps<OrderColumns | DeviceColumns> & {
    updateHandle: (value: any) => void;
    primaryKey: string;
    inputType: string;
  }
>) {
  let { t } = useTranslation("common");
  const update = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    let payload = {
      [primaryKey]: original[primaryKey as unknown as number],
      [id]: e.currentTarget.value,
    };
    if(original[id] === e.currentTarget.value) return e.currentTarget.value
    else updateHandle({ ...payload });
  }, []);

  switch (inputType) {
    case "text":
      return (
        <TextInput
          size="xs"
          placeholder={t(id)}
          name={id}
          defaultValue={t(value) as any}
          classNames={{
            input:
              "max-h-5 border-none hover:border hover:border-coolGray-400 focus:active:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 rounded-sm text-xs font-semibold text-coolGray-500 text-right",
          }}
          onBlur={(e) => update(e)}
          variant="unstyled"
        />
      );
    case "date":
      return (
        <DatePicker
          defaultValue={value && dayjs(`${value}`).toDate()}
          inputFormat="DD/MM/YY"
          locale="he"
          disabled={id === "createdAt"}
          allowFreeInput
          dir="rtl"
          firstDayOfWeek="sunday"
          size="xs"
          name={id}
          onBlur={(e) => {
            update(e)
          }}
          classNames={{
            input:
              "max-h-5 border-none hover:border hover:border-coolGray-400 focus:active:outline-none focus:ring-3 focus:ring-emerald-400 focus:ring-opacity-75 rounded-sm text-xs font-semibold text-coolGray-500 text-right",
          }}
        />
      );
    case "number":
      return <NumberInput size="xs" />;
    case "data":
    // return <Select />
    case "tag":
      return <StatusTag translationFn={t} value={value} />;
    case "link":
    // return <LinkCell />
    case "confirmation":
    // return <LinkCell />
    default:
      return value;
  }
}
