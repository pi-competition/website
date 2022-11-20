import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from "./components/NavigationBar"


const PageHandler = () => {
    return (
        <div className="page-handler">
            <NavigationBar />
            <Outlet />
        </div>

    )
}

export default PageHandler