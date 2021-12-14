import { Select } from "@mantine/core";
import { Form, useFetcher } from "remix";
import { useEffect } from "react";
import { Role } from "@prisma/client";
import { useTranslation } from "react-i18next";
import StatusTag from "~/components/statusTag";

export default function SelectRole({row, value, column}) {
  let { t } = useTranslation("common");
  return (
    <Select
      // itemComponent={({ value, label }) => (
      //   // <StatusTag translationFn={t} value={value} />
      // )}
      data={[
        {
          value: Role.MEMBER,
          label: t(Role.ADMIN),
        },
        {
          value: Role.SUPERVISOR,
          label: t(Role.SUPERVISOR),
        },
        {
          value: Role.ADMIN,
          label: t(Role.ADMIN),
        },
      ]}
    />
  );
}
