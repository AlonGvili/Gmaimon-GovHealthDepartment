import { School, SchoolType } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { db } from "~/utils/db.server";
import { normalizeSchoolType } from "~/utils/validator";

export async function update(school: School | School[]) {
  try {
    if (Array.isArray(school)) {
      let updatedSchools = await db.school.updateMany({
        where: {
          id: {
            in: school.map((t) => t.id),
          },
        },
        data: {
          ...school.map((t) => ({
            ...t,
            schoolType: normalizeSchoolType(t.schoolType) as SchoolType,
          })),
        },
      });
      return updatedSchools;
    } else {
      let updatedSchool = await db.school.update({
        where: {
          id: school.id,
        },
        data: {
          ...school,
          schoolType: normalizeSchoolType(school.schoolType) as SchoolType,
        },
      });
      return updatedSchool;
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
