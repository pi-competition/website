import { createContext } from "react";

export const themes = {
    dark: "dark-content",
    light: "light-content",
};

export const ThemeContext = createContext({
    theme: themes.dark,
    changeTheme: () => { },
});