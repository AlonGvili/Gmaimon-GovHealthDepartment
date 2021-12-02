import { Tab } from "@headlessui/react";
import { ActionFunction, Form, redirect } from "remix";
import { useActionData, Link, useSearchParams } from "remix";
import { db } from "~/utils/db.server";
import {
  createUserSession,
  getUser,
  login,
  register,
} from "~/utils/session.server";
import ValidationMessage from "../components/ValidationMessage";

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `שם משתמש חייב להיות מינימום 2 אותיות`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `סיסמה חייבת להיות באורך של מינימום 6 תוים`;
  }
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
  };
  fields?: {
    loginType: string;
    username: string;
    password: string;
    email: string;
    idNumber: string;
    name: string;
    phone: string;
  };
};

export let action: ActionFunction = async ({ request }) => {
  let form = await request.formData();
  let loginType = form.get("loginType") as string;
  let username = form.get("username") as string;
  let password = form.get("password") as string;
  let name = form.get("name") as string;
  let email = form.get("email") as string;
  let phone = form.get("phone") as string;
  let idNumber = form.get("idNumber") as string;

  switch (loginType) {
    case "login":
      if (!email || !password) {
        return {
          formError: "חובה למלא את כל השדות",
        };
      }
      let { user, error } = await login({ email, password });
      if (error) {
        return {
          formError: error,
        };
      }
      if (user) {
        return createUserSession(
          user.email,
          user.role === "SUPERVISOR"
            ? `/members/${user?.idNumber}/dashboard/supervisor/orders`
            : user.role === "ADMIN"
            ? `/admin`
            : `/members/${user?.idNumber}/dashboard`
        );
      }
    case "register":
      let fields = { loginType, username, password };
      let userExists = await db.user.findFirst({
        where: {
          email: { equals: email },
        },
        select: {
          email: true,
        },
      });
      if (userExists?.email === email) {
        return {
          fields,
          fieldErrors: { email: "משתמש עם דואר אלקטרוני זה כבר קיים" },
        };
      }
      let newUser = await register({
        email,
        name,
        phone,
        idNumber,
        username,
        password,
      });
      if (!newUser) {
        return null;
      }
      if (typeof newUser === "string") {
        return {
          fields,
          formError: newUser,
        };
      }
      return createUserSession(
        newUser.email,
        `/members/${newUser?.idNumber}/dashboard`
      );
  }
};

export default function Login() {
  let actionData = useActionData<ActionData | undefined>();
  let [searchParams] = useSearchParams();
  return (
    <div className="p-12 max-w-md w-full mx-auto" dir="rtl">
      <h1 className="text-xl text-center text-white">
        כניסה למערכת ניהול פרוייקט Meditav
      </h1>
      <div className="flex w-full flex-col justify-center items-center">
        <div className="w-full max-w-md px-2 py-16 sm:px-0">
          <Tab.Group
            defaultIndex={actionData?.fields?.loginType === "register" ? 1 : 0}
          >
            <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                התחבר
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                הירשם
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  "bg-white rounded-xl p-3",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                )}
              >
                <Form method="post" className="space-y-8 p-12">
                  <input hidden name="loginType" value="login" />
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder="דואר אלקטרוני"
                    type="text"
                    name="email"
                  />
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder="סיסמה"
                    type="password"
                    name="password"
                  />
                  {actionData?.formError && (
                    <ValidationMessage message={actionData.formError} />
                  )}
                  <button
                    type="submit"
                    className="block text-blue-800 text-center w-full bg-blue-400 h-10 rounded-xl"
                  >
                    התחבר
                  </button>
                </Form>
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "bg-white rounded-xl p-3",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                )}
              >
                <Form method="post" className="space-y-8 p-12">
                  <input hidden name="loginType" value="register" />
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder="שם מלא"
                    defaultValue={actionData?.fields?.name}
                    required
                    type="text"
                    name="name"
                  />
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder="אימייל"
                    defaultValue={actionData?.fields?.email}
                    required
                    type="email"
                    name="email"
                  />
                  {actionData?.fieldErrors?.email && (
                    <ValidationMessage
                      message={actionData.fieldErrors?.email}
                    />
                  )}
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder="טלפון"
                    defaultValue={actionData?.fields?.phone}
                    required
                    type="tel"
                    name="phone"
                  />
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder="תעודת זהות"
                    defaultValue={actionData?.fields?.idNumber}
                    required
                    type="text"
                    name="idNumber"
                  />
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder="שם משתמש"
                    defaultValue={actionData?.fields?.username}
                    type="text"
                    name="username"
                  />
                  {actionData?.fieldErrors?.username && (
                    <ValidationMessage
                      message={actionData.fieldErrors.username}
                    />
                  )}
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder="סיסמה"
                    defaultValue={actionData?.fields?.password}
                    type="password"
                    name="password"
                  />
                  {actionData?.fieldErrors?.password && (
                    <ValidationMessage
                      message={actionData.fieldErrors.password}
                    />
                  )}
                  <button
                    type="submit"
                    className="block text-blue-800 text-center w-full bg-blue-500 h-10 rounded-xl"
                  >
                    הירשם
                  </button>
                </Form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
