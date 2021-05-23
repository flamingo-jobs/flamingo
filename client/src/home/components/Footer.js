import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import theme from '../../Theme'
import FloatCard from './FloatCard'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import ThumbsUpDownRoundedIcon from '@material-ui/icons/ThumbsUpDownRounded';
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import OndemandVideoRoundedIcon from '@material-ui/icons/OndemandVideoRounded';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import PolicyRoundedIcon from '@material-ui/icons/PolicyRounded';
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 15
    },
    title: {
        color: theme.palette.white,
        textAlign: 'left',
        paddingLeft: 30,
        marginBottom: 20,
        fontWeight: 700
    },
    linkIcon: {
        color: theme.palette.white,
        paddingLeft: theme.spacing(2),
    },
    linkText: {
        color: theme.palette.white,
    },
    listItem: {
        marginBottom: theme.spacing(1),
        borderRadius: 12,
        maxWidth: 250,
        "&:hover": {
            borderRadius: 12,
            color: theme.palette.ashBlue + '!important',
            backgroundColor: theme.palette.greenyLightSky + '!important',
        },
        "&:hover > $linkText": {
            color: theme.palette.ashBlue + '!important',
        },
        "&:hover > $linkIcon": {
            color: theme.palette.ashBlue + '!important',
        },
    },
}))

function Footer() {

    const classes = useStyles();

    return (

        <FloatCard backColor={theme.palette.ashBlue}>
            <div className={classes.root}>
                <Grid container direction="row" spacing={3} justify="space-between">
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" className={classes.title} >
                            Flamingo
                        </Typography>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><WorkRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="Jobs" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><BusinessRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="Ogranizations" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><PeopleAltRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="People" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><ThumbsUpDownRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="Services" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><RateReviewRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="Reviews" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" className={classes.title} >
                            Enterprice
                        </Typography>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><BusinessCenterRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="Enterprice overview" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><HelpRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="How it works" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><MonetizationOnRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="Pricing" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><ListRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="Features" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><QuestionAnswerRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="FAQs" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><OndemandVideoRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="Request Demo" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" className={classes.title} >
                            Legal and Support
                        </Typography>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><ErrorRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="Terms of service" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><PolicyRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="Privacy policy" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon className={classes.linkIcon}><ContactSupportRoundedIcon /></ListItemIcon>
                                <ListItemText className={classes.linkText} primary="Customer Support" />
                            </ListItem>

                        </List>
                    </Grid>
                </Grid>
            </div>
        </FloatCard>

    )
}

export default Footer
