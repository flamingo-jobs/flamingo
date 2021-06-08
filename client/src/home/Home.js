import React from 'react'
import { CssBaseline, Container, ThemeProvider, makeStyles } from '@material-ui/core'
import './styles/Home.css'
import FloatCard from '../components/FloatCard'
import SideDrawer from '../components/SideDrawer'
import Grid from '@material-ui/core/Grid';
import theme from '../Theme';
import Topbar from '../components/Topbar';
import backgroundImage from './images/background-image.jpg';
import HeroSection from './components/HeroSection'
import FeaturedOrganizations from './components/FeaturedOrganizations'
import FeaturedJobs from './components/FeaturedJobs'
import PostJobSection from './components/PostJobSection'
import Footer from '../components/Footer'
import Space from '../components/Space'

const useStyles = makeStyles((theme) => ({
    root: {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    container: {
        width: '100%',
        padding: 5,
        paddingTop: 10,
        [theme.breakpoints.down('md')]: {
            paddingTop: 10,
        },
        [theme.breakpoints.down('xs')]: {
            paddingTop: 0,
        },
    },
    topBarGrid: {
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            maxWidth: 'unset'
        },
    },
    sideDrawerGrid: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    }
}));

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="overlay">
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="false" className={classes.container}>
                        <Grid container direction="row" spacing={3} style={{ margin: '0px', width: '100%' }} className={classes.topBarGrid}>
                            <Grid item xs={0} sm={4} md={3} lg={2} style={{ position: 'fixed' }} className={classes.sideDrawerGrid}>
                                <SideDrawer />
                            </Grid>
                            <Grid item xs={0} sm={4} md={3} lg={2} className={classes.sideDrawerGrid}></Grid>
                            <Grid item container xs={12} sm={8} md={9} lg={10} spacing={0} className={classes.topBarGrid}>
                                <Grid item sm={12}>
                                    <Topbar />
                                </Grid>
                                <Space value={16} />

                                <Grid item sm={12}>
                                    <FloatCard>
                                        <HeroSection />
                                    </FloatCard>
                                </Grid>

                                <Space value={16} />

                                <Grid item xs={12} md={6} style={{paddingRight: 8}}>
                                    <FeaturedJobs />
                                    
                                </Grid>

                                <Grid item container xs={12} md={6} spacing={0} style={{paddingLeft: 8}} justify="flex-start">
                                    <Grid item sm={12}>
                                        <PostJobSection />
                                    </Grid>
                                    <Space value={3} />
                                    <Grid item sm={12} className={classes.FeaturedOrganizations}>
                                        <FeaturedOrganizations />
                                    </Grid>
                                </Grid>
                                <Space value={16} />
                                <Grid item xs={12}>
                                    <Footer />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </React.Fragment>
            </div>
        </div>
    )
}

export default Home
