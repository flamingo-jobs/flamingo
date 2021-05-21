import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import ThumbsUpDownRoundedIcon from '@material-ui/icons/ThumbsUpDownRounded';
import Lottie from 'react-lottie';
import Flamingo from '../lotties/flamingo.json';
import FloatCard from './FloatCard';

const useStyles = makeStyles((theme) => ({
    root: {        
        [theme.breakpoints.down('xs')]: {
            display: 'none',
            Overflow: 'hidden'
          },
    },
    card: {
        display: 'flex',
        height: '92vh',
    },
    linkIcon: {
        color: theme.palette.stateBlue,
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            minWidth: 'unset',
          },
    },
    linkText: {
        color: theme.palette.black,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 10,
            
          },
    },
    listItem: {
        marginBottom: theme.spacing(2),
        borderRadius: 12,
        "&:hover": {
            borderRadius: 12,
            color: theme.palette.white + '!important',
            backgroundColor: theme.palette.greenyLightSky + '!important',
        },
    },
    active: {
        backgroundColor: theme.palette.lightSkyBlue + '!important',
        borderRadius: 12,
        "& $linkText": {
            color: theme.palette.frenchViolet,
            fontWeight: "bold"
        }
    }

}));

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Flamingo,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className={classes.root}>
            <FloatCard>
        <div className={classes.card}>
            <CssBaseline />
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>

                    <List>
                        <ListItem button key="Home" selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><HomeRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Home" />
                        </ListItem>
                        <ListItem button key="Jobs" selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><WorkRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Jobs" />
                        </ListItem>
                        <ListItem button key="Ogranizations" selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><BusinessRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Ogranizations" />
                        </ListItem>
                        <ListItem button key="People" selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><PeopleAltRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="People" />
                        </ListItem>
                        <ListItem button key="Services" selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 5)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><ThumbsUpDownRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Services" />
                        </ListItem>
                        <ListItem button key="Contact Us" selected={selectedIndex === 6} onClick={(event) => handleListItemClick(event, 6)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><PhoneRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Contact Us" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12}>

                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                    />
                </Grid>
            </Grid>
            </div>
            </FloatCard>

        </div>
    );
}
