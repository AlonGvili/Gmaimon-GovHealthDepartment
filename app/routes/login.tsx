import { Tab } from "@headlessui/react";
import { ActionFunction, Form, json, LoaderFunction } from "remix";
import { useActionData } from "remix";
import { db } from "~/utils/db.server";
import { createUserSession, login, register } from "~/utils/session.server";
import ValidationMessage from "../components/ValidationMessage";
import { i18n } from "~/utils/i18n.server"; // this is the first file you created
import { useTranslation } from "react-i18next";
import { getUserSession } from "../utils/session.server";
export { CatchBoundary, ErrorBoundary } from "~/utils";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    password: string | undefined;
    email: string | undefined;
  };
  fields?: {
    loginType: string;
    username: string;
    password: string;
    email: string;
    socialNumber: string;
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
  let socialNumber = form.get("socialNumber") as string;

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
        let session = await getUserSession(request);
        if (user.role === "ADMIN") {
          session.set("user-role", "admin");
          session.set("user-sn", user.socialNumber);
        }
        if (user.role === "SUPERVISOR") {
          session.set("user-role", "supervisor");
          session.set("user-sn", user.socialNumber);
        }
        if (user.role === "MEMBER") {
          session.set("user-role", "member");
          session.set("user-sn", user.socialNumber);
        }
        return createUserSession(
          user.email,
          user.role === "ADMIN" ? `admin` : `/`
        );
      }
    case "register":
      let fields = { loginType, password };
      let userExists = await db.member.findFirst({
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
        socialNumber,
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
        `/members/${newUser?.socialNumber}`
      );
  }
};

export let loader: LoaderFunction = async ({ request }) => {
  return json({
    i18n: await i18n.getTranslations(request, ["common"]),
  });
};

export default function Login() {
  let actionData = useActionData<ActionData | undefined>();
  let { t } = useTranslation("common");

  return (
    <div className="p-12 max-w-md w-full mx-auto" dir="rtl">
      <h1 className="text-xl text-center text-white">{t("login.title")}</h1>
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
                {t("login")}
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
                {t("register")}
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
                    placeholder={t("email")}
                    type="text"
                    name="email"
                  />
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder={t("password")}
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
                    {t("login")}
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
                    placeholder={t("fullName")}
                    defaultValue={actionData?.fields?.name}
                    required
                    type="text"
                    name="name"
                  />
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder={t("email")}
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
                    placeholder={t("phone")}
                    defaultValue={actionData?.fields?.phone}
                    required
                    type="tel"
                    name="phone"
                  />
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder={t("socialNumber")}
                    defaultValue={actionData?.fields?.socialNumber}
                    required
                    type="text"
                    name="socialNumber"
                  />
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder={t("username")}
                    defaultValue={actionData?.fields?.username}
                    type="text"
                    name="username"
                  />
                  <input
                    className="bg-gray-100 rounded-xl border-none text-gray-400 w-full h-10"
                    placeholder={t("password")}
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
                    {t("register")}
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
