import React from 'react'
import { Link } from "react-router-dom"
import "../index.css"

import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import ColourToggles from './navbar/ColourToggles'

const NavigationBar = () => {

    return (
        <nav className='nav-container'>
            <h1 className='text-2xl' id='team-name'>Team IAN</h1>

            <div className='nav-buttons'>
                <ButtonGroup variant="text">
                    <Link to="/"><Button id="home-button">Home</Button></Link>
                    <Link to="/about"><Button id="about-button">About</Button></Link>
                </ButtonGroup>
            </div>
            <ColourToggles />
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