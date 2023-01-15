import React, { useState, useEffect } from 'react'
import { themes } from "../../contexts/themeContext"
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

const ToggleButton = ({ changeTheme, giveTheme }) => {
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        changeTheme(darkMode ? themes.dark : themes.light);
        // eslint-disable-next-line
    }, [darkMode])

    return (
        <div>
            <IconButton
                onClick={() => {
                    setDarkMode(!darkMode);
                    giveTheme(darkMode)
                }}
                color="inherit"
                disabled={window.location.pathname === "/admin" ? true : false}
            >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </div>
    )
}

export default ToggleButton