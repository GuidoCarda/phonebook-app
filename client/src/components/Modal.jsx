import React from "react";
import { motion } from "framer-motion";
import { IoPhonePortraitSharp, IoWarningOutline } from "react-icons/io5";

const Modal = ({
  isOpen,
  title,
  description,
  confirmBtnLabel,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="modal-container"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="modal-body">
          <span className="icon">
            <IoWarningOutline />
          </span>
          <span>{title}</span>
          <p>{description}</p>
        </div>
        <footer className="modal-footer">
          <button onClick={onClose}>cancelar</button>
          <button onClick={onConfirm}>{confirmBtnLabel}</button>
        </footer>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
