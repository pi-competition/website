import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from "./components/NavigationBar"

const PageHandler = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    )
}

export default PageHandler