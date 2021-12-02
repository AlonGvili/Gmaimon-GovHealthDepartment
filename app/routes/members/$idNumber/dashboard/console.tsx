import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useFetcher, useLoaderData } from "remix";
import { HiCheck, HiPlusSm, HiSelector } from "react-icons/hi";
import { School } from ".prisma/client";
import { db } from "~/utils/db.server";
import { LoaderFunction } from "remix";
import DynamicSelectBox from "~/components/DynamicForm";
import { getUser } from '~/utils/session.server';

export const resources = [
  { name: "בית ספר", resource: "School" },
  { name: "מבנה", resource: "Building" },
  { name: "כיתה", resource: "Classroom" },
  { name: "עובד", resource: "User" },
  { name: "מפקח", resource: "Supervisor" },
  { name: "הזמנה", resource: "Order" },
];

export let userForm = {
  action: "/actions/addUser",
  fields: [
    {
      name: "name",
      placeholder: "שם מלא",
      type: "text",
      required: true,
    },
    {
      name: "email",
      placeholder: "כתובת אימייל",
      type: "email",
      required: true,
    },
    {
      name: "idNumber",
      placeholder: "תעודת זהות",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      placeholder: "טלפון",
      type: "tel",
      required: true,
    },
    {
      name: "username",
      placeholder: "שם משתמש",
      type: "text",
      required: true,
    },
    {
      name: "password",
      placeholder: "סיסמה",
      type: "password",
      required: true,
    },
    {
      name: "role",
      placeholder: "סוג משתמש",
      type: "select",
      options: [
        { value: "ADMIN", label: "מנהל" },
        { value: "SUPERVISOR", label: "מפקח" },
        { value: "USER", label: "עובד" },
        { value: "TEAMLEADER", label: "ראש צוות" },
      ],
      required: true,
    },
    {
      name: "team",
      placeholder: "צוות",
      type: "select",
      options: [{ value: "1", label: "צוות 1" }],
      required: true,
    },
  ],
};

export let buildingForm = {
  action: "/actions/addBuilding",
  fields: [
    {
      name: "name",
      placeholder: "שם מבנה",
      type: "text",
      required: true,
    },
    {
      name: "buildingNumber",
      placeholder: "מספר מבנה",
      type: "text",
      required: true,
    },
  ],
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  let schools = await db.school.findMany();
  return schools;
};

export default function AdminConsole() {
  const [resource, setResource] = useState<{ name: string; resource: string }>(
    resources[0]
  );
  let dynamicForm = useFetcher();
  return (
    <div dir="rtl" className="flex flex-col w-full">
      <div className="w-full m-8">
        <h1 className="text-md mb-4 text-base">מה ליצור</h1>
        <h1 className="text-sm mb-4 text-gray-700">
          שלב ראשון בחר את סוג האובייקט שברצונך ליצור
        </h1>
        <Listbox value={resource} onChange={setResource}>
          <div className="relative mt-1 max-w-md z-20">
            <Listbox.Button
              dir="rtl"
              className="relative w-full py-2 pr-3 pl-10 text-right bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
            >
              <span className="block truncate">{resource?.name}</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <HiSelector
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {resources.map((resource, resourceInd) => (
                  <Listbox.Option
                    key={resourceInd}
                    className={({ active }) =>
                      `${
                        active
                          ? "text-purple-900 bg-purple-100"
                          : "text-gray-900"
                      }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={resource}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {resource.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-purple-600" : "text-purple-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <HiCheck className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div className="w-full m-8 mt-4">
        <h1 className="text-md mb-4 text-base">עם איזה נתונים</h1>
        <h1 className="text-sm mb-4 text-gray-700">
          שלב שני נא למלא את הפרטים הנדרשים
        </h1>
        <dynamicForm.Form
          method="post"
          action={`/actions/add${resource.resource}`}
          className="flex flex-col max-w-md items-start bg-white rounded-md shadow-md z-10"
        >
          <fieldset className="space-y-4 p-2 border-b w-full">
            {resource.resource === "User"
              ? userForm.fields.map((field, fieldIdx) => {
                  return field.type === "select" ? (
                    <DynamicSelectBox {...field} key={fieldIdx} />
                  ) : (
                    <input
                      className="h-8 w-full p-4 ml-4 text-gray-700 text-base focus:outline-none placeholder-shown:text-sm"
                      {...field}
                    />
                  );
                })
              : null}
          </fieldset>
          <div className="px-5 py-3 rounded-b-md">
            <button
              type="submit"
              className="group flex items-center justify-center"
            >
              <HiPlusSm
                className="w-4 h-4 group-hover:text-purple-500 text-sm text-gray-500 ml-1"
                aria-hidden="true"
              />
              <span className="text-sm text-gay-500 group-hover:text-purple-500 font-semibold">
                צור {resource.name}
              </span>
            </button>
          </div>
        </dynamicForm.Form>
      </div>
    </div>
  );
}
