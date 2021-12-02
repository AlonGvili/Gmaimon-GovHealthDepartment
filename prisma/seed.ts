import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
let db = new PrismaClient();

async function main() {
  await db.user.upsert({
    where: {
      email: "along@gmaimon.com",
    },
    create: {
      name: "אלון גוילי",
      email: "along@gmaimon.com",
      idNumber: "066507369",
      phone: "0537177342",
      username: "gmadmin",
      passwordHash: await bcrypt.hash("A12345678!", 10),
      role: "ADMIN" as UserRole,
    },
    update: {
      name: "אלון גוילי",
      email: "along@gmaimon.com",
      idNumber: "066507369",
      phone: "0537177342",
      username: "gmadmin",
      passwordHash: await bcrypt.hash("A12345678!", 10),
      role: "ADMIN",
    },
  });

  await db.user.create({
    data: {
      name: "demo",
      email: "demo@gmaimon.com",
      idNumber: "000000000",
      phone: "0537177342",
      username: "demo",
      passwordHash: await bcrypt.hash("password", 10),
      role: "ADMIN",
    }
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
