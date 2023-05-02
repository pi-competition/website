import React from 'react'
import parse from "html-react-parser"
import Grid from "@mui/material/Grid"

const DesignContentContainer = ({ content }) => {
    const containerWidth = window.innerWidth * 0.8
    return (
        <div className='design-container' style={{
            width: `${containerWidth}px`
        }}>
            <p
                style={{
                    marginBottom: "1rem",
                }}
                className="text-lg"
            >{parse(content.description)}</p>
            <Grid container >
                {
                    content.images.map((image) => {
                        return (
                            <Grid item sx={{
                                margin: "auto",
                                marginBottom: "1rem"
                            }} >
                                <img src={image} style={{
                                    maxWidth: "600px",
                                    maxHeight: "600px",
                                }} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

export default DesignContentContainer