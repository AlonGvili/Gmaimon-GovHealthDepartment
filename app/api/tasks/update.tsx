import { Task, TaskStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { db } from "~/utils/db.server";
import { normalizeTaskStatus } from "./utils";

export async function update(task: Task | Task[]) {
  try {
    if (Array.isArray(task)) {
      let updatedTasks = await db.task.updateMany({
        where: {
          id: {
            in: task.map((t) => t.id),
          },
        },
        data: {
          ...task.map((t) => ({
            ...t,
            status: normalizeTaskStatus(t.status) as TaskStatus,
          })),
        },
      });
      return updatedTasks;
    } else {
      let updatedTask = await db.task.update({
        where: {
          id: task.id,
        },
        data: {
          ...task,
          status: normalizeTaskStatus(task.status) as TaskStatus,
        },
      });
      return updatedTask;
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("משימה לא נמצאה במערכת");
      }
      throw new Error(e.message);
    }
    console.log(e);
    throw new Error(`${e}`);
  }
}
