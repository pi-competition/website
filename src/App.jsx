import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import PageHandler from './PageHandler'
import Home from "./components/Home"
import About from './components/About'
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


const App = () => {
    const [darkMode, setDarkMode] = useState(true)

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
                    <Route path="/" element={<PageHandler giveTheme={switchTheme} />}>
                        <Route index element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/login" element={<Login />} />
                        <Route path="/admin/car/*" element={<CarDetail />} />
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