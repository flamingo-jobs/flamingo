import React from 'react'
import { CssBaseline, Container, ThemeProvider, makeStyles } from '@material-ui/core'
import '../styles/Profile.css'
import FloatCard from '../../components/FloatCard'
import Grid from '@material-ui/core/Grid';
import theme from '../../Theme';
import Footer from '../../components/Footer';
import IntroSection from './IntroSection'

const useStyles = makeStyles((theme) => ({
    root: {
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
}));

function Profile() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
                <div className="overlay">
                    <React.Fragment>
                        <CssBaseline />
                        <Container maxWidth="false" className={classes.container}>
                            <Grid container direction="row" spacing={3}>
                                <Grid item xs={12} sm={4} md={3} lg={3}>
                                    <IntroSection />
                                </Grid>
                                <Grid item xs={12} sm={8} md={9} lg={9}>
                                    <FloatCard />
                                </Grid>
                                <Grid item container xs={12} sm={8} md={9} lg={10} spacing={3}>

                                </Grid>
                            </Grid>
                        </Container>
                    </React.Fragment>
                </div>
        </div>
    )
}

export default Profile
