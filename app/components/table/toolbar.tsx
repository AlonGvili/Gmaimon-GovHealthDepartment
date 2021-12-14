import {
  RiUserAddLine,
  RiDeleteBin4Fill,
} from "react-icons/ri";
import { TableProps } from "react-table";
import { DrawerButton } from "../drawer";
import { useTranslation } from "react-i18next";
import useConfirm from "../mantine/useConfirm";
import { useFetcher } from "remix";

type ToolbarProps = {
  addHandle?: () => void;
  removeHandle?: () => void;
  updateHandle?: ReturnType<typeof useFetcher>;
  filterHandle?: () => void;
  removeData?: any;
} & TableProps;

export default function Toolbar({
  addHandle,
  removeHandle,
  updateHandle,
  filterHandle,
  removeData,
  ...props
}: ToolbarProps) {
  let { t } = useTranslation("common");
  let { open } = useConfirm(removeHandle);
  return (
    <div
      {...props}
      className="bg-white flex max-h-min w-full justify-between items-center py-3 px-6 border-b-coolGray-200 border-b-2"
    >
      <DrawerButton className="inline-flex items-center bg-emerald-400 px-4 py-2 rounded-md text-emerald-900 hover:bg-emerald-500 active:bg-emerald-300 border border-emerald-500 text-sm">
        <RiUserAddLine className="ml-2" />
        {t("add")}
      </DrawerButton>
      <div>
        <button
          disabled={!removeData?.length}
          onClick={() => open()}
          className="inline-flex items-center p-2 rounded-md text-rose-600 hover:text-rose-800 text-sm disabled:text-coolGray-200"
        >
          <RiDeleteBin4Fill className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
