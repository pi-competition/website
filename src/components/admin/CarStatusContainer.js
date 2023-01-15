import React from 'react'

const CarStatusContainer = ({ car }) => {
    const parseUptime = (milliseconds) => {//convert uptime from milliseconds to minutes:seconds
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
        return (
            seconds === 60 ?
                (minutes + 1) + ":00" :
                minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }

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
                    <p>Uptime: {parseUptime(car.uptime)} min</p>
                </div>
                :
                <div>
                    <p>Battery: N/A</p>
                    <p>Uptime: N/A</p>
                </div>
            }

        </div>
    )
}

export default CarStatusContainer