import Stack from '@mui/material/Stack'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import CopyrightIcon from '@mui/icons-material/Copyright';
import content_config from "../assets/general_content.json"

const Footer = () => {
    return (
        <div className='footer flex justify-center align-bottom'>
            <Stack>
                <a
                    href="https://github.com/pi-competition"
                    target={"_blank"}
                    rel="noopener noreferrer"
                    className='github-icon'
                ><GitHubIcon /></a>
                <p
                    className='copyright-text'
                >
                    <CopyrightIcon
                        fontSize='small'
                    />
                    Team {content_config.team_name} 2023
                </p>
            </Stack>
        </div>
    )
}

export default Footer