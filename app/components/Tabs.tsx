import { useState } from "react";
import { Tab } from "@headlessui/react";
import { Link, useLocation, NavLink } from "remix";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type TabsProps = {
  tabs: {
    label: string;
    component?: React.ReactNode;
    to?: string;
  }[];
};

export default function Tabs({
  tabs,
}: {
  tabs: { label: string; to: string; index: number }[];
}) {
  let location = useLocation();

  const setTabFromLocation = () => {
    return (
      tabs.find((tab) => tab.to === location.pathname.split("/")[-1])?.index ??
      0
    );
  };
  console.log(location.pathname);
  return (
    <div className="w-full max-w-3xl px-2 py-16 sm:px-0 mx-auto">
      <Tab.Group manual defaultIndex={setTabFromLocation()}>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {tabs.map((tab) => (
            <Tab
              defaultChecked={tab.index === setTabFromLocation()}
              as={Link}
              to={tab.to}
              key={tab.to}
              className={({ selected }) =>
                classNames(
                  "w-full text-center py-2.5 text-sm leading-5 font-medium text-indigo-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabs.map((tab) => (
            <Tab.Panel
              className={classNames(
                "bg-white rounded-xl p-3",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
              )}
            >
              <Outlet />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
