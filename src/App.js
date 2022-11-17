import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PageHandler from './PageHandler'
import Home from "./components/Home"
import About from './components/About'

const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Routes>
        <Route path="/" element={<PageHandler />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
