import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PageHandler from './PageHandler'
import Home from "./components/Home"
import About from './components/About'
import NotFound from './components/NotFound'
import Footer from "./components/Footer"

const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      <div className='main-section'>
        <Routes>
          <Route path="/" element={<PageHandler />}>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
      <div classname="footer-section">
        <Footer />
      </div>
    </div>
  )
}

export default App
