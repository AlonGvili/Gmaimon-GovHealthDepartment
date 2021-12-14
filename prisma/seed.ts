import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
let db = new PrismaClient();

async function main() {
  // Create a new demo users
  await db.member.upsert({
    where: {
      email: "along@gmaimon.com",
    },
    create: {
      name: "אלון גוילי",
      email: "along@gmaimon.com",
      socialNumber: "066507369",
      phone: "0537177342",
      username: "gmadmin",
      passwordHash: await bcrypt.hash("A12345678!", 10),
      role: "ADMIN"
    },
    update: {},
  });

  await db.member.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "דמו ממונה קורונה",
        email: "demo1@demo.com",
        socialNumber: "000000002",
        phone: "0521234567",
        username: "demo_supervisor",
        passwordHash: await bcrypt.hash("super123", 10),
        role: "SUPERVISOR",
      },
      {
        name: "דמו ראש צוות",
        email: "demo2@demo.com",
        socialNumber: "000000003",
        phone: "0521234567",
        username: "demo_teamleader",
        passwordHash: await bcrypt.hash("teamleader123", 10),
        role: "SUPERVISOR",
      },
      {
        name: "דמו משתמש רגיל",
        email: "demo@demo.com",
        socialNumber: "000000001",
        phone: "0531111111",
        username: "demo_user",
        passwordHash: await bcrypt.hash("user123", 10),
        role: "MEMBER",
      },
      {
        name: "3 דמו משתמש רגיל",
        email: "demoוuser3@demo.com",
        socialNumber: "000000006",
        phone: "0531111111",
        username: "demo_user3",
        passwordHash: await bcrypt.hash("user123", 10),
        role: "MEMBER",
      }
    ],
  });
  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
