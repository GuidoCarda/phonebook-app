import React, { useState } from "react";
import { useEffect } from "react";

const DarkmodeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const storageKey = "theme-preference";

  useEffect(() => {
    setPreference();
  }, [darkMode]);

  // useEffect(() => {
  //   getUserPreference();
  //   setPreference();
  // }, []);

  // const getUserPreference = () => {
  //   if (localStorage.getItem(storageKey))
  //     return localStorage.getItem(storageKey);
  //   else
  //     return window.matchMedia("(prefers-color-scheme:dark").matches
  //       ? "dark"
  //       : "light";
  // };

  const setPreference = () => {
    localStorage.setItem(storageKey, `${darkMode ? "dark" : "light"}`);
    document.firstElementChild.setAttribute(
      "data-theme",
      `${darkMode ? "dark" : "light"}`
    );
  };

  const toggleTheme = () => setDarkMode(!darkMode);

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
