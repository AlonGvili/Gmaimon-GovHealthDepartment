import { Form } from "remix";
export default function AddSchool() {
  return (
    <div dir="rtl">
      <table className="table-fixed w-full border-collapse border-gray-200 border-2">
        <thead className="text-right text-gray-600 text-sm">
          <tr className="shadow-md border-b-4">
            <th className="border-2 p-2 border-gray-200">שם מוסד</th>
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
              <input type="number" className="h-8 w-full border-none focus:border-none focus:outline-none"/>
            </td>
          </tr>
        </tbody>
      </table>
      {/* <Form method="post" action="/actions/addSchool">
        <fieldset>
          <div className="space-y-4 max-w-md">
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
              name="phone"
              placeholder="טלפון"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="grid gap-4 max-w-md">
            <h1 className="text-xl">מיקום</h1>  
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
          </div>
        </fieldset>
        <fieldset>
          <div className="space-y-4 max-w-md">
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
          </div>
        </fieldset>
        <button
          type="submit"
          className="block text-purple-800 text-center bg-purple-400 h-10 rounded-xl"
        >
          שמור
        </button>
      </Form> */}
    </div>
  );
}
