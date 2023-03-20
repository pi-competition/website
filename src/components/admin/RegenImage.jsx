import { Button, Collapse, Alert, AlertTitle } from '@mui/material'
import React, { useState } from 'react'
import config from '../../config/config.json'
const baseURL = config.apiURL

const RegenImage = () => {
    const [alertTitle, setAlertTitle] = useState("Success")
    const [alertMessage, setAlertMessage] = useState("The image has been regenerated.")
    const [alertSeverity, setAlertSeverity] = useState("success")
    const [alertOpen, setAlertOpen] = useState(false)

    const handleButtonPress = () => {
        console.log("Button Pressed")
    }

    return (
        <div
            className='regen-image-div'
        >
            <p>Regernate the image that is used for pathfinding to update the cars route.</p>
            <Button
                onClick={handleButtonPress}
                variant='contained'
                color='primary'
                sx={{
                    mt: 2
                }}
            >
                Refresh Image
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