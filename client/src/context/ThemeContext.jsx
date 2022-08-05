import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const storageKey = "theme-preference";

  useEffect(() => {
    setPreference();
  }, [darkMode]);

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
    <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
