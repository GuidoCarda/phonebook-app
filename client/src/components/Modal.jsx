import React from "react";
import { motion } from "framer-motion";
import { IoWarningOutline } from "react-icons/io5";

const Modal = ({ children, isOpen }) => {
  console.log("modal isOpen: ", isOpen);
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
          <span>Eliminar contacto</span>
          <p>
            Esta seguro que quiere elimirar a Guido de sus contactos? Tenga en
            cuenta que una vez eliminado no podra recuperar su informacion
          </p>
        </div>
        <footer className="modal-footer"></footer>
        {/* <footer className="modal-footer">
          {type == "confirm" ? (
            <>
              <button onClick={handleCancel}>cancelar</button>
              <button onClick={handleConfirm}>aceptar</button>
            </>
          ) : (
            <button onClick={handleConfirm}>aceptar</button>
          )}
        </footer> */}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
