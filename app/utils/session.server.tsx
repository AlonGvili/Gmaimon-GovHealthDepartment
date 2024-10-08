import { Prisma, Member } from "@prisma/client";
import bcrypt from "bcrypt";
import { createCookieSessionStorage, redirect } from "remix";
import { db } from "./db.server";

type LoginForm = {
  email: string;
  password: string;
};

type LoginResponse = {
  user?: Member;
  error?: string;
};

export function getUrlByUserRole({ socialNumber, role }: Member) {
  if (role === "ADMIN") {
    return "/admin";
  } else {
    return `/members/${socialNumber}`;
  }
}

export async function login({
  email,
  password,
}: LoginForm){
  let user = await db.member.findUnique({
    where: { email },
  });
  if (!user) return { error: "משתמש לא קיים, נא לבצע רישום למערכת" };
  let isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) return { error: "סיסמה שגויה" };
  if(user.role === "ADMIN"){
    let session = await storage.getSession()
    session.set("user-role", "admin")
    storage.commitSession(session)
  }
  return { user };
}

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

let storage = createCookieSessionStorage({
  cookie: {
    name: "meditav_auraair_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});
export const {commitSession, destroySession, getSession} = storage

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  let session = await getUserSession(request);
  let userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  let session = await getUserSession(request);
  let userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function isAuthenticated(request: Request) {
  let userId = await requireUserId(request);
  return Boolean(userId);
}

export async function isAdmin(request: Request) {
  let session = await storage.getSession(request.headers.get("Cookie"));
  let userRole = session.get("user-role")
  return userRole === "admin"
}

export async function getUser(request: Request) {
  let userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }
  try {
    let user = await db.member.findUnique({
      where: { email: userId },
    });
    return user;
  } catch (err) {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  let session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createUserSession(userId: string, redirectTo: string) {
  let session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

type RegisterForm = { password: string } & Omit<
Member,
  "id" | "teams" | "role" | "tasks" | "passwordHash" | "teamId" | "memberId"
>;

export async function register({ password, ...data }: RegisterForm) {
  let passwordHash = await bcrypt.hash(password, 10);
  try {
    return await db.member.create({
      data: { ...data, passwordHash, role: "MEMBER" },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        //@ts-ignore
        return `קיים כבר ${error?.meta.target[0]} משתמש עם`;
      }
    }
    throw error;
  }
}
