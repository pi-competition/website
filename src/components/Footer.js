import Stack from '@mui/material/Stack'
import React from 'react'

const Footer = () => {
    return (
        <div className='footer flex justify-center align-bottom'>
            <Stack>
                <h3 className='underline flex justify-center'>Links</h3>
                <a
                    href="https://github.com/pi-competition"
                    target={"_blank"}
                    rel="noopener noreferrer"
                >Github</a>
            </Stack>
        </div>
    )
}

export default Footer