import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { ThemeContext, themes } from '../../contexts/themeContext'

const ColourToggles = () => {
    const [aligment, setAlignment] = useState("dark");
    const [darkMode, setDarkMode] = useState(true)

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    }

    return (
        <div className='colour-mode-buttons'>
            <ThemeContext.Consumer>
                {({ changeTheme }) => (
                    <ToggleButtonGroup
                        color="primary"
                        value={aligment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="colour toggle"
                    >
                        <ToggleButton
                            value="dark"
                            aria-label='dark'
                            id="colour-toggle-dark"
                            onClick={(event) => {
                                setDarkMode(true);
                                changeTheme(themes.dark);
                            }}
                        >
                            Dark
                        </ToggleButton>
                        <ToggleButton
                            value="light"
                            aria-label='light'
                            id="colour-toggle-light"
                            onClick={() => {
                                setDarkMode(false);
                                changeTheme(themes.light);
                            }}
                        >
                            Light
                        </ToggleButton>
                    </ToggleButtonGroup>
                )}
            </ThemeContext.Consumer>
        </div>
    )
}

export default ColourToggles