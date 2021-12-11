import { Outlet } from "remix";
export { CatchBoundary, ErrorBoundary } from "~/utils";

export default function DevicesView() {
  return <Outlet />;
}
