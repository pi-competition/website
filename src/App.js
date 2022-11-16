import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PageHandler from './PageHandler'
import Home from "./components/Home"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PageHandler />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
