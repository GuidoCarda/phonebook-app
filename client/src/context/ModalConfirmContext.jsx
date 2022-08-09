import React, { createContext, useContext, useRef, useState } from "react";
import Modal from "../components/Modal";

const ModalConfirm = createContext();

export const ModalConfirmProvider = ({ children }) => {
  const [state, setState] = useState({ isOpen: false });
  const fn = useRef();

  const confirm = (data) => {
    return new Promise((resolve) => {
      setState({ ...data, isOpen: true });

      fn.current = (choice) => {
        resolve(choice);
        setState({ isOpen: false });
      };
    });
  };

  return (
    <ModalConfirm.Provider value={confirm}>
      {children}
      {
        <Modal
          {...state}
          onClose={() => fn.current(false)}
          onConfirm={() => fn.current(true)}
        />
      }
    </ModalConfirm.Provider>
  );
};

export const useConfirm = () => useContext(ModalConfirm);
