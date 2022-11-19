import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from "./components/NavigationBar"
import Footer from './components/Footer'

const PageHandler = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default PageHandler