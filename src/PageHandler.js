import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from "./components/NavigationBar"


const PageHandler = () => {
    return (
        <div className="page-handler">
            <div >
                <NavigationBar />
                <Outlet />
            </div>
        </div>

    )
}

export default PageHandler