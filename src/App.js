import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import PageHandler from './PageHandler'
import Home from "./components/Home"
import About from './components/About'
import NotFound from './components/NotFound'
import Footer from "./components/Footer"
import Admin from "./components/Admin"
import bgSvgDark from "./assets/bgSvgDark.svg"
import bgSvgLight from "./assets/bgSvgLight.svg"

const App = () => {
    const [darkMode, setDarkMode] = useState(true)

    const switchTheme = (bool) => {
        setDarkMode(bool)
    }

    return (
        <div
            className="the-parent"
            style={{ backgroundImage: `url(${darkMode ? bgSvgDark : bgSvgLight})` }}
        >
            <div className='main-section'>
                <Routes>
                    <Route path="/" element={<PageHandler giveTheme={switchTheme} />}>
                        <Route index element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/admin" element={<Admin />} />
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