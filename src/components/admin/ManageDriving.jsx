import { Alert, AlertTitle, Button, Collapse, IconButton } from '@mui/material'
import React, { useState } from 'react'
import config from "../../config/config.json"
import CloseIcon from "@mui/icons-material/Close"

const ManageDriving = ({ auth }) => {
    const config = config.apiURL
    const ALERT_DURATION = config.manageDrivingAlertDuration
    const [on, setOn] = useState(false);
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
        setOn(!on)
        let route = config.apiURL + "/api/cars"
        if (on) {
            route = route + "/stop"
        } else {
            route = route + "/start"
        }
        fetch(route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            }
        }).then((result) => {
            if (result.status === 204) {
                setOn(!on)
                handleAlertChange("Success", "Driving has been " + (on ? "stopped" : "started"), "success")
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
            className='manage-driving-div'
        >
            <Button
                onClick={handleButtonPress}
                variant="contained"
                color={on ? "error" : "success"}
                className='manage-driving-button'
            >
                {on ? "Stop Driving" : "Start Driving"}
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

export default ManageDriving