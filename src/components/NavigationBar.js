import React from 'react'
import { BsGithub } from "react-icons/bs"
import { Link, useLocation } from "react-router-dom"
import "../index.css"

const NavigationBar = () => {

    const current_address_raw = useLocation();
    const current_address = current_address_raw.pathname

    return (
        <nav className='nav-container'>
            <h1 id='team-name'>Team Name Here</h1>

            <div className='nav-buttons'>
                {current_address !== "/" ? <Link to="/"><button id="home-button">Home</button></Link> : null}
                {current_address !== "/about" ? <Link to="/about"><button id="home-button">About</button></Link> : null}
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