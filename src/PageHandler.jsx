import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from "./components/NavigationBar"


const PageHandler = ({ giveTheme }) => {
    return (
        <div className="page-handler">
            <NavigationBar giveTheme={giveTheme} />
            <Outlet />
        </div>

    )
}

export default PageHandler