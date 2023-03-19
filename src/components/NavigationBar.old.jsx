import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "../index.css"
import generalContent from "../assets/general_content.json"

import { Button, ButtonGroup, AppBar, Container, Toolbar, Typography } from "@mui/material"
import ColourToggles from './navbar/ColourToggles'

const NavigationBar = ({ giveTheme }) => {
    const [rerenderVar, setRerenderVar] = useState(false)//a useState to force the page to rerender and change the state of the appearence mode button

    return (
        <AppBar
            className='nav-container'
            position='static'
        >
            <Container
                maxWidth="xl"
            >
                <Toolbar
                    disableGutters
                    variant='regular'
                >
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            letterSpacing: '.01rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >

                        Team
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >

                        {generalContent.team_name}
                    </Typography>

                    <div className='nav-buttons'>
                        <ButtonGroup>
                            <Link
                                to="/"
                            >
                                <Button
                                    id="home-button"
                                    onClick={() => {
                                        setRerenderVar(!rerenderVar)
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 100,
                                        }}
                                    >

                                        Home
                                    </Typography>
                                </Button>
                            </Link>

                            <Link
                                to="/about"
                            >
                                <Button
                                    id="about-button"
                                    onClick={() => {
                                        setRerenderVar(!rerenderVar)
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 100,
                                        }}
                                    >

                                        About
                                    </Typography>
                                </Button>
                            </Link>
                        </ButtonGroup>
                    </div>
                    <ColourToggles giveTheme={giveTheme} />
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavigationBar
