import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react'
import Lottie from 'react-lottie';
import HeroImage from '../lotties/heroimage';

const useStyles = makeStyles((theme) => ({
    text: {
        alignSelf: 'center',
        padding: '20px !important'
    },
    h2: {
        fontWeight: 'bolder',
        color: theme.palette.stateBlue
    },
    h4: {
        color: theme.palette.black
    },
    button: {
        backgroundColor: theme.palette.blueJeans,
        color: 'white',
        margin: 10,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
            backgroundColor: theme.palette.mediumTurquoise,
            color: 'white',
        }
    },
    lottie: {
        [theme.breakpoints.down('xs')]: {
            width: 300
        },
    }
}))

function HeroSection() {

    const classes = useStyles();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: HeroImage,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Grid container direction="row" spacing={3} >
                <Grid item xs={12} md={6} className={classes.text}>
                    <Typography variant="h2" className={classes.h2}>Find the Career You Deserve !</Typography>
                    <Typography varient="h4" className={classes.h4}>img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text Search for the keywords to learn more about each warning. To ignore, add // eslint-disable-next-line to the line before.</Typography>
                    <Button className={classes.button}>GET HIRED</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Lottie className={classes.lottie}
                        options={defaultOptions}
                        height={'inherit'}
                        width={'inherit'}
                    />
                </Grid>
            </Grid>

        </div>
    )
}

export default HeroSection
