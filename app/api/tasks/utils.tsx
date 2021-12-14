import { TaskStatus } from "@prisma/client";

export let taskStatus = {
  'אושרה ע"י מנהל מערכת': TaskStatus.APPROVEDBYADMIN,
  'אושרה ע"י ממונה קורונה': TaskStatus.APPROVEDBYSUPERVISOR,
  'אושרה ע"י ר.צוות': TaskStatus.APPROVEDBYTEAMLEADER,
  בוטלה: TaskStatus.CANCELED,
  שוייכה: TaskStatus.ASSIGNED,
  בוצעה: TaskStatus.DONE,
  בהמתנה: TaskStatus.PENDING,
  החלה: TaskStatus.STARTED,
  "המתנה לאישור": TaskStatus.WAITINGFORAPPROVAL,
};

export function normalizeTaskStatus(type: string): string {
  //@ts-ignore
  return taskStatus[type] as TaskStatus;
}
