import { Button, Collapse, Alert, AlertTitle } from '@mui/material'
import React from 'react'

const RegenImage = () => {
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
            <Collapse>
                <Alert>
                    <AlertTitle>Success</AlertTitle>
                </Alert>
            </Collapse>
        </div>
    )
}

export default RegenImage