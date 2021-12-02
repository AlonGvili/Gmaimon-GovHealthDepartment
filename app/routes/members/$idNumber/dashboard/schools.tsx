import { RiHashtag } from "react-icons/ri";
import { Form, useLoaderData } from 'remix';
import {LoaderFunction} from 'remix';
import { db } from '~/utils/db.server';

export let loader: LoaderFunction = async ({ request }) => {
  // 
}

export default function Schools() {
  let data = useLoaderData()
  console.log(data)
  return (
    <table className="table-fixed w-full border-collapse border-gray-200 border-2">
      <thead className="text-right text-gray-600 text-sm">
        <tr className="shadow-md border-b-4">
          <th className="border-2 p-2 border-gray-200 flex justify-between">
            שם מוסד
            <RiHashtag/>
          </th>
          <th className="border-2 p-2 border-gray-200">תיאור</th>
          <th className="border-2 p-2 border-gray-200">כתובת</th>
          <th className="border-2 p-2 border-gray-200">עיר</th>
          <th className="border-2 p-2 border-gray-200">מחוז</th>
          <th className="border-2 p-2 border-gray-200">מיקוד</th>
          <th className="border-2 p-2 border-gray-200">סוג מוסד</th>
          <th className="border-2 p-2 border-gray-200">כמות מכשירים</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-2">
            <input className="h-8 w-full border-none focus:border-none focus:outline-none" />
          </td>
          <td className="border-2">
            <input className="h-8 w-full border-none focus:border-none focus:outline-none" />
          </td>
          <td className="border-2">
            <input className="h-8 w-full border-none focus:border-none focus:outline-none" />
          </td>
          <td className="border-2">
            <input className="h-8 w-full border-none focus:border-none focus:outline-none" />
          </td>
          <td className="border-2">
            <input className="h-8 w-full border-none focus:border-none focus:outline-none" />
          </td>
          <td className="border-2">
            <input className="h-8 w-full border-none focus:border-none focus:outline-none" />
          </td>
          <td className="border-2">
            <input className="h-8 w-full border-none focus:border-none focus:outline-none" />
          </td>
          <td className="border-2">
            <input
              type="number"
              className="h-8 w-full border-none focus:border-none focus:outline-none"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
