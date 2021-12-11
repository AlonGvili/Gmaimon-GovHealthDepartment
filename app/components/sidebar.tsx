export default function SideBar({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}
