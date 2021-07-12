import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import FloatCard from '../../components/FloatCard'
import CircularProgressWithLabel from './CicularProgressWithLabel'

function WeeklyApplications() {
    return (
        <FloatCard>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CircularProgressWithLabel value={70} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3">130</Typography>
                    <Typography>Weekly Applications</Typography>
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
            </Grid>
        </FloatCard>
    )
}

export default WeeklyApplications
