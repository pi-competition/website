import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from '../contexts/themeContext';

export default function ThemeContextWrapper(props) {
    const [theme, setTheme] = useState(themes.dark);

    const changeTheme = (theme) => {
        setTheme(theme);
    }

    useEffect(() => {
        switch (theme) {
            case themes.light:
                document.body.classList.add('light-content');
                break;
            case themes.dark:
            default:
                document.body.classList.remove('light-content');
                break;
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}