import Table from "~/components/Table";
import React from "react";
import {
  json,
  LoaderFunction,
  useLoaderData,
} from "remix";
import { db } from "~/utils/db.server";
import { useTranslation, TFunction } from "react-i18next";
import { i18n } from "~/utils/i18n.server";
import { Link, Outlet, useMatches } from 'remix';

export { CatchBoundary, ErrorBoundary } from "~/utils";

export let loader: LoaderFunction = async ({ request }) => {
  let users = await db.member.findMany({
    select: {
      name: true,
      socialNumber: true,
    },
  });
  return json({
    users,
    i18n: await i18n.getTranslations(request, ["common"]),
  });
};

export let handle = {
  breadcrumb: ({match, t}: {match: ReturnType<typeof useMatches>, t: TFunction}) => <Link to="/admin/users">{t("users")}</Link>,
};

export default function Users() {
  let { users: data } = useLoaderData();
  let { t } = useTranslation("common");
  const columns = React.useMemo(
    () => [
      {
        Header: t("name"),
        accessor: "name",
        Cell: ({ row }) => {
          return (
            <Link
              to={row.original.socialNumber}
              prefetch="intent"
              className="whitespace-nowrap text-sm w-full h-full"
            >
              <div className="whitespace-nowrap text-sm font-medium w-full h-full">
                {row.values.name}
              </div>
            </Link>
          );
        },
      },
    ],
    []
  );
  return (
    <div className="flex h-full">
      <div className="bg-white max-w-lg h-full py-8">
        <h1 className="text-xl text-gray-800 px-6">{t("users")}</h1>
        <Table columns={columns} data={data} />
      </div>
      <Outlet />
    </div>
  );
}
