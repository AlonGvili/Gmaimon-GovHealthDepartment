import { DeviceStatus } from "@prisma/client";

export let deviceStatus = {
  "שבור": DeviceStatus.BROKEN,
  תקול: DeviceStatus.DEFECTS,
  במלאי: DeviceStatus.ININVENTORY,
  הותקן: DeviceStatus.INSTALLED,
};

export function normalizeDeviceStatus(type: string): string {
  //@ts-ignore
  return deviceStatus[type] as DeviceStatus;
}
