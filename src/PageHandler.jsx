import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from "./components/NavigationBar"


const PageHandler = ({ giveTheme, online }) => {
    return (
        <div className="page-handler">
            <NavigationBar giveTheme={giveTheme} online={online} />
            <Outlet />
        </div>

    )
}

export default PageHandler