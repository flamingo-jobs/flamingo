import React from 'react'
import Grid from '@material-ui/core/Grid';
import Lottie from 'react-lottie';
import Anim from './lotties/loading.json';

function MiniLoading(props) {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Anim,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Lottie
                    options={defaultOptions}
                    height={50}
                    width={150}
                />
            </Grid>
        </Grid>
    )
}

export default MiniLoading
