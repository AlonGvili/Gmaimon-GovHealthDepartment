import { Member, Order } from "@prisma/client";
import { db } from "~/utils/db.server";

/**
 * @route   DELETE api/tasks/:uid
 * @route   DELETE api/tasks?uid=<order uid>
 * @route   DELETE api/tasks?uid=[<order uid>,<order uid>,...]
 * @desc    Delete many or one order, by providing the order uid
 * @returns Task or Task[]  The deleted order or an array of deleted tasks
 */
export async function remove(tid: number | number[], deletedBy: Member) {
  if (Array.isArray(tid)) {
    let logdeleted = await db.deletedTask.createMany({
      skipDuplicates: true,
      data: tid.map((t) => ({
        taskId: t,
        deleterId: deletedBy.socialNumber,
      })),
    });
    let deletedTasks = await db.task.updateMany({
      where: {
        id: {
          in: tid,
        },
      },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });
    return deletedTasks;
  } else {
    let deletedorder = await db.deletedTask.create({
      data: {
        deleterId: deletedBy.socialNumber,
        taskId: tid,
      },
    });
    let deletedTask = await db.task.update({
      where: { id: tid },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });
    return deletedTask;
  }
}
