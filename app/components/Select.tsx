import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiSelector, HiCheck } from "react-icons/hi";
import { TFunction } from "react-i18next";

export interface SelectProps {
  name: string;
  options: Array<{ value: string; label: string }>;
  translateFn: TFunction<"common", undefined>;
}

export default function Select({
  name = "",
  options = [{ value: "", label: "all" }],
  translateFn,
}: SelectProps) {
  const [value, setValue] = useState(options[0]?.value);
  return (
    <Listbox as="select" name={name} value={value} onChange={setValue}>
      <Listbox.Button
        as="button"
        dir="rtl"
        className="relative w-full py-2 pr-3 pl-10 text-right bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
      >
        <span className="block truncate">
          {options.find((v) => v.value === value)?.label ||
            translateFn("select")}
        </span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <HiSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </Listbox.Button>
      <Transition
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
          {options.map((option, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `${active ? "text-blue-900 bg-blue-100" : "text-gray-800"}
              cursor-default select-none relative py-2 pl-10 pr-4`
              }
              value={option?.value}
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={`${
                      selected ? "font-medium" : "font-normal"
                    } block truncate`}
                  >
                    {translateFn(option?.label)}
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
    </Listbox>
  );
}
