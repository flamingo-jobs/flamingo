import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Lottie from 'react-lottie';
import Flamingo from './lotties/flamingo.json';
import FloatCard from './FloatCard';
import NavMenu from './NavMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
            Overflow: 'hidden'
        },
    },
    card: {
        display: 'flex',
        height: '92vh',
    },
    linkIcon: {
        color: theme.palette.stateBlue,
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            minWidth: 'unset',
        },
    },
    linkText: {
        color: theme.palette.black,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 10,

        },
    },
    listItem: {
        marginBottom: theme.spacing(2),
        borderRadius: 12,
        "&:hover": {
            borderRadius: 12,
            color: theme.palette.white + '!important',
            backgroundColor: theme.palette.lightSkyBlueHover + '!important',
        },
    },
    active: {
        backgroundColor: theme.palette.lightSkyBlue + '!important',
        borderRadius: 12,
        "& $linkText": {
            color: theme.palette.frenchViolet,
            fontWeight: "bold"
        }
    }

}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Flamingo,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className={classes.root}>
            <FloatCard>
                <div className={classes.card}>
                    <CssBaseline />
                    <Grid container direction="row" spacing={3}>
                        <Grid item xs={12}>
                            <NavMenu user={props.user} />
                        </Grid>
                        {props.user !== "admin" ? <Grid item xs={12}>

                            <Lottie
                                options={defaultOptions}
                                height={200}
                                width={200}
                            />
                        </Grid> : null}
                    </Grid>
                </div>
            </FloatCard>

        </div>
    );
}
