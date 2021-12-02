import { AuthorizationError } from "remix-auth";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { db } from "~/utils/db.server";
import { redirect } from "remix";

export async function login(email: string, password: string): Promise<User | undefined> {
  try {
    let user = await db.user.findUnique({
      where: { email },
    });
    if (user) {
      let isCorrectPassword = await bcrypt.compare(
        password,
        user?.passwordHash
      );
      if (!isCorrectPassword)
        throw redirect("/login", {
          status: 401,
          statusText: "Incorrect password",
        });
      return user;
    }
  } catch (error) {
    throw error;
  }
}
