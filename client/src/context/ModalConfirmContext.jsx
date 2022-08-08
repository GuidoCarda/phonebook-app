import React, { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";

const ModalConfirm = createContext();

export const ModalConfirmProvider = ({ children }) => {
  const [state, setState] = useState({ isOpen: false });

  const confirm = () => {
    return new Promise((resolve) => {
      setState({ ...data, isOpen: true });
    });
  };
  return (
    <ModalConfirm.Provider value={confirm}>
      {children}
      {<Modal {...state} />}
    </ModalConfirm.Provider>
  );
};

export const useConfirm = () => useContext(ModalConfirm);
