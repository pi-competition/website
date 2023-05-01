import React, { useState } from 'react'
import { Button } from "@mui/material"
import { Link } from 'react-router-dom'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

const CarStatusContainer = ({ car }) => {
    const parseUptime = (seconds) => {//convert uptime from milliseconds to minutes:seconds
        seconds = Math.round(seconds)
        let minutes = 0
        while (true) {
            if (seconds < 60) {
                break
            }
            seconds = seconds - 60
            minutes++
        }
        return minutes + ":" + seconds
    }

    const parseState = (state) => {
        return state[0].toUpperCase() + state.substring(1)
    }

    const parseBattery = () => {
        return Math.round(car.battery * 10) / 10 //round to 2 dp
    }

    let borderColor;
    if (car.status === "online") borderColor = "green"
    else if (car.status === "offline") borderColor = "red"
    else borderColor = "orange"
    return (
        <div
            className='car-status-container'
            style={{ borderColor: borderColor }}
        >
            <p>Car ID: {car.id}</p>
            <p>Status: {parseState(car.status)}</p>
            {car.state !== "offline" ?
                <div>
                    <p>Uptime: {parseUptime(car.uptime)} min</p>
                </div>
                :
                <div>
                    <p>Uptime: N/A</p>
                </div>
            }
            <Link to={`/admin/car/${car.id}`} >
                <Button
                    variant='outlined'
                    sx={{ marginTop: "0.5rem" }}
                    endIcon={<OpenInNewOutlinedIcon />} s
                >
                    More Detail
                </Button>
            </Link>

        </div>
    )
}

export default CarStatusContainer