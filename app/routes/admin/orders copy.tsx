import { LoaderFunction, useTransition, useLocation } from 'remix';
import { useLoaderData, Form, ActionFunction } from "remix";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";
import { Disclosure } from "@headlessui/react";
import { HiChevronUp } from "react-icons/hi";
import { Order, OrderStatus, Team, Ticket, User } from ".prisma/client";
import {
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useState,
  useEffect,
} from "react";
import { useActionData } from "remix";
import { RiLoaderLine } from "react-icons/ri";
import { TFunction } from 'react-i18next';
import { Column } from 'react-table';
import React from 'react';
export { CatchBoundary, ErrorBoundary } from "~/utils";

interface UseOrderColumnsProps {
  translationFn: TFunction;
}

type OrderColumns = Array<Column<Ticket>>;

export function normalizeDate(date: string | null | undefined) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString();
}

export const useOrderColumns = ({ translationFn }: UseOrderColumnsProps) => {
  let location = useLocation()
  return React.useMemo<OrderColumns>(
    () => [
      {
        Header: translationFn("trackingNumber") as string,
        accessor: "trackingNumber"
      },
      {
        Header: translationFn("createdAt") as string,
        accessor: "createdAt",
        Cell: ({ value }: { value: string }) => normalizeDate(value),
      },
      {
        Header: translationFn("schoolName") as string,
        accessor: "schoolName",
      },
      {
        Header: translationFn("status") as string,
        accessor: "status",
        Cell: ({ value }: { value: string }) => translationFn(value),
      },
      {
        Header: translationFn("address") as string,
        accessor: "address",
      },
      {
        Header: translationFn("contactName") as string,
        accessor: "contactName",
      },
      {
        Header: translationFn("contactPhone") as string,
        accessor: "contactPhone",
      },
      {
        Header: translationFn("devices") as string,
        accessor: "devices"
      },
    ],
    []
  );
};
type OrderBladeProps = { tasks: Ticket[] } & React.HTMLAttributes<HTMLDivElement>;

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  let orders = await db.ticket.findMany();
  return orders;
};

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  switch (formData.get("queryType")) {
    case "filter":
      try {
        let orders = await db.ticket.findMany({
          where: {
            status: {
              equals: formData.get("status") as OrderStatus,
            },
          },
        });
        if (!orders) {
          return null;
        }
        return orders;
      } catch (error) {
        return null;
      }
    case "create":
      let newOrder = await db.ticket.upsert({
        where: {
          id: parseInt(formData.get("ticketId") as string),
        },
        create: {
          address: formData.get("address") as string,
          schoolName: formData.get("schoolName") as string,
          devices: parseInt(formData.get("amountOfDevices") as string),
          contactName: formData.get("contactName") as string,
          contactPhone: formData.get("contactPhone") as string,
          trackingNumber: formData.get("trackingNumber") as string,
          status: "OPEN",
          createdAt: new Date(formData.get("createdAt") as string),
          school: {
            connect: {
              id: parseInt(formData.get("schoolId") as string),
            },
          },
        },
        update: {
          address: formData.get("address") as string,
          schoolName: formData.get("schoolName") as string,
          devices: parseInt(formData.get("amountOfDevices") as string),
          contactName: formData.get("contactName") as string,
          contactPhone: formData.get("contactPhone") as string,
          trackingNumber: formData.get("trackingNumber") as string,
          status: "OPEN",
          school: {
            connect: {
              id: parseInt(formData.get("schoolId") as string),
            },
          },
        },
      });
      return newOrder;
  }
};

export default function Orders() {
  let { t } = useTranslation("common");
  const columns = useTaskColumns({ translationFn: t });
  let { data: orders } = useLoaderData();
  let actionData = useActionData();
  let transition = useTransition();
  let [allorders, setOrders] = useState(() => orders);
  useEffect(() => {
    if (transition.type === "idle" && actionData) {
      setOrders(() => actionData);
    }
  }, [transition]);
  return (
    <div className="grid grid-cols-6 gap-4 py-12">
      {/* new order form  */}
      <div className="bg-white col-span-2 rounded-lg shadow py-5">
        <Form method="post">
          <div className="flex justify-between px-6 items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              צור הזמנה חדשה
            </h3>
            <button className="bg-blue-500  p-3 text-sm text-white rounded-md">
              צור הזמנה
            </button>
          </div>
          <div className="border-t border-gray-200 mt-6 pt-4">
            <dl className="space-y-4">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  מספר הזמנה
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input className="rounded-lg bg-gray-100 h-8 w-full p-4 ml-4 text-gray-700 text-base focus:outline-none placeholder-shown:text-sm" />
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  תאריך הזמנה
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="date"
                    name="createdAt"
                    className="rounded-lg bg-gray-100 h-8 w-full p-4 ml-4 text-gray-800 text-base focus:outline-none placeholder-shown:text-sm"
                  />
                </dd>
              </div>
              <div className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  שם מוסד החינוך
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    name="schoolName"
                    className="rounded-lg bg-gray-100 h-8 w-full p-4 ml-4 text-gray-700 text-base focus:outline-none placeholder-shown:text-sm"
                  />
                </dd>
              </div>
              <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  כתובת מוסד החינוך
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    name="address"
                    className="rounded-lg bg-gray-100 h-8 w-full p-4 ml-4 text-gray-700 text-base focus:outline-none placeholder-shown:text-sm"
                  />
                </dd>
              </div>
              <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">מספר מעקב</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    name="trackingNumber"
                    className="rounded-lg bg-gray-100 h-8 w-full p-4 ml-4 text-gray-700 text-base focus:outline-none placeholder-shown:text-sm"
                  />
                </dd>
              </div>
              <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  שם איש קשר
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    name="contactName"
                    className="rounded-lg bg-gray-100 h-8 w-full p-4 ml-4 text-gray-700 text-base focus:outline-none placeholder-shown:text-sm"
                  />
                </dd>
              </div>
              <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  טלפון איש קשר
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    name="contactPhone"
                    className="rounded-lg bg-gray-100 h-8 w-full p-4 ml-4 text-gray-700 text-base focus:outline-none placeholder-shown:text-sm"
                  />
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  מכשירים שהוזמנו
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="amountOfDevices"
                    className="rounded-lg bg-gray-100 h-8 w-full p-4 ml-4 text-gray-700 text-base focus:outline-none placeholder-shown:text-sm"
                  />
                </dd>
              </div>
              <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  שייך למפקח
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <select name="supervisorId">
                    <option value="none">בחר מפקח</option>
                    {allSupervisors.map(
                      (supervisor: {
                        id: Key | null | undefined;
                        value: string | number | readonly string[] | undefined;
                        label:
                          | boolean
                          | ReactChild
                          | ReactFragment
                          | ReactPortal
                          | null
                          | undefined;
                      }) => (
                        <option key={supervisor.id} value={supervisor.value}>
                          {supervisor.label}
                        </option>
                      )
                    )}
                  </select>
                </dd>
              </div>
              <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  שייך לצוות
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <select name="teamId">
                    <option value="none">בחר צוות</option>
                    {allteams.map((team) => (
                      <option key={team} value={team.value}>
                        {team.label}
                      </option>
                    ))}
                  </select>
                </dd>
              </div>
            </dl>
          </div>
          <input hidden name="queryType" defaultValue="create" />
        </Form>
      </div>
      <div dir="rtl" className="col-span-4 h-72">
        <div className="w-full">
          {/* filter order bar */}
          <div className="bg-white col-span-2 rounded-lg shadow px-4 py-5  mb-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              סינון הזמנות
            </h3>
            <Form name="filterByStatus" method="post">
              <input name="queryType" hidden defaultValue="filter" />
              <select name="status">
                <option value="none">בחר סטטוס</option>
                <option value="PENDING">ממתין</option>
                <option value="PROCESSING">בטיפול</option>
                <option value="COMPLETED">הושלם</option>
                <option value="CANCELED">בוטל</option>
              </select>
              <button
                type="submit"
                className="bg-blue-500  p-3 text-sm text-white rounded-md inline-flex items-center mr-8"
              >
                {transition.state === "submitting" ? (
                  <RiLoaderLine className="animate-spin duration-1000" />
                ) : null}
                החל
              </button>
            </Form>
          </div>
          {/* all orders */}
          <div className="w-full p-2 space-y-4  bg-white rounded-xl ">
            {allorders?.map(
              (order: Order & { team: Team & { users: User[] } }) => (
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex justify-between w-full text-sm font-medium text-left text-blue-900 bg-gray-50 px-4 py-5 ${
                          open ? "bg-blue-300" : "bg-gray-100"
                        } rounded-lg hover:bg-blue-400 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75`}
                      >
                        <div className="flex justify-around w-1/3">
                          <p>הזמנה: {order?.trackingNumber}</p>
                          <span className="flex-1">
                            {order?.status === "PENDING"
                              ? "ממתין"
                              : order.status === "PROCESSING"
                              ? "טיפול"
                              : order.status === "COMPLETED"
                              ? "הושלם"
                              : "בוטל"}
                          </span>
                        </div>
                        <HiChevronUp
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-blue-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className=" pt-4 pb-2 text-sm text-gray-500">
                        <div className="bg-white overflow-hidden sm:rounded-lg">
                          <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                              פרטי הזמנה
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              מספר הזמנה: {order?.trackingNumber}
                            </p>
                          </div>
                          <div className="border-t border-gray-200">
                            <dl>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  תאריך הזמנה
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {new Date(
                                    order?.createdAt
                                  ).toLocaleDateString()}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  תאריך הספקה
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  ???
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  תאריך תחילת עבודה
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  ???
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  סטטוס הזמנה
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {order?.status === "PENDING"
                                    ? "ממתין"
                                    : order.status === "PROCESSING"
                                    ? "טיפול"
                                    : order.status === "COMPLETED"
                                    ? "הושלם"
                                    : "בוטל"}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  מכשירים שהוזמנו
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {order?.amountOfDevices}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  מכשירים שנשארו
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  ???
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  מכשירים שהותקנו
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  ???
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  שם המתקין
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {order?.team?.leaderName}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  טלפון המתקין
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {order?.team?.users[0]?.phone}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              )
            )}
            {/* </Scrollbars> */}
          </div>
        </div>
      </div>
    </div>
  );
}
