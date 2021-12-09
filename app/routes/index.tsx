import { Outlet } from "remix";
import { AppShell, Box, Container, Header, Navbar, Text, useMantineTheme } from '@mantine/core';
import { useMantineThemeStyles } from "@mantine/styles/lib/theme/MantineProvider";

export { CatchBoundary, ErrorBoundary } from "~/utils";

export default function Index() {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 300 }} height={500} padding="xs">{/* Navbar content */}</Navbar>}
      header={<Header height={60} padding="xs">{/* Header content */}</Header>}
    >
        <Outlet />
    </AppShell>
  );
}
