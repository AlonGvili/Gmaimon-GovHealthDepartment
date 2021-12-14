import { LoaderFunction, useLoaderData, json } from "remix";
import { findUnique } from "~/api/members/read";
import { MemberReturnType } from '../../../api/members/read';
export { CatchBoundary, ErrorBoundary } from "~/utils";

// export let loader: LoaderFunction = async ({ params, request }) => {
//   let { socialNumber } = params;
//   let [,{data}] = await findUnique({ where: { socialNumber } });
//   return json({data});
// };

// export default function User() {
//   let {data} = useLoaderData<MemberReturnType[1]>();
//   return <h1>{data?.name}</h1>;
// }
