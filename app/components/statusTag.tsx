import { TicketStatus } from ".prisma/client";
import { TFunction } from "i18next";

let StatusTag = ({
  value,
  translationFn,
}: {
  value: TicketStatus;
  translationFn: TFunction;
}) => {
  switch (value) {
    case "OPEN":
      return (
        <div className="text-xs w-max rounded-sm text-coolGray-700 bg-coolGray-200 px-2 py-1">
          {translationFn(value)}
        </div>
      );
    case "SHIPPED":
      return (
        <div className="text-xs w-max rounded-sm text-cyan-700 bg-cyan-200 px-2 py-1">
          {translationFn(value)}
        </div>
      );
    case "COMPLETED":
      return (
        <div className="text-xs w-max rounded-sm text-sky-700 bg-sky-200 px-2 py-1">
          {translationFn(value)}
        </div>
      );
    case "CANCELLED":
      return (
        <div className="text-xs w-max rounded-sm text-rose-700 bg-rose-200 px-2 py-1">
          {translationFn(value)}
        </div>
      );
    case "PROCESSING":
      return (
        <div className="text-xs w-max rounded-sm text-yellow-700 bg-yellow-200 px-2 py-1">
          {translationFn(value)}
        </div>
      );
    case "APPROVED":
      return (
        <div className="text-xs w-max rounded-sm text-emerald-700 bg-emerald-200 px-2 py-1">
          {translationFn(value)}
        </div>
      );
  }
};

export default StatusTag;
