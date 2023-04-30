import { Button, Collapse, Alert, AlertTitle } from '@mui/material'
import React, { useState } from 'react'
import configFile from '../../config/config.json'

const RegenImage = ({ auth }) => {
    const [alertTitle, setAlertTitle] = useState("Success")
    const [alertMessage, setAlertMessage] = useState("The map has been regenerated.")
    const [alertSeverity, setAlertSeverity] = useState("success")
    const [alertOpen, setAlertOpen] = useState(false)

    const handleAlertChange = (title, message, severity) => {
        setAlertTitle(title)
        setAlertMessage(message)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }

    const handleButtonPress = () => {
        // /map/refresh
        let route = configFile.apiURL + "/ext/map/refresh"
        fetch(route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            }
        }).then((result) => {
            if (result.status === 204) {
                handleAlertChange("Success", "Server Restarted.", "success")
            } else {
                console.log("Error")
                handleAlertChange("Error", "Something went wrong", "error")
            }
        }).catch((err) => {
            console.log(err)
            handleAlertChange("Error", "Something went wrong", "error")
        })
    }

    return (
        <div
            className='regen-map-div'
        >
            <p>Regenernate the map that is used for pathfinding to update the cars route.</p>
            <Button
                onClick={handleButtonPress}
                variant='contained'
                color='primary'
                sx={{
                    mt: 2
                }}
            >
                Refresh map
            </Button>
            <Collapse
                in={alertOpen}
            >
                <Alert
                    severity={alertSeverity || "info"}
                >
                    <AlertTitle>{alertTitle}</AlertTitle>
                    {alertMessage}
                </Alert>
            </Collapse>
        </div>
    )
}

export default RegenImage