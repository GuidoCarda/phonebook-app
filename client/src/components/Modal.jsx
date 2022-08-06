import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <header className="modal-header">
          <button>x</button>
        </header>
        <div className="modal-body">
          Desea eliminar a Guido de sus contactos?
        </div>
        <footer className="modal-footer">
          <button>aceptar</button>
          <button>cancelar</button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
