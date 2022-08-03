import React from "react";
import { motion } from "framer-motion";

const Filter = ({ handleFilter, filterQuery }) => {
  return (
    <motion.div
      className="filter-container"
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <label htmlFor="filter">Filter shown for</label>
      <input
        type="text"
        id="fiter"
        value={filterQuery}
        onChange={handleFilter}
      />
    </motion.div>
  );
};

export default Filter;
