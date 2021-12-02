import { useState, Fragment } from "react";
import { Listbox } from "@headlessui/react";
import { HiCheck } from "react-icons/hi";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

export default function MyListbox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <Listbox value={null} onChange={() => {}} horizontal>
      <Listbox.Button>{selectedPerson.name}</Listbox.Button>
      <Listbox.Options
        static
        className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        {people.map((person, personIdx) => (
          <Listbox.Option
            key={personIdx}
            className={({ active }) =>
              `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
            }
            value={person}
          >
            {({ selected, active }) => (
              <>
                <span
                  className={`${
                    selected ? "font-medium" : "font-normal"
                  } block truncate`}
                >
                  {person.name}
                </span>
                {selected ? (
                  <span
                    className={`${active ? "text-amber-600" : "text-amber-600"}
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
    </Listbox>
  );
}
