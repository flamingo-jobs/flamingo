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
import Flamingo from './lotties/flamingo.json';
import FloatCard from './FloatCard';
import { Link } from 'react-router-dom'
import { Route, BrowserRouter } from "react-router-dom";

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
            backgroundColor: theme.palette.lightSkyBlueHover + '!important',
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
    var defaultPage;
    const path = window.location.pathname.split("/");
    console.log(path);
    console.log(path.length);
    if(path.length==1){
        defaultPage = "home";
    } else if(path.length==2 && path[1]=="admin"){
        defaultPage = "dashboard";
    } else if(path.length>2 && path[1]=="admin"){
        defaultPage = path[2];
    } else {
        defaultPage = path[1];
    }
console.log(defaultPage);
    const [selectedIndex, setSelectedIndex] = React.useState(defaultPage);

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
                                {/* <Route path="(/admin|/admin/categories)" exact>
                                    <Link to="/admin">
                                        <ListItem button key="dashboard" selected={selectedIndex === "dashboard"} onClick={(event) => handleListItemClick(event, "dashboard")} classes={{ selected: classes.active }} className={classes.listItem}>
                                            <ListItemIcon className={classes.linkIcon}><HomeRoundedIcon /></ListItemIcon>
                                            <ListItemText className={classes.linkText} primary="Dashboard" />
                                        </ListItem>
                                    </Link>
                                    <Link to="/admin">
                                        <ListItem button key="employers" selected={selectedIndex === "employers"} onClick={(event) => handleListItemClick(event, "employers")} classes={{ selected: classes.active }} className={classes.listItem}>
                                            <ListItemIcon className={classes.linkIcon}><HomeRoundedIcon /></ListItemIcon>
                                            <ListItemText className={classes.linkText} primary="Employers" />
                                        </ListItem>
                                    </Link>
                                    <Link to="/admin">
                                        <ListItem button key="jobSeekers" selected={selectedIndex === "jobSeekers"} onClick={(event) => handleListItemClick(event, "jobSeekers")} classes={{ selected: classes.active }} className={classes.listItem}>
                                            <ListItemIcon className={classes.linkIcon}><HomeRoundedIcon /></ListItemIcon>
                                            <ListItemText className={classes.linkText} primary="Job Seekers" />
                                        </ListItem>
                                    </Link>
                                    <Link to="/admin">
                                        <ListItem button key="categories" selected={selectedIndex == "categories"} onClick={(event) => handleListItemClick(event, "categories")} classes={{ selected: classes.active }} className={classes.listItem}>
                                            <ListItemIcon className={classes.linkIcon}><HomeRoundedIcon /></ListItemIcon>
                                            <ListItemText className={classes.linkText} primary="Categories" />
                                        </ListItem>
                                    </Link>
                                </Route> */}

                                <Link to="/">
                                    <ListItem button key="Home" selected={selectedIndex === "home"} onClick={(event) => handleListItemClick(event, "home")} classes={{ selected: classes.active }} className={classes.listItem}>
                                        <ListItemIcon className={classes.linkIcon}><HomeRoundedIcon /></ListItemIcon>
                                        <ListItemText className={classes.linkText} primary="Home" />
                                    </ListItem>
                                </Link>
                                <Link to="/jobs">
                                    <ListItem button key="Jobs" selected={selectedIndex === "jobs"} onClick={(event) => handleListItemClick(event, "jobs")} classes={{ selected: classes.active }} className={classes.listItem}>
                                        <ListItemIcon className={classes.linkIcon}><WorkRoundedIcon /></ListItemIcon>
                                        <ListItemText className={classes.linkText} primary="Jobs" />
                                    </ListItem>
                                </Link>
                                <Link to="/organizations">
                                    <ListItem button key="Ogranizations" selected={selectedIndex === "organizations"} onClick={(event) => handleListItemClick(event, "organizations")} classes={{ selected: classes.active }} className={classes.listItem}>
                                        <ListItemIcon className={classes.linkIcon}><BusinessRoundedIcon /></ListItemIcon>
                                        <ListItemText className={classes.linkText} primary="Ogranizations" />
                                    </ListItem>
                                </Link>
                                <Link to="/people">
                                    <ListItem button key="People" selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)} classes={{ selected: classes.active }} className={classes.listItem}>
                                        <ListItemIcon className={classes.linkIcon}><PeopleAltRoundedIcon /></ListItemIcon>
                                        <ListItemText className={classes.linkText} primary="People" />
                                    </ListItem>
                                </Link>
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
