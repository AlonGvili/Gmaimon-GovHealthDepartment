import { Col, Text, useMantineTheme } from "@mantine/core";

export default function ColWrapper(props: React.ComponentProps<typeof Col>) {
  const theme = useMantineTheme();
  const background =
    theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.blue[0];

  return (
    <Col
    style={{ padding: theme.spacing.md }}
    {...props}
    >
      {props.children}
    </Col>
  );
}
