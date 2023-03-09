import React, { useState } from 'react'
import { Button } from "@mui/material"
import { Link } from 'react-router-dom'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

const CarStatusContainer = ({ car }) => {
    const [uptime, setUptime] = useState([0, 0])
    let rawUptime = car.uptime
    const parseUptime = (milliseconds) => {//convert uptime from milliseconds to minutes:seconds
        let seconds = Math.floor(milliseconds / 1000)
        let minutes = 0
        while (true) {
            if (seconds < 60) {
                break
            }
            seconds = seconds - 60
            minutes++
        }
        setUptime([minutes, seconds])
    }


    setInterval(() => {
        rawUptime = rawUptime + 1000
        parseUptime(rawUptime)
    }, 1000)

    const parseState = (state) => {
        return state[0].toUpperCase() + state.substring(1)
    }

    const parseBattery = () => {
        return Math.round(car.battery * 10) / 10 //round to 2 dp
    }

    let borderColor;
    if (car.state === "online") borderColor = "green"
    else if (car.state === "offline") borderColor = "red"
    else borderColor = "orange"
    return (
        <div
            className='car-status-container'
            style={{ borderColor: borderColor }}
        >
            <p>Car ID: {car.id}</p>
            <p>Status: {parseState(car.state)}</p>
            {car.state !== "offline" ?
                <div>
                    <p>Battery: {parseBattery(car.battery)}%</p>
                    <p>Uptime: {uptime} min</p>
                </div>
                :
                <div>
                    <p>Battery: N/A</p>
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