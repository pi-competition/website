import React from 'react'
import { BsGithub } from "react-icons/bs"
import { Link, useLocation } from "react-router-dom"
import "../index.css"

import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"

const NavigationBar = () => {

    const current_address_raw = useLocation();
    const current_address = current_address_raw.pathname

    return (
        <nav className='nav-container'>
            <h1 className='text-2xl' id='team-name'>Team Name</h1>

            <div className='nav-buttons'>
                <ButtonGroup variant="text">
                    <Link to="/"><Button id="home-button">Home</Button></Link>
                    <Link to="/about"><Button id="about-button">About</Button></Link>
                </ButtonGroup>
            </div>
            <div className='social-icons'>
                <a
                    href="https://github.com/pi-competition"
                    target={"_blank"}
                >
                    <BsGithub
                        id="github-icon"
                        size={"30px"}
                    />
                </a>
            </div>
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