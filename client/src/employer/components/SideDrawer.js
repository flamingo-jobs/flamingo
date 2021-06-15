import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Lottie from 'react-lottie';
import WorkImage from '../lotties/work.json';
import Flamingo from '../lotties/flamingo.json';
import FloatCard from './FloatCard';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import EmailIcon from '@material-ui/icons/Email';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import BusinessIcon from '@material-ui/icons/Business';
import DashboardIcon from '@material-ui/icons/Dashboard';



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
        marginBottom: theme.spacing(1),
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
    },
    animation: {
        // paddingTop: 2,
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
                        <ListItem button key="Company" selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><BusinessIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Company" />
                        </ListItem>
                        <ListItem button key="Dashboard" selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 1)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><DashboardIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Dashboard" />
                        </ListItem>
                        <ListItem button key="Jobs" selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 2)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><WorkIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Jobs" />
                        </ListItem>
                        <ListItem button key="Analytics" selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 3)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><AssessmentIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Analytics" />
                        </ListItem>
                        <ListItem button key="Inbox" selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 4)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><EmailIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Inbox" />
                        </ListItem>
                        <ListItem button key="Resumes" selected={selectedIndex === 6} onClick={(event) => handleListItemClick(event, 4)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><InsertDriveFileIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Resumes" />
                        </ListItem>
                        <ListItem button key="Billing" selected={selectedIndex === 7} onClick={(event) => handleListItemClick(event, 4)} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><MonetizationOnIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Billing" />
                        </ListItem>
                       
                    </List>
                </Grid>
                <Grid item xs={12}>

                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                        style={{marginTop:-50}}
                    />
                </Grid>
            </Grid>
            </div>
            </FloatCard>

        </div>
    );
}
