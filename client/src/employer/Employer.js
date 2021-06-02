import React from 'react';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import MiniDrawer from "./components/SideDrawer"
import { CssBaseline, Container, ThemeProvider, makeStyles,useTheme } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import backgroundImage from './images/background-image.jpg';
import Topbar from './components/Topbar'
import CompanyInfo from './components/CompanyInfo'
import ProfileStatCard from './components/ProfileStatCard'


const useStyles = makeStyles((theme) => ({
    root: {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: '100vh'
        
    },
    container: {
        paddingTop: 20,
        [theme.breakpoints.down('xs')]: {
            paddingTop: 0,
        },
    },
    FeaturedOrganizations: {
        paddingTop: 25
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

const Employer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
                <div className="overlay">
                    <React.Fragment>
                        <CssBaseline />
                        <Container maxWidth="false" className={classes.container}>
                            <Grid container direction="row" spacing={3} className={classes.topBarGrid}>
                                <Grid item xs={0} sm={4} md={3} lg={2} style={{ position: 'fixed' }} className={classes.sideDrawerGrid}>
                                    <MiniDrawer />
                                </Grid>
                                <Grid item xs={0} sm={4} md={3} lg={2} className={classes.sideDrawerGrid}></Grid>
                                <Grid item container xs={12} sm={8} md={9} lg={10} spacing={3} className={classes.topBarGrid}>
                                    <Grid item sm={12}>
                                        <Topbar />
                                    </Grid>
                                    <Grid item sm={12}>
                                            <CompanyInfo></CompanyInfo>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        {/* <ProfileStatCard></ProfileStatCard> */}
                                    </Grid>
                                    <Grid item container xs={12} md={6}>
                                        <Grid item sm={12}>
                                            {/* <PostJobSection /> */}
                                        </Grid>
                                        <Grid item sm={12} className={classes.FeaturedOrganizations}>
                                            {/* <FeaturedOrganizations /> */}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* <Footer /> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    </React.Fragment>
                </div>
        </div>
    )
}

export default Employer

