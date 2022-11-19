import ToggleButton from "./ToggleButton"
import React from 'react'
import { ThemeContext } from '../../contexts/themeContext'


const ColourToggles = () => {
    return (
        <div className='colour-mode-buttons'>
            <ThemeContext.Consumer>
                {({ changeTheme }) => (
                    <ToggleButton changeTheme={changeTheme} />
                )}
            </ThemeContext.Consumer>
        </div>
    )
}

export default ColourToggles
