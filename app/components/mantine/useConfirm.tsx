import { Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useTranslation } from "react-i18next";

export default function useConfirm(confirm: () => void | undefined) {
  const modals = useModals();
  const { t } = useTranslation("common");
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: t("delete.members.title"),
      children: (
        <Text dir="rtl" size="sm">
          {t(`delete.members.content`)}
        </Text>
      ),
      labels: { confirm: t("delete"), cancel: t("cancel") },
      confirmProps: { className: "bg-rose-600 text-rose-200 hover:bg-rose-700 active:bg-rose-500" },
      onCancel: () => console.log("Cancel"),
      onConfirm: confirm,
    });
  return { open: openDeleteModal };
}
