import React from 'react'
import { Button, Typography } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Statistics = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>
                <iframe src="https://grafana-pi01.ben-services.eu.org/d-solo/tUwKjoiRz/dev-stuff?orgId=1&from=1682866810732&to=1682866840732&panelId=5" width={window.innerWidth * 0.5} height={window.innerHeight * 0.5} ></iframe>
                <iframe src="https://grafana-pi01.ben-services.eu.org/d-solo/5wf4uKZRk/car?orgId=1&from=1682866541750&to=1682866571750&panelId=11" width={window.innerWidth * 0.5} height={window.innerHeight * 0.5} ></iframe>
            </div>
            <Button
                onClick={() => {
                    window.open("https://grafana-pi01.ben-services.eu.org/d/tUwKjoiRz/dev-stuff?orgId=1&search=open&query=folder:current")
                }}
                variant="contained"
                sx={{ backgroundColor: "#232ED1", width: "300px", alignSelf: "center", marginTop: "20px" }}
                disableElevation
                startIcon={<OpenInNewIcon />}
            >
                <Typography
                    sx={{
                        fontWeight: 100,
                    }}
                >

                    View More Statistics
                </Typography>
            </Button>

        </div>
        
    )
}

export default Statistics