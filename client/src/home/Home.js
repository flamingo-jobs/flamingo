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
        minHeight: '100vh',
        backgroundSize: 'cover',
    },
    container: {
        width: '100%',
        margin: '0 auto',
        paddingTop: 10,
        paddingBottom: 10,
        minHeight: '100vh'
    },
    sideDrawer: {
        position: 'fixed',
        minWidth: '17.9%',
        marginTop: 10,
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.up('xl')]: {
            minWidth: '16.66667%',
        },
    },
    sideDrawerGrid: {
        marginTop: 10,
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
    mainGrid: {
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        },

    },
    topBarGrid: {
        paddingTop: '22px !important',
        marginBottom: 'auto',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            maxWidth: 'unset',
            paddingLeft: '0 !important',
            paddingRight: '0 !important'
        },
    },
    postJobSection: {
        minWidth: '100%',
        
    },
    featuredOrganizations: {
        minWidth: '100%'
    },
    rightSubColumn: {
        [theme.breakpoints.down('sm')]: {
            minWidth: 'fit-content',
            paddingTop: 24
        },
    }
}));

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="overlay">
                <Container maxWidth="false" className={classes.container}>
                    <Grid container direction="row" spacing={3} className={classes.mainGrid} justify="space-between"
                        alignItems="flex-start">
                        <Grid item xs={0} sm={4} md={3} lg={2} className={classes.sideDrawer}>
                            <SideDrawer />
                        </Grid>
                        <Grid item xs={0} sm={4} md={3} lg={2} className={classes.sideDrawerGrid}></Grid>
                        <Grid item container xs={12} sm={8} md={9} lg={10} spacing={3} className={classes.topBarGrid} direction="column"
                            justify="space-between">
                            <Grid item sm={12}>
                                <Topbar />
                            </Grid>
                            <Grid item container sm={12}>

                                <HeroSection />
                            </Grid>
                            <Grid item container xs={12} spacing={0} direction="row"
                                justify="space-between"
                                alignItems="flex-start">
                                <Grid item xs={12} md={6}>
                                    <FeaturedJobs />
                                </Grid>
                                <Grid item container xs={12} md={6} spacing={3} direction="column"
                                    justify="space-between"
                                    alignItems="flex-start" className={classes.rightSubColumn}>
                                    <Grid item sm={12} className={classes.postJobSection}>
                                        <PostJobSection />
                                    </Grid>
                                    <Grid item sm={12} className={classes.featuredOrganizations}>
                                        <FeaturedOrganizations />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Footer />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default Home
