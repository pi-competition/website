import React, { useState, useEffect } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ColourToggles from './navbar/ColourToggles'
import generalContent from "../assets/general_content.json"
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';
import configFile from "../config/config.json"

const NavigationBar = ({ giveTheme }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [reRenderVar, setReRenderVar] = useState(null);
    const [online, setOnline] = useState(false)
    const [statusNotiColour, setStatusNotiColour] = useState("purple")

    useEffect(() => {
        fetch(configFile.apiURL + "/api/ping")
            .then((response) => {
                if (response !== 200) {
                    setOnline(false)
                    setStatusNotiColour("orange")
                } else {
                    setOnline(true)
                    setStatusNotiColour("green")
                }
            })
    })

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position="static"
            className="navbar"
            sx={{ backgroundColor: "#232ED1" }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 1.5,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Team
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 1.5,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {generalContent.team_name}
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
                            <Link
                                to="/"
                            >
                                <MenuItem
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">Home</Typography>
                                </MenuItem>
                            </Link>
                            <Link
                                to="/team"
                            >
                                <MenuItem
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">Team</Typography>
                                </MenuItem>
                            </Link>
                            <Link
                                to="/map"
                            >
                                <MenuItem
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">Map</Typography>
                                </MenuItem>
                            </Link>

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
                                    variant="contained"
                                    sx={{ backgroundColor: "#232ED1" }}
                                    disableElevation
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
                                to="/team"
                            >
                                <Button
                                    id="about-button"
                                    onClick={() => {
                                        setReRenderVar(!reRenderVar)
                                    }}
                                    variant="contained"
                                    sx={{ backgroundColor: "#232ED1" }}
                                    disableElevation
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 100,
                                        }}
                                    >

                                        Team
                                    </Typography>
                                </Button>
                            </Link>
                            <a
                                href={window.location.origin + "/map"}
                            >
                                <Button
                                    id="map-button"
                                    onClick={() => {
                                        setReRenderVar(!reRenderVar)
                                    }}
                                    variant="contained"
                                    sx={{ backgroundColor: "#232ED1" }}
                                    disableElevation
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 100,
                                        }}
                                    >

                                        Map
                                    </Typography>
                                </Button>
                            </a>

                            <Link
                                to="/stats"
                            >
                                <Button
                                    id="stats-button"
                                    onClick={() => {
                                        setReRenderVar(!reRenderVar)
                                    }}
                                    variant="contained"
                                    sx={{ backgroundColor: "#232ED1" }}
                                    disableElevation
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 100,
                                        }}
                                    >

                                        Statistics
                                    </Typography>
                                </Button>
                            </Link>
                            <Box
                                sx={{
                                    backgroundColor: statusNotiColour,
                                    borderRadius: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "5px",
                                    marginLeft: "1rem"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 100,
                                    }}
                                >

                                    CONTROLLER: {online ? "ONLINE" : "OFFLINE"}
                                </Typography>
                            </Box>
                        </ButtonGroup>
                    </Box>

                    <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row" }}>
                        <a
                            href="https://grafana-pi01.ben-services.eu.org/d-solo/tUwKjoiRz/new-dashboard"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button
                                id="stats-button"
                                onClick={() => {
                                    setReRenderVar(!reRenderVar)
                                }}
                                variant="contained"
                                sx={{ backgroundColor: "#232ED1" }}
                                disableElevation
                                startIcon={<OpenInNewIcon />}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 100,
                                    }}
                                >

                                    Grafana
                                </Typography>
                            </Button>
                        </a>
                        <ColourToggles giveTheme={giveTheme} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavigationBar;