import { Task, TaskStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { db } from "~/utils/db.server";
import { normalizeTaskStatus } from "./utils";

export async function create(task: Task | Task[]) {
  try {
    if (Array.isArray(task)) {
      let tasks = await db.task.createMany({
        skipDuplicates: true,
        data: task.map((t) => ({
          ...t,
          status: normalizeTaskStatus(t.status) as TaskStatus,
        })),
      });
      return tasks;
    } else {
      let newtask = await db.task.create({
        data: task,
      });
      return newtask;
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("קיים הזמנה עם מספר הזמנה זה");
      }
      throw new Error(e.message);
    }
    console.log(e);
    throw new Error(`${e}`);
  }
}
