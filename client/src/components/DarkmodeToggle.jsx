import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const DarkmodeToggle = () => {
  const { toggleTheme, darkMode } = useContext(ThemeContext);
  return (
    <>
      <div>
        <button className="btn" onClick={toggleTheme}>
          {darkMode ? "ligthmode" : "darkmode"}
        </button>
      </div>
    </>
  );
};

export default DarkmodeToggle;
