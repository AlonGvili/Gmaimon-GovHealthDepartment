import { Member, Order } from "@prisma/client";
import { db } from "~/utils/db.server";

/**
 * @route   DELETE api/schools/:uid
 * @route   DELETE api/schools?uid=<order uid>
 * @route   DELETE api/schools?uid=[<order uid>,<order uid>,...]
 * @desc    Delete many or one order, by providing the order uid
 * @returns School or School[]  The deleted order or an array of deleted schools
 */
export async function remove(sid: number | number[], deletedBy: Member) {
  if (Array.isArray(sid)) {
    let logdeleted = await db.deletedSchool.createMany({
      skipDuplicates: true,
      data: sid.map((t) => ({
        schoolId: t,
        deleterId: deletedBy.socialNumber,
      })),
    });
    let deletedSchools = await db.school.updateMany({
      where: {
        id: {
          in: sid,
        },
      },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });
    return deletedSchools;
  } else {
    let deletedorder = await db.deletedSchool.create({
      data: {
        deleterId: deletedBy.socialNumber,
        schoolId: sid,
      },
    });
    let deletedSchool = await db.school.update({
      where: { id: sid },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });
    return deletedSchool;
  }
}
