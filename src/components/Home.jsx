import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Gradient from 'rgt'

const Home = () => {

    return (
        <div className='home'>
            <br />
            <Typography sx={{ fontWeight: 500, }} variant="h3" align="center" paragraph>
              <Gradient dir="left-to-right" from="#FF4500" to="#ffa500">
              Home
              </Gradient>
            </Typography>
            <br />
            <br />
            {
                <Stack id="home-stack" direction="row" spacing={2}>
                    <Button id="home-page-button" variant="contained" href="/about">
                     About
                    </Button>
                    <Button id="home-page-button" variant="contained" href="/design">
                     Design
                    </Button>
                    <Button id="home-page-button" variant="contained" href="/team">
                     Team
                    </Button>
                    <Button id="home-page-button" variant="contained" href="/map">
                     Map
                    </Button>
                    <Button id="home-page-button" variant="contained" href="/stats">
                     Statistics
                    </Button>
                </Stack>
            }
        </div>
    )
}

export default Home