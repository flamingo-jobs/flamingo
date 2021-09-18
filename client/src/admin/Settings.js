import { makeStyles } from '@material-ui/core'
import React from 'react'
import RecommendationSettingsAccordion from './components/RecommendationSettingsAccordion';
import ShortlistingSettingsAccordion from './components/ShortlistingSettingsAccordion';
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
        <div style={{ padding: 12, width: '100%', textAlign: 'left' }}>
            <RecommendationSettingsAccordion />
            <ShortlistingSettingsAccordion />
            <AccountSettingsAccordion />
        </div>
    )
}

export default Settings
