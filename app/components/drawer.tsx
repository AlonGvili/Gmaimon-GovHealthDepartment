import {
  FunctionComponent,
  useState,
  useRef,
  ButtonHTMLAttributes,
  useEffect,
} from "react";
import { Dialog } from "@headlessui/react";
import { Drawer as MantineDrawer } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  focusRef?: React.RefObject<HTMLButtonElement>;
}
const InitialValues = {
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
};
const Context = React.createContext<DrawerProps>(InitialValues);

function Drawer({ children }: { children: React.ReactNode }) {
  let [isOpen, setIsOpen] = useState(false);
  let onClose = () => setIsOpen(false);
  let onOpen = () => setIsOpen(!isOpen);
  let focusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log("isOpen", isOpen);
  }, [isOpen]);

  return (
    <Context.Provider
      value={{ isOpen, onClose: onClose, onOpen: onOpen, focusRef }}
    >
      {children}
    </Context.Provider>
  );
}

const DrawerBase: FunctionComponent<Partial<Parameters<typeof MantineDrawer>[0]>> = ({ children, ...props }) => {
  let { isOpen, onClose } = React.useContext(Context);

  return (
    <MantineDrawer
    opened={isOpen}
    onClose={() => onClose()}
    padding="xl"
    size="xl"
  >
      {children}
    </MantineDrawer>
  );
};

const DrawerTitle: FunctionComponent<Parameters<typeof Dialog.Title>[0]> = ({
  children,
  ...props
}) => {
  return <Dialog.Title {...props}>{children}</Dialog.Title>;
};

const DrawerDescription: FunctionComponent<
  Parameters<typeof Dialog.Description>[0]
> = ({ children, ...props }) => {
  return <Dialog.Description {...props}>{children}</Dialog.Description>;
};

const DrawerButton: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & {label?: string}
> = ({ children, label, ...props }) => {
  let { t: translationFn } = useTranslation();
  let { onOpen } = React.useContext(Context);
  return (
    <button
      className="bg-brand hover:bg-brand-dark text-white text-sm font-medium py-2 px-2 rounded-sm"
      {...props}
      onClick={() => onOpen()}
    >
      {children || translationFn(`${label}`)}
    </button>
  );
};

const useDrawer = () => React.useContext(Context);

export {
  Drawer,
  DrawerBase,
  useDrawer,
  DrawerTitle,
  DrawerDescription,
  DrawerButton,
  Context,
};
