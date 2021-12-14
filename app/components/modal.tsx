import {
  FunctionComponent,
  useState,
  useRef,
  ButtonHTMLAttributes,
  useEffect,
} from "react";
import { Dialog } from "@headlessui/react";
import { Modal as MantineModal } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";

interface ModalProps {
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
const Context = React.createContext<ModalProps>(InitialValues);

function Modal({ children }: { children: React.ReactNode }) {
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

const ModalBase: FunctionComponent<
  Partial<Parameters<typeof MantineModal>[0]>
> = ({ children, ...props }) => {
  let { isOpen, onClose } = React.useContext(Context);

  return (
    <MantineModal {...props} opened={isOpen} onClose={() => onClose()}>
      {children}
    </MantineModal>
  );
};

const ModalTitle: FunctionComponent<Parameters<typeof Dialog.Title>[0]> = ({
  children,
  ...props
}) => {
  return <Dialog.Title {...props}>{children}</Dialog.Title>;
};

const ModalDescription: FunctionComponent<
  Parameters<typeof Dialog.Description>[0]
> = ({ children, ...props }) => {
  return <Dialog.Description {...props}>{children}</Dialog.Description>;
};

const ModalButton: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  let { t: translationFn } = useTranslation();
  let { onOpen } = React.useContext(Context);
  return (
    <button
      className="bg-brand hover:bg-brand-dark text-white text-sm font-medium py-2 px-2 rounded-sm"
      {...props}
      onClick={() => onOpen()}
    >
      {translationFn("orders.new")}
    </button>
  );
};

const useModal = () => React.useContext(Context);

export {
  Modal,
  ModalBase,
  useModal,
  ModalTitle,
  ModalDescription,
  ModalButton,
  Context,
};
