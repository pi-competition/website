import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "../index.css"
import generalContent from "../assets/general_content.json"

import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import ColourToggles from './navbar/ColourToggles'

const NavigationBar = ({ giveTheme }) => {
    const [rerenderVar, setRerenderVar] = useState(false)//a useState to force the page to rerender and change the state of the appearence mode button

    return (
        <nav className='nav-container'>
            <h1 className='text-2xl' id='team-name'>Team {generalContent.team_name}</h1>

            <div className='nav-buttons'>
                <ButtonGroup variant="text">
                    {

                        <div>
                            <Link to="/"><Button id="home-button" onClick={() => {
                                setRerenderVar(!rerenderVar)
                            }}>
                                Home
                            </Button></Link>
                            <Link to="/about"><Button id="about-button" onClick={() => {
                                setRerenderVar(!rerenderVar)
                            }}>
                                About
                            </Button></Link>
                        </div>


                    }
                </ButtonGroup>
            </div>
            <ColourToggles giveTheme={giveTheme} />
        </nav>
    )
}

export default NavigationBar

/*
<button
        onClick={() => { window.open("https://github.com/pi-competition", "_blank", "noopener,noreferrer") }}
    >
        <TbBrandGithub
            id="github-icon"
            size={"30px"}
        />
</button> 
*/