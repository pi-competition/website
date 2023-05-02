import { Typography } from '@mui/material'
import React from 'react'

const Statistics = ({ online }) => {
    return (

        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"

        }}>
            {!online ? <div style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                width: (window.innerWidth * 0.8) + "px"
            }}>The controller software is not running so the live statistics cannot be viewed. If the top left box says 'no data' the PI is on but the software is not running.</div> : <div></div>}
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>
                <iframe src="https://grafana-pi01.ben-services.eu.org/d-solo/tUwKjoiRz/dev-stuff?orgId=1&from=1682866810732&to=1682866840732&panelId=5" width={window.innerWidth * 0.5} height={window.innerHeight * 0.5} ></iframe>
                <iframe src="https://grafana-pi01.ben-services.eu.org/d-solo/5wf4uKZRk/car?orgId=1&from=1682866541750&to=1682866571750&panelId=11" width={window.innerWidth * 0.5} height={window.innerHeight * 0.5} ></iframe>
            </div>
        </div>
    )

}

export default Statistics