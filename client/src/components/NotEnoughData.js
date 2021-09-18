import React from 'react'
import Grid from '@material-ui/core/Grid';
import Lottie from 'react-lottie';
import Anim from './lotties/not_enoguh_data.json';
import { Typography } from '@material-ui/core';

function NotEnoughData(props) {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Anim,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Grid container spacing={1} style={{ padding: 8 }}>
            <Grid item xs={12}>
                <Lottie
                    options={defaultOptions}
                    height={150}
                    width={150}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography >
                    It seems we don't have enough data yet to show here.
                </Typography>
            </Grid>


        </Grid>
    )
}

export default NotEnoughData
