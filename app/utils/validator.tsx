import { Prisma, SchoolType } from ".prisma/client";

let schoolType = {
  יסודי: SchoolType.YESODI,
};

function normalizeSchoolType(type: string): SchoolType {
  //@ts-ignore
  return schoolType[type] as SchoolType;
}

// Create a new function and pass the parameters onto the validator
const createSchool = (
  name: string,
  city: string,
  street: string,
  number: number,
  zip: number,
  principalNme: string,
  principalPhone: string,
  schoolType: SchoolType,
  workManagerName: string,
  workManagerPhone: string,
  wifiPassword: string,
  wifiName: string
) => {
  return Prisma.validator<Prisma.SchoolCreateInput>()({
    name,
    city,
    street,
    number,
    zip,
    principalNme,
    principalPhone,
    schoolType: normalizeSchoolType(schoolType),
    workManagerName,
    workManagerPhone,
    wifiPassword,
    wifiName,
  });
};
const updateSchool = (
  name: string,
  city: string,
  street: string,
  number: number,
  zip: number,
  principalNme: string,
  principalPhone: string,
  schoolType: SchoolType,
  workManagerName: string,
  workManagerPhone: string,
  wifiPassword: string,
  wifiName: string
) => {
  return Prisma.validator<Prisma.SchoolUpdateInput>()({
    name,
    city,
    street,
    number,
    zip,
    principalNme,
    principalPhone,
    schoolType,
    workManagerName,
    workManagerPhone,
    wifiPassword,
    wifiName,
  });
};

const findSpecificSchool = (name: string) => {
  return Prisma.validator<Prisma.SchoolWhereInput>()({
    name,
  });
};

export { findSpecificSchool, createSchool, updateSchool };
