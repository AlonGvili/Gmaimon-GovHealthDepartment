import { SchoolType } from ".prisma/client";
import { Tab } from "@headlessui/react";
import { Form } from "remix";
import {
  RiBuildingLine,
  RiBuildingFill,
  RiBuilding4Fill,
  RiBuilding4Line,
  RiDoorOpenLine,
  RiDoorOpenFill,
} from "react-icons/ri";
import { useState } from "react";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function SchoolForm() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [finishSteps, setFinishedSteps] = useState<number[]>([]);
  return (
    <Tab.Group onChange={(index) => setSelectedIndex(index)} vertical>
      <div className="flex h-full w-full my-24 mx-auto" dir="rtl">
        <Tab.List className="flex flex-col col-span-1 flex-1 max-w-max">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-32 h-32 py-2.5 text-sm leading-5 font-medium group rounded-tl-none rounded-bl-none",
                "focus:outline-none ring-white ring-opacity-60",
                selected
                  ? "bg-white shadow-xl text-purple-500"
                  : "text-gray-300 bg-white hover:text-purple-500"
              )
            }
          >
            <div className="flex flex-col p-4 justify-between items-center">
              {selectedIndex === 0 ? (
                <RiBuildingFill className="w-12 h-12 group-hover:text-purple-500" />
              ) : (
                <RiBuildingLine className="w-12 h-12 " />
              )}
              <p className="text-xm">הוספת בית ספר</p>
            </div>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-32 h-32 py-2.5 text-sm leading-5 font-medium group rounded-tl-none rounded-bl-none",
                "focus:outline-none ring-white ring-opacity-60",
                selected
                  ? "bg-white shadow-xl text-purple-500"
                  : "text-gray-300 bg-white hover:text-purple-500"
              )
            }
          >
            <div className="flex flex-col p-4 justify-between items-center">
              {selectedIndex === 1 ? (
                <RiBuilding4Fill className="w-12 h-12 group-hover:text-purple-500" />
              ) : (
                <RiBuilding4Line className="w-12 h-12" />
              )}
              <p className="text-xm">הוספת בניין</p>
            </div>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-32 h-32 py-2.5 text-sm leading-5 font-medium text-purple-50 rounded-tl-none rounded-bl-none",
                "focus:outline-none ring-white ring-opacity-60",
                selected
                  ? "bg-white shadow text-purple-500"
                  : "text-gray-300 bg-white  hover:text-purple-500 "
              )
            }
          >
            <div className="flex flex-col p-4 justify-between items-center">
              {selectedIndex === 2 ? (
                <RiDoorOpenFill className="w-12 h-12" />
              ) : (
                <RiDoorOpenLine className="w-12 h-12" />
              )}
              <p className="text-xm">הוספת כיתה</p>
            </div>
          </Tab>
        </Tab.List>
        <Tab.Panels className="col-span-2 flex justify-center items-center w-full">
          <Tab.Panel
            className={classNames(
              "bg-white rounded-tr-none px-24 py-8 w-full",
              "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
            )}
          >
            <Form
              method="post"
              action="/actions/addSchool"
              className="space-y-8 flex flex-col w-full p-4"
            >
              <input
                className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
                name="name"
                placeholder="שם בית ספר"
              />
              <input
                className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
                name="description"
                placeholder="תיאור"
              />
              <input
                className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
                name="address"
                placeholder="כתובת"
              />
              <input
                className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
                name="city"
                placeholder="עיר"
              />
              <input
                className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
                name="state"
                placeholder="מחוז"
              />
              <input
                className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
                name="zip"
                placeholder="מיקוד"
              />
              <input
                className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
                name="phone"
                placeholder="טלפון"
              />
              <input
                className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
                name="totalDevices"
                type="number"
                placeholder="מספר מכשירים"
              />
              <select
                name="schoolType"
                dir="rtl"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="HIGHSCHOOL">תיכון</option>
                <option value="KINDERGARDEN">גנון</option>
                <option value="YESODI">יסודי</option>
                <option value="ELSE">אחר</option>
              </select>
              <button
                type="submit"
                className="block text-purple-800 text-center w-full bg-purple-400 h-10 rounded-xl"
              >
                שמור
              </button>
            </Form>
          </Tab.Panel>
          <Tab.Panel  className={classNames(
              "bg-white rounded-tr-none px-24 py-8 w-full h-full",
              "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
            )}>
          <Form
              method="post"
              action="/actions/addSchool"
              className="space-x-8 flex w-full p-4 items-start"
            >
              <input
                className="h-10 w-full p-4 ml-4 rounded-lg bg-gray-100 text-gray-700"
                name="name"
                placeholder="שם בניין"
              />
              <input
                className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700 border-0 focus:border-none"
                name="totalClassrooms"
                type="number"
                placeholder="מספר בניין"
              />
              <input
                className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700 border-0 focus:border-none"
                name="totalClassrooms"
                type="number"
                placeholder="מספר כיתות"
              />
              <button
                type="submit"
                className="block text-purple-800 text-center w-full bg-purple-400 h-10 rounded-xl"
              >
                הוסף
              </button>
            </Form>
          </Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
    //     <Tab.Group defaultIndex={0} vertical={true} >
    //       <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
    //         <Tab
    //           className={({ selected }) =>
    //             classNames(
    //               " py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
    //               "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
    //               selected
    //                 ? "bg-white shadow"
    //                 : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
    //             )
    //           }
    //         >
    //           התחבר
    //         </Tab>
    //         <Tab
    //           className={({ selected }) =>
    //             classNames(
    //               "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
    //               "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
    //               selected
    //                 ? "bg-white shadow"
    //                 : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
    //             )
    //           }
    //         >
    //           הירשם
    //         </Tab>
    //       </Tab.List>
    //       <Tab.Panels className="mt-2">
    //         <Tab.Panel
    //           className={classNames(
    //             "bg-white rounded-xl p-3",
    //             "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
    //           )}
    //         >
    // עעעעעע
    //         </Tab.Panel>
    //         <Tab.Panel
    //           className={classNames(
    //             "bg-white rounded-xl p-3",
    //             "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
    //           )}
    //         >
    //           <div className="flex justify-center items-center w-full h-full py-24">
    //             <Form
    //               method="post"
    //               action="/actions/addSchool"
    //               className="space-y-8 p-12 flex flex-col bg-white rounded-lg my-auto max-w-lg w-full"
    //             >
    //               <input
    //                 className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
    //                 name="name"
    //                 placeholder="name"
    //               />
    //               <input
    //                 className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
    //                 name="description"
    //                 placeholder="description"
    //               />
    //               <input
    //                 className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
    //                 name="address"
    //                 placeholder="address"
    //               />
    //               <input
    //                 className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
    //                 name="city"
    //                 placeholder="city"
    //               />
    //               <input
    //                 className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
    //                 name="state"
    //                 placeholder="state"
    //               />
    //               <input
    //                 className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
    //                 name="zip"
    //                 placeholder="zip"
    //               />
    //               <input
    //                 className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
    //                 name="phone"
    //                 placeholder="phone"
    //               />
    //               <input
    //                 className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
    //                 name="totalDevices"
    //                 type="number"
    //               />
    //               <select
    //                 name="type"
    //                 id="schooltype"
    //                 className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
    //               >
    //                 <option value="HIGHSCHOOL">{SchoolType.HIGHSCHOOL}</option>
    //                 <option value="KINDERGARDEN">{SchoolType.KINDERGARDEN}</option>
    //                 <option value="YESODI">{SchoolType.YESODI}</option>
    //                 <option value="ELSE">{SchoolType.ELSE}</option>
    //               </select>
    //               <button
    //                 type="submit"
    //                 className="block text-purple-800 text-center w-full bg-purple-400 h-10 rounded-xl"
    //               >
    //                 שמור
    //               </button>
    //             </Form>
    //           </div>
    //         </Tab.Panel>
    //       </Tab.Panels>
    //     </Tab.Group>
  );
}
