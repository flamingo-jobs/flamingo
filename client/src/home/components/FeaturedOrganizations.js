import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react'
import FloatCard from './FloatCard';
import Organization from './Organization';
import wso2 from '../images/wso2.png'
import virtusa from '../images/virtusa.png'
import ifs from '../images/ifs.png'
import ninix from '../images/ninix.png'
import zone from '../images/zone.png'
import mas from '../images/mas.png'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        color: theme.palette.black
    },
    container: {
        maxWidth: 'unset'
    },
    link: {
        backgroundColor: theme.palette.white,
        color: theme.palette.tuftsBlue,
        fontWeight: 800,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
            backgroundColor: theme.palette.white,
            color: theme.palette.pinkyRed,
        }
    },
}))

function FeaturedOrganizations() {
    const classes = useStyles();

    return (
        <div>
            <Grid container xs={12} direction="column" spacing={2} className={classes.container}>
                <Grid item sm={12} >
                    <FloatCard>
                        <Typography variant="h5" className={classes.title}>Featured Organizations</Typography>
                    </FloatCard>
                </Grid>
                <Grid item container direction="row" spacing={2}>
                    <Grid item sm={6}>
                        <Organization logo={ifs} name="IFS R&D" openings={8} />
                    </Grid>
                    <Grid item sm={6}>
                        <Organization logo={wso2} name="WSO2" openings={8} />
                    </Grid>
                    <Grid item sm={6}>
                        <Organization logo={ninix} name="99X" openings={8} />
                    </Grid>
                    <Grid item sm={6}>
                        <Organization logo={virtusa} name="Virtusa" openings={8} />
                    </Grid>
                    <Grid item sm={6}>
                        <Organization logo={mas} name="MAS Holdings" openings={8} />
                    </Grid>
                    <Grid item sm={6}>
                        <Organization logo={zone} name="Zone 24x7" openings={8} />
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <FloatCard>
                        <Button
                            className={classes.link}
                            endIcon={<ArrowForwardRoundedIcon />}
                        >
                            See All
      </Button>
                    </FloatCard>
                </Grid>
            </Grid>
        </div>
    )
}

export default FeaturedOrganizations
