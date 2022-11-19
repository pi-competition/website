import Stack from '@mui/material/Stack'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import GitHub from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <div className='footer flex justify-center align-bottom'>
            <Stack>
                <a
                    href="https://github.com/pi-competition"
                    target={"_blank"}
                    rel="noopener noreferrer"
                ><GitHubIcon /></a>
            </Stack>
        </div>
    )
}

export default Footer