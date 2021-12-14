import { School, SchoolType } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { db } from "~/utils/db.server";
import { normalizeSchoolType } from "~/utils/validator";

export async function create(school: School | School[]) {
  try {
    if (Array.isArray(school)) {
      let schools = await db.school.createMany({
        skipDuplicates: true,
        data: school.map((t) => ({
          ...t,
          name: t.name ?? "sss",
          schoolType: (normalizeSchoolType(t.schoolType) as SchoolType),
          number: parseInt(t.number as unknown as string),
          zip: parseInt(t.zip as unknown as string),
          createdAt: new Date(t.createdAt as unknown as string)
        })),
      });
      return schools;
    } else {
      let newschool = await db.school.create({
        data: {
          ...school,
          name: school.name ?? "456",
          schoolType: normalizeSchoolType(school.schoolType),
          number: parseInt(school.number as unknown as string),
          zip: parseInt(school.zip as unknown as string),
          createdAt: new Date(school.createdAt as unknown as string)
        },
      });
      return newschool;
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("School already exists");
      }
      throw new Error(e.message);
    }
    console.log(e);
    throw new Error(`${e}`);
  }
}
