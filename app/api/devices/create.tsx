import { Device, DeviceStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { db } from "~/utils/db.server";
import { normalizeDeviceStatus } from "./utils";

export async function create(device: Device): Promise<Device> {
  try {
    let newDevice = await db.device.create({
      data: {
        ...device,
        status: normalizeDeviceStatus(device.status) as DeviceStatus,
      },
    });
    return newDevice;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("קיים מכשיר עם מספר סידורי זה");
      }
      throw new Error(e.message);
    }
    console.log(e);
    throw new Error(`${e}`);
  }
}
