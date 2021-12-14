import { json, LoaderFunction, useLoaderData, useFetcher } from "remix";
import { useTranslation } from "react-i18next";
import { i18n } from "~/utils/i18n.server";
import { Outlet } from "remix";
import { Card, CardSection, Grid } from "@mantine/core";
import ColWrapper from "~/components/mantine/col";
import { db } from "~/utils/db.server";
import { Drawer, DrawerBase } from "~/components/drawer";
import { Form } from "~/components/mantine/mantineForm";

export { CatchBoundary, ErrorBoundary } from "~/utils";

export let loader: LoaderFunction = async ({ request }) => {
  let groups = await db.member.groupBy({
    by: ["role"],
    where: { deleted: false },
    _count: {
      _all: true,
    },
    orderBy: {
      role: "desc",
    },
  });
  return json({
    groups,
    i18n: await i18n.getTranslations(request, ["common"]),
  });
};

export default function Members() {
  let { groups } = useLoaderData();
  let [admin, member, leader, supervisor] = groups;
  let { t } = useTranslation("common");
  let addMember = useFetcher();
  return (
    <Drawer>
      <DrawerBase>
        <Form {...addMember} />
      </DrawerBase>
      <div className="flex h-full w-full flex-col">
        <div className="grid grid-flow-col-dense w-full h-1/6 min-h-fit mt-2 mx-2">
          <div className="col-span-12 md:col-span-6 lg:col-span-3 max-h-48 max-w-lg p-4">
            <Card className="h-full">
              <CardSection className="p-6">
                <h1 className="text-lg font-bold text-coolGray-600">
                  {t("ADMIN")}
                </h1>
                <h3 className="text-lg font-bold text-coolGray-600">
                  {admin?._count?._all}
                </h3>
              </CardSection>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 max-h-48 max-w-lg p-4">
            <Card className="h-full w-full">
              <CardSection className="p-6">
                <h1 className="text-lg font-bold text-coolGray-600">
                  {t("MEMBER")}
                </h1>
                <h3 className="text-lg font-bold text-coolGray-600">
                  {member?._count?._all}
                </h3>
              </CardSection>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 max-h-48 max-w-lg p-4">
            <Card className="h-full w-full">
              <CardSection className="p-6">
                <h1 className="text-lg font-bold text-coolGray-600">
                  {t("SUPERVISOR")}
                </h1>
                <h3 className="text-lg font-bold text-coolGray-600">
                  {supervisor?._count?._all}
                </h3>
              </CardSection>
            </Card>
          </div>
        </div>
        <Grid grow className="w-full h-full mx-2">
          <ColWrapper span={12}>
            <Card className="h-full">
              <CardSection>
                <Outlet />
              </CardSection>
            </Card>
          </ColWrapper>
        </Grid>
      </div>
    </Drawer>
  );
}
