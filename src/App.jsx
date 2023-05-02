import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import configFile from "./config/config.json"
import PageHandler from './PageHandler'
import Home from "./components/Home"
import About from './components/About'
import Team from './components/Team'
import Design from './components/Design'
import NotFound from './components/NotFound'
import Footer from "./components/Footer"
import Admin from "./components/Admin"
import config from "./config/config.json"
import CarDetail from './components/admin/CarDetail'
import bgSvgDark from "./assets/bgSvgDark.svg"
import bgSvgLight from "./assets/bgSvgLight.svg"
import bgPngDark from "./assets/bgPngDark.png"
import bgPngLight from "./assets/bgPngLight.png"
import Login from './components/admin/Login'
import Map from './components/Map'
import Statistics from "./components/Statistics"


const App = () => {
    const [darkMode, setDarkMode] = useState(true)
    const [online, setOnline] = useState(false)

    useEffect(() => {
        fetch(configFile.apiURL + "/api/ping")
            .then((response) => {
                if (response.status !== 200) {
                    setOnline(false)
                } else {
                    setOnline(true)
                }
            })
    })

    const switchTheme = (bool) => {
        setDarkMode(bool)
    }

    let bgString;
    if (config.bgType === "svg") bgString = `url(${darkMode ? bgSvgDark : bgSvgLight})`
    else if (config.bgType === "png") bgString = `url(${darkMode ? bgPngDark : bgPngLight})`
    else bgString = "none"

    return (
        <div
            className="the-parent"
            style={{ backgroundImage: bgString }}

        >
            <div className='main-section'>
                <Routes>
                    <Route path="/" element={<PageHandler giveTheme={switchTheme} online={online} />}>
                        <Route index element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/design" element={<Design />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/login" element={<Login />} />
                        <Route path="/admin/car/*" element={<CarDetail />} />
                        <Route path="/map" element={<Map />} />
                        <Route path="/stats" element={<Statistics online={online} />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </div>
            <div className="footer-section">
                <Footer />
            </div>
        </div>
    )
}

export default App