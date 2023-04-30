// /api/sever/restart

import { Alert, AlertTitle, Button, Collapse, IconButton } from '@mui/material'
import React, { useState } from 'react'
import configFile from "../../config/config.json"
import CloseIcon from "@mui/icons-material/Close"

const RestartServer = ({ auth }) => {
    const ALERT_DURATION = configFile.manageDrivingAlertDuration
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");

    const handleAlertChange = (title, message, severity) => {
        setAlertTitle(title)
        setAlertMessage(message)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }

    const handleButtonPress = () => {
        let route = configFile.apiURL + "/api/server/restart"
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
            className='restart-server-div'
        >
            <Button
                onClick={handleButtonPress}
                variant="contained"
                color="primary"
                className='restart-server-button'
            >
                Restart Server
            </Button>
            <Collapse
                in={alertOpen}
                addEndListener={() => {
                    setTimeout(() => {
                        setAlertOpen(false)
                    }, ALERT_DURATION);
                }}
            >
                <Alert
                    severity={alertSeverity || "info"}
                    variant="filled"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlertOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{
                        mt: 2
                    }}
                >
                    <AlertTitle>{alertTitle}</AlertTitle>
                    {alertMessage}
                </Alert>
            </Collapse>
        </div>
    )
}

export default RestartServer