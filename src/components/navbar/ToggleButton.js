import React, { useState, useEffect } from 'react'
import { themes } from "../../contexts/themeContext"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { Tooltip, IconButton } from '@mui/material'

const ToggleButton = ({ changeTheme, giveTheme }) => {
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        changeTheme(darkMode ? themes.dark : themes.light);
        // eslint-disable-next-line
        giveTheme(darkMode)
    }, [darkMode])
    // eslint-disable-next-line

    return (
        <div>
            <Tooltip
                title={window.location.pathname !== "/admin" ? "Change Theme" : "Change Theme is disabled on admin page."}
                arrow={true}

            >
                <span>
                    <IconButton
                        onClick={() => {
                            setDarkMode(!darkMode);
                        }}
                        color="inherit"
                        disabled={window.location.pathname === "/admin" ? true : false}
                    >
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </span>
            </Tooltip>
        </div>
    )
}

export default ToggleButton