import { Member } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { db } from "~/utils/db.server";

export async function update(member: Member | Member[]) {
  try {
    if (Array.isArray(member)) {
      let updatedMembers = await db.member.updateMany({
        where: {
          id: {
            in: member.map((t) => t.id),
          },
        },
        data: {
          ...member.map((t) => ({
            ...t,
          })),
        },
      });
      return updatedMembers;
    } else {
      let updatedMember = await db.member.update({
        where: {
          socialNumber: member.socialNumber,
        },
        data: {
          ...member,
        },
      });
      return updatedMember;
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("Member not found");
      }
      throw new Error(e.message);
    }
    console.log(e);
    throw new Error(`${e}`);
  }
}
