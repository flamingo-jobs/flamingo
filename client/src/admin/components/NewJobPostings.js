import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import FloatCard from '../../components/FloatCard'
import CircularProgressWithLabel from './CicularProgressWithLabel'

function NewJobPostings() {
    return (
        <FloatCard>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CircularProgressWithLabel value={70} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3">130</Typography>
                    <Typography>New Job Postings</Typography>
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
            </Grid>
        </FloatCard>
    )
}

export default NewJobPostings
