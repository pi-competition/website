import React from 'react'
import parse from "html-react-parser"
import { Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';

const AboutContentContainer = ({ content }) => {
    let jsx;
    if (content.type === "image") {
        jsx = (
            <div className="about-container">
                <h3 className="text-xl">{content.title}</h3>
                <img src={content.src} alt={content.title} width={window.innerWidth * content.widthFactor} height={window.innerHeight * content.heightFactor} className="about-container-image"></img>
                <Button
                    variant="contained"
                    startIcon={<OpenInNew />}
                    sx={{ mt: 2 }}
                    onClick={(() => {
                        window.open(content.src)
                    })}
                >
                    View Image
                </Button>
            </div>
        )
    } else if (content.type === "text") {
        jsx = (
            <div className='about-container'>
                <h3 className='text-xl'>{content.title}</h3>
                <p>{parse(content.text)}</p>
            </div>
        )
    } else if (content.type === "disabled") {
        jsx = (
            <div className='about-container'>
                <p>Error: Incorrect type in about.json</p>
            </div>)

    }
    return jsx
}

export default AboutContentContainer