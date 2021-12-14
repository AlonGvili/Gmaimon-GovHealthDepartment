import { Member, Order } from "@prisma/client";
import { db } from "~/utils/db.server";

/**
 * @route   DELETE api/members/:uid
 * @route   DELETE api/members?uid=<order uid>
 * @route   DELETE api/members?uid=[<order uid>,<order uid>,...]
 * @desc    Delete many or one order, by providing the order uid
 * @returns Member or Member[]  The deleted order or an array of deleted members
 */
export async function remove(mid: string | string[], deletedBy: Member) {
  if (Array.isArray(mid)) {
    let deletedMembers = await db.member.updateMany({
      where: {
        socialNumber: { in: mid },
      },
      data: { deleted: true, deletedAt: new Date(), deleterId: deletedBy.id },
    });
    return deletedMembers;
  } else {
    let deletedmember = await db.member.update({
      where: { socialNumber: mid },
      data: {
        deleterId: deletedBy.id,
        deleted: true,
        deletedAt: new Date(),
      },
    });
    return deletedmember;
  }
}
