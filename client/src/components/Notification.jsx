import React from "react";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";
import { motion } from "framer-motion";

const Notification = ({ message, state }) => {
  const renderIcon = (state) => {
    switch (state) {
      case "error":
        return <MdErrorOutline />;
      case "alert":
        return <MdErrorOutline />;
      default:
        return <MdCheckCircleOutline />;
    }
  };
  return (
    <motion.div
      key="notification"
      className={`notification show ${
        state === "success" ? "success" : "error"
      }`}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 20 }}
      exit={{ opacity: 0, y: -60 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="notification-icon"
      >
        {/* {state === "success" ?  : <MdErrorOutline />} */}
        {renderIcon(state)}
      </motion.span>
      <motion.h3
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.h3>
    </motion.div>
  );
};

export default Notification;
