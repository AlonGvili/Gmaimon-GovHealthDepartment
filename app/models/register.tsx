import { User, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { db } from '~/utils/db.server';

type RegisterForm = { password: string } & Omit<
  User,
  "id" | "teams" | "role" | "tasks" | "passwordHash" | "teamId"
>;

export async function register({ password, ...data }: RegisterForm) {
  let passwordHash = await bcrypt.hash(password, 10);
  try {
    return await db.user.create({
      data: { ...data, passwordHash, role: "USER" },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        //@ts-ignore
        switch (error?.meta.target[0]) {
            case "email":
                return "כבר קיים חשבון עם דואר אלקטרוני זה"
            case "idNumber":
                return "חשבון עם תעודת זהות זו, כבר קיים"
            default:
                break;
        }
      }
    }
    throw error;
  }
}