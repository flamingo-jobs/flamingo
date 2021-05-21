import React from 'react'
import { CssBaseline, Container, ThemeProvider, makeStyles } from '@material-ui/core'
import './styles/Home.css'
import FloatCard from './components/FloatCard'
import SideDrawer from './components/SideDrawer'
import Grid from '@material-ui/core/Grid';
import theme from './styles/Theme';
import Topbar from './components/Topbar';
import Favorites from './components/Favorites';
import backgroundImage from './images/background-image.jpg';
import HeroSection from './components/HeroSection'
import FeaturedOrganizations from './components/FeaturedOrganizations'
import FeaturedJobs from './components/FeaturedJobs'
import PostJobSection from './components/PostJobSection'

const useStyles = makeStyles(() => ({
    root: {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    container: {
        paddingTop: 20
    },
    FeaturedOrganizations: {
        paddingTop: 25
    },
}));

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <div className="overlay">
                    <React.Fragment>
                        <CssBaseline />
                        <Container maxWidth="false" className={classes.container}>
                            <Grid container direction="row" spacing={3}>
                                <Grid item sm={2} style={{position: 'fixed'}}>
                                    <FloatCard >
                                        <SideDrawer />
                                    </FloatCard>
                                </Grid>
                                <Grid item sm={2}></Grid>
                                <Grid item container xs={10} spacing={3}>
                                    <Grid item sm={12}>
                                        <Topbar />
                                    </Grid>
                                
                                    <Grid item sm={12}>
                                        <FloatCard>
                                            <HeroSection />
                                        </FloatCard>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <FeaturedJobs />
                                    </Grid>
                                    <Grid item container sm={6}>
                                        <Grid item sm={12}>
                                            <PostJobSection />
                                        </Grid>
                                        <Grid item sm={12} className={classes.FeaturedOrganizations}>
                                            <FeaturedOrganizations />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    </React.Fragment>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Home
