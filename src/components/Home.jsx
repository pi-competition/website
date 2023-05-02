import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Gradient from 'rgt'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const Home = () => {

    return (
        <>
        <br />
        <Typography sx={{ fontWeight: 500, }} variant="h3" align="center" paragraph>
            <Gradient dir="left-to-right" from="#FF4500" to="#ffa500">
                Home
            </Gradient>
        </Typography>
        <h1 className="text-2xl bold flex justify-center">
            Welcome to Team PANIC's website.
        </h1>

        <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
                <Card id="home-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                    <CardMedia component="img" image="https://i.postimg.cc/0QbZt7qm/about.png"/>
                    <CardContent id="home-card-content" sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            About
                        </Typography>
                        <Typography>
                            An explanation of our project.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" id="home-page-button" variant="contained" href="/about">View</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Card id="home-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                    <CardMedia component="img" image="https://i.postimg.cc/664YnVcx/design.png"/>
                    <CardContent id="home-card-content" sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Design
                        </Typography>
                        <Typography>
                            Materials from the design process.
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" id="home-page-button" variant="contained" href="/design">View</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Card id="home-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                    <CardMedia component="img" image="https://i.postimg.cc/prjCvxrL/team.jpg"/>
                    <CardContent id="home-card-content" sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Team
                        </Typography>
                        <Typography>
                            Information about our team members and their roles.
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" id="home-page-button" variant="contained" href="/team">View</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Card id="home-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                    <CardMedia component="img" image="https://i.postimg.cc/kXrwcVY6/map.png"/>
                    <CardContent id="home-card-content" sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Map
                        </Typography>
                        <Typography>
                            The layout of the track, as detected by the camera.
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" id="home-page-button" variant="contained" href="/map">View</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Card id="home-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                    <CardMedia component="img" image="https://i.postimg.cc/TwF0BhRs/stats.jpg"/>
                    <CardContent id="home-card-content" sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Statistics
                        </Typography>
                        <Typography>
                            Live statistics being sent from the car.
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" id="home-page-button" variant="contained" href="/stats">View</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        </Container>
        </>

    )
}

export default Home