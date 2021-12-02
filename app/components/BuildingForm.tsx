import { School, SchoolType } from ".prisma/client";
import { Form, useFetcher } from "remix";

export default function BuildingForm({ name, buildingNumber, totalClassrooms }) {
  return (
     <div className="flex justify-center items-center w-full h-full py-24">
        <input
          className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
          name="name"
          placeholder="name"
          defaultValue={name}
        />
        <input
          className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
          name="number"
          type="number"
          defaultValue={buildingNumber}
        />
        <input
          className="h-10 w-full p-4 rounded-lg bg-gray-100 text-gray-700"
          name="totalClassrooms"
          type="number"
          defaultValue={totalClassrooms}
        />
        <button
          className="block text-purple-800 text-center w-full bg-purple-400 h-10 rounded-xl"
        >
          הוסף
        </button>
      </div>
  );
}
