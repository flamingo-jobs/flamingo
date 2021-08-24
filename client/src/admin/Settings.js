import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import FloatCard from '../components/FloatCard'
import RecommendationSettingsAccordion from './components/RecommendationSettingsAccordion';
import ShortlistingSettingsAccordion from './components/ShortlistingSettingsAccordion';
import AccountSettings from './components/AccountSettings';
import AccountSettingsAccordion from './components/AccountSettingsAccordion';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 500,
        fontSize: 18
    }
}))

function Settings() {

    const classes = useStyles();

    return (
        // <Grid item container xs={12} spacing={3} direction="column"
        //     justify="space-between"
        //     alignItems="flex-start">
        //     <Grid item xs={12} style={{ minWidth: '100%' }}>
        //         <FloatCard>
        <div style={{ padding: 12, width: '100%', textAlign: 'left' }}>
            <RecommendationSettingsAccordion />
            <ShortlistingSettingsAccordion />
            <AccountSettingsAccordion />
        </div>
        //         </FloatCard>
        //     </Grid>
        // </Grid>
    )
}

export default Settings
