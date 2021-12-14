import { useNotifications } from "@mantine/notifications";
import { t } from "i18next";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "react-icons/ri";
import { useFetcher } from 'remix';

let iconSwitcher = (status: string) => {
  switch (status) {
    case "error":
        return <RiErrorWarningFill className="bg-rose-400 text-white"/>
    case "success":
        return <RiCheckboxCircleFill className="bg-emerald-400 text-white" />
    default:
      return null
  }
}
export default function useNotify(updateHandle: ReturnType<typeof useFetcher>) {
  const notifications = useNotifications();
  const showNotify = ({ title = "title", content = "notification content", loading = false, loadingTitle = "", loadingContent = "", status = "" }) =>
    notifications.showNotification({
      className: "bg-emerald-400 p-2 w-full",
      color: !updateHandle?.data ? "red" : "green",
      title: loading ? loadingTitle : title,
      message: loading ? loadingContent : content,
      loading: updateHandle.state === "submitting",
      icon: iconSwitcher(status),
      style: {
        backgroundColor: "rgb(52 211 153 / var(--tw-bg-opacity))",
      },
    });
  return { showNotify };
}
