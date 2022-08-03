import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { MdDeleteForever, MdPerson } from "react-icons/md";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

const PersonsList = ({
  persons,
  filteredPersons,
  filterQuery,
  handleDelete,
}) => {
  if (persons.length === 0) {
    return (
      <motion.div
        className="empty-list"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <span>
          <BsArrowLeftCircle />
        </span>
        <h3>No contacts added</h3>
        <p>Add a contact now</p>
      </motion.div>
    );
  }
  if (filteredPersons.length === 0 && filterQuery)
    return (
      <div className="no-results">
        <h3>No results found</h3>
      </div>
    );

  return (
    <motion.ul className="persons-list">
      <AnimatePresence>
        {filteredPersons.length !== 0 && filterQuery
          ? filteredPersons.map((p) => (
              <motion.li
                className="list-item"
                key={p.id}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <span className="contact-icon">
                  <MdPerson />
                </span>
                <div>
                  <p>{p.name}</p>
                  <span>{p.number}</span>
                </div>
                <button
                  className="btn-delete-contact"
                  onClick={() => handleDelete(p)}
                >
                  <MdDeleteForever />
                </button>
              </motion.li>
            ))
          : persons.map((p) => (
              <motion.li
                className="list-item"
                key={p.id}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <span className="contact-icon">
                  <MdPerson />
                </span>
                <div>
                  <p>{p.name}</p>
                  <span>{p.number}</span>
                </div>
                <button
                  className="btn-delete-contact"
                  onClick={() => handleDelete(p)}
                >
                  <MdDeleteForever />
                </button>
              </motion.li>
            ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default PersonsList;
