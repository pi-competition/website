import React, { useState } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ColourToggles from './navbar/ColourToggles'
import generalContent from "../assets/general_content.json"
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';

const pages = ["Home", "About"];

const NavigationBar = ({ giveTheme }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [reRenderVar, setReRenderVar] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Team {generalContent.team_name}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Team {generalContent.team_name}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <ButtonGroup>
                            <Link
                                to="/"
                            >
                                <Button
                                    id="home-button"
                                    onClick={() => {
                                        setReRenderVar(!reRenderVar)
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
                                        setReRenderVar(!reRenderVar)
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
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <ColourToggles giveTheme={giveTheme} />
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavigationBar;

/*
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
*/