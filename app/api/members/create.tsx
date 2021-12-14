import { Member } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { db } from "~/utils/db.server";

export async function create(member: Member | Member[]) {
  try {
    if (Array.isArray(member)) {
      let members = await db.member.createMany({
        skipDuplicates: true,
        data: member.map((t) => ({
          ...t,
        })),
      });
      return members;
    } else {
      let newmember = await db.member.create({
        data: member,
      });
      return newmember;
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("Member already exists");
      }
      throw new Error(e.message);
    }
    console.log(e);
    throw new Error(`${e}`);
  }
}
