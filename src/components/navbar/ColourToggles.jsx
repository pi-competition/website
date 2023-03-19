import ToggleButton from "./ToggleButton"
import React from 'react'
import { ThemeContext } from '../../contexts/themeContext'


const ColourToggles = ({ giveTheme }) => {
    return (

        <div className='colour-mode-buttons'>

            <ThemeContext.Consumer>
                {({ changeTheme }) => (
                    <ToggleButton changeTheme={changeTheme} giveTheme={giveTheme} />
                )}
            </ThemeContext.Consumer>

        </div>
    )
}

export default ColourToggles

/* bens shit code
* !window.location.href.includes("/admin") ? changeTheme : () => { console.log("DO NOT CHANGE THEME ON ADMIN PAEGE!!!!!!!!!!!!!!!!") }
*/
