import React from 'react'
import Grid from '@material-ui/core/Grid';
import Lottie from 'react-lottie';
import Anim from './lotties/loading.json';

function Loading(props) {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Anim,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Grid container spacing={5} style={{ padding: 24 }}>
            <Grid item xs={12}>
                <Lottie
                    options={defaultOptions}
                    height={150}
                    width={150}
                />
            </Grid>
            {/* <Grid item xs={12} style={{marginTop: 16}}>
                <Typography>{props.message}</Typography>
            </Grid> */}
        </Grid>
    )
}

export default Loading
