import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const storageKey = "theme-preference";

const getUserPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
  else
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(getUserPreference());

  useEffect(() => {
    setPreference();
    reflectPreference();
  }, [darkMode]);

  const reflectPreference = () => {
    document.firstElementChild.setAttribute("data-theme", `${darkMode}`);
  };

  const setPreference = () => {
    localStorage.setItem(storageKey, darkMode);
  };

  const toggleTheme = () => setDarkMode(darkMode === "dark" ? "ligth" : "dark");

  return (
    <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
