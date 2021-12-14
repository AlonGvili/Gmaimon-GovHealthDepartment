import { json, LoaderFunction, useLoaderData, useFetcher } from "remix";
import { useTranslation } from "react-i18next";
import { i18n } from "~/utils/i18n.server";
import { Outlet } from "remix";
import { Card, CardSection, Grid } from "@mantine/core";
import ColWrapper from "~/components/mantine/col";
import { Drawer, DrawerBase } from "~/components/drawer";
import { Form } from "~/components/mantine/mantineForm";
import { orderStats } from "~/api/orders/read";
import { Prisma, Order } from ".prisma/client";

export { CatchBoundary, ErrorBoundary } from "~/utils";

// The type (shape) of the return data from our postgress database using Prisma (our database ORM)
// I use this to get type safty in the return data that our front side is render.
type OrdersSortbyStats = Prisma.PromiseReturnType<typeof orderStats>;

// This function runs on the backend ( server ).
// The function get the orders count base on the status of every order (OPEN,APPROVED etc...)
// Then the function send the response as a json response from the backend into the front as json.
export let loader: LoaderFunction = async ({ request }) => {
  // the function is for getting the raw data from our database
  let orders = await orderStats();
  // sends the output of orderStats function to the front as json
  return json({
    // the data.
    orders,
    // we need this to make the translation to work.
    i18n: await i18n.getTranslations(request, ["common"]),
  });
};

// The main orders component route.
// its only render the stats top bar and a outlet
// the outlet will render nested routes like the index page or specific order page
export default function Orders() {
  // get the raw data from the database using the useLoaderData hook
  let { orders } = useLoaderData<{ orders: OrdersSortbyStats }>();
  // get a translation function so we can support more languages in the futur ( only support hebrew for now )
  let { t } = useTranslation("common");
  // an handle for creating a new order, it is using in the Form inside the Drawer component.
  let addOrder = useFetcher();
  return (
    // Main drawer component its only render the context provider with any chldrens, no ui
    <Drawer>
      {/* Drawer wrapper container everything between the open and close tags are hidden 
      and only visible when the drawer is open */}
      <DrawerBase>
        {/* Generic form component that take handle function to use as a callback to create a record in the database */}
        <Form<Order> {...addOrder} />
      </DrawerBase>
      <div className="flex h-full w-full flex-col">
        {/* Order Statistics top bar */}
        <div className="grid grid-flow-col-dense w-full h-1/6 min-h-fit mt-2 mx-2">
          {orders?.map((order) => (
            <div className="col-span-12 md:col-span-6 lg:col-span-3 max-h-48 max-w-lg p-4">
              <Card className="h-full">
                <CardSection className="p-6">
                  <h1 className="text-lg font-bold text-coolGray-600">
                    {t(`${order.status}S`)}
                  </h1>
                  <h3 className="text-lg font-bold text-coolGray-600">
                    {order?._count?._all}
                  </h3>
                </CardSection>
              </Card>
            </div>
          ))}
        </div>
        {/* Main content section in the orders page */}
        <Grid grow className="w-full h-full mx-2">
          <ColWrapper span={12}>
            <Card className="h-full">
              <CardSection>
                {/* The nested routes will render here */}
                <Outlet />
              </CardSection>
            </Card>
          </ColWrapper>
        </Grid>
      </div>
    </Drawer>
  );
}
