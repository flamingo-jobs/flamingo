import React from 'react'
import Grid from '@material-ui/core/Grid';
import Lottie from 'react-lottie';
import Anim from './lotties/noData.json';
import { Typography } from '@material-ui/core';

function NoInfo(props) {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Anim,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Grid container spacing={10} style={{padding: 24}}>
            <Grid item xs={12}>
                <Lottie
                    options={defaultOptions}
                    height={200}
                    width={200}
                />
            </Grid>
            <Grid item xs={12} style={{marginTop: 16}}>
                <Typography>{props.message}</Typography>
            </Grid>
        </Grid>
    )
}

export default NoInfo
