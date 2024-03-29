import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import ThumbsUpDownRoundedIcon from '@material-ui/icons/ThumbsUpDownRounded';
import { Link, useHistory } from 'react-router-dom'
import OfflineBoltRoundedIcon from '@material-ui/icons/OfflineBoltRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ComputerIcon from '@material-ui/icons/Computer';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import TrackChangesRoundedIcon from '@material-ui/icons/TrackChangesRounded';

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

function NavMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    var loadingPage;
    const loadingPath = window.location.pathname.split("/");
    const [defaultPage, setDefaultPage] = useState("/");
    const history = useHistory();
    if (window.location.pathname === "/") {
        loadingPage = "home";
    } else if (loadingPath.length > 2 && (loadingPath[1] === "admin" || loadingPath[1] === "jobseeker" || loadingPath[1] === "employer")) {
        loadingPage = loadingPath[2];
    } else {
        loadingPage = loadingPath[1];
    }


    useEffect(() => {
        history.listen((location) => {
            const path = location.pathname.split("/");
            if (location.pathname === "/") {
                setDefaultPage("home");
            } else if (path.length > 2 && (loadingPath[1] === "admin" || loadingPath[1] === "jobseeker" || loadingPath[1] === "employer")) {
                setDefaultPage(path[2]);
            } else {
                setDefaultPage(path[1]);
            }
        })
    }, [history]);

    useEffect(() => {
        setSelectedIndex(defaultPage);
    }, [defaultPage])

    useEffect(() => {
        setSelectedIndex(loadingPage);
    }, [])

    const [selectedIndex, setSelectedIndex] = React.useState(defaultPage);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if(props.onClose){
            props.onClose();
        }
    };

    useEffect(() => {
        displayDefaultLinks()
        displayJobSeekerLinks()
        displayAdminLinks()
        displayEmployerLinks()
    }, [props])



    const displayAdminLinks = () => {
        if (props.user === "admin") {
            return (
                <>
                    <Link to="/admin/dashboard">
                        <ListItem button key="dashboard" selected={selectedIndex === "dashboard"} onClick={(event) => handleListItemClick(event, "dashboard")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><DashboardRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Dashboard" />
                        </ListItem>
                    </Link>
                    <Link to="/admin/employers">
                        <ListItem button key="employers" selected={selectedIndex === "employers"} onClick={(event) => handleListItemClick(event, "employers")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><BusinessRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Employers" />
                        </ListItem>
                    </Link>
                    <Link to="/admin/jobSeekers">
                        <ListItem button key="jobSeekers" selected={selectedIndex === "jobSeekers"} onClick={(event) => handleListItemClick(event, "jobSeekers")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><PeopleAltRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Job Seekers" />
                        </ListItem>
                    </Link>
                    <Link to="/admin/categories">
                        <ListItem button key="categories" selected={selectedIndex === "categories"} onClick={(event) => handleListItemClick(event, "categories")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><CategoryRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Categories" />
                        </ListItem>
                    </Link>
                    <Link to="/admin/skills">
                        <ListItem button key="skills" selected={selectedIndex === "skills"} onClick={(event) => handleListItemClick(event, "skills")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><TrackChangesRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Skills" />
                        </ListItem>
                    </Link>
                    <Link to="/admin/technologies">
                        <ListItem button key="technologies" selected={selectedIndex === "technologies"} onClick={(event) => handleListItemClick(event, "technologies")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><CodeRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Technologies" />
                        </ListItem>
                    </Link>
                    <Link to="/admin/certifications">
                        <ListItem button key="certifications" selected={selectedIndex === "certifications"} onClick={(event) => handleListItemClick(event, "certifications")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><FileCopyRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Certifications" />
                        </ListItem>
                    </Link>
                    <Link to="/admin/pricing">
                        <ListItem button key="pricing" selected={selectedIndex === "pricing"} onClick={(event) => handleListItemClick(event, "pricing")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><MonetizationOnIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Pricing" />
                        </ListItem>
                    </Link>
                    
                    <Link to="/admin/settings">
                        <ListItem button key="settings" selected={selectedIndex === "settings"} onClick={(event) => handleListItemClick(event, "settings")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><SettingsRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Settings" />
                        </ListItem>
                    </Link>
                </>
            )
        }
    }

    const displayEmployerLinks = () => {
        if (props.user === "employer") {
            return (
                <>
                    <Link to="/employer/dashboard">
                        <ListItem button key="dashboard" selected={selectedIndex === "dashboard"} onClick={(event) => handleListItemClick(event, "dashboard")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><DashboardRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Dashboard" />
                        </ListItem>
                    </Link>
                    <Link to="/employer/company">
                        <ListItem button key="company" selected={selectedIndex === "company"} onClick={(event) => handleListItemClick(event, "company")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><AccountCircleIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Company" />
                        </ListItem>
                    </Link>

                    <Link to="/employer/technologies">
                        <ListItem button key="technologies" selected={selectedIndex === "technologies"} onClick={(event) => handleListItemClick(event, "technologies")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><ComputerIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Technologies" />
                        </ListItem>
                    </Link>
                    <Link to="/employer/postAJob">
                        <ListItem button key="postAJob" selected={selectedIndex === "postAJob"} onClick={(event) => handleListItemClick(event, "postAJob")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><PostAddRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Post a Job" />
                        </ListItem>
                    </Link>
                    <Link to="/employer/jobs">
                        <ListItem button key="jobs" selected={selectedIndex === "jobs"} onClick={(event) => handleListItemClick(event, "jobs")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><WorkRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Jobs" />
                        </ListItem>
                    </Link>

                    {/* <Link to="/employer/resumes">
                        <ListItem button key="jobs" selected={selectedIndex === "resumes"} onClick={(event) => handleListItemClick(event, "resumes")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><DescriptionIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Resumes" />
                        </ListItem>
                    </Link> */}

                    <Link to="/employer/billing">
                        <ListItem button key="billing" selected={selectedIndex === "billing"} onClick={(event) => handleListItemClick(event, "billing")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><MonetizationOnIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Billing" />
                        </ListItem>
                    </Link>

                    {/* <ListItem button key="contactUs" selected={selectedIndex === "contactUs"} onClick={(event) => handleListItemClick(event, "contactUs")} classes={{ selected: classes.active }} className={classes.listItem}>
                        <ListItemIcon className={classes.linkIcon}><PhoneRoundedIcon /></ListItemIcon>
                        <ListItemText className={classes.linkText} primary="Contact Us" />
                    </ListItem> */}
                    <Link to="/employer/settings">
                        <ListItem button key="settings" selected={selectedIndex === "settings"} onClick={(event) => handleListItemClick(event, "settings")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><SettingsRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Settings" />
                        </ListItem>
                    </Link>
                </>
            )
        }
    }

    const displayJobSeekerLinks = () => {
        if (props.user === "jobseeker") {
            return (
                <>
                    <Link to="/jobseeker/dashboard">
                        <ListItem button key="dashboard" selected={selectedIndex === "dashboard"} onClick={(event) => handleListItemClick(event, "dashboard")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><DashboardRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Dashboard" />
                        </ListItem>
                    </Link>
                    <Link to="/jobseeker/profile">
                        <ListItem button key="profile" selected={selectedIndex === "profile"} onClick={(event) => handleListItemClick(event, "profile")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><PeopleAltRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Profile" />
                        </ListItem>
                    </Link>
                    <Link to="/jobseeker/suggestedJobs">
                        <ListItem button key="suggestedJobs" selected={selectedIndex === "suggestedJobs"} onClick={(event) => handleListItemClick(event, "suggestedJobs")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><OfflineBoltRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Suggested Jobs" />
                        </ListItem>
                    </Link>
                    <Link to="/jobs">
                        <ListItem button key="jobs" selected={selectedIndex === "jobs"} onClick={(event) => handleListItemClick(event, "jobs")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><WorkRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Jobs" />
                        </ListItem>
                    </Link>
                    <Link to="/organizations">
                        <ListItem button key="organizations" selected={selectedIndex === "organizations"} onClick={(event) => handleListItemClick(event, "organizations")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><BusinessRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Organizations" />
                        </ListItem>
                    </Link>
                    <Link to="/people">
                        <ListItem button key="people" selected={selectedIndex === "people"} onClick={(event) => handleListItemClick(event, "people")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><PeopleAltRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="People" />
                        </ListItem>
                    </Link>
                </>
            )
        }
    }

    const displayDefaultLinks = () => {
        if (props.user === null) {
            return (
                <>
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
                        <ListItem button key="Organizations" selected={selectedIndex === "organizations"} onClick={(event) => handleListItemClick(event, "organizations")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><BusinessRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Organizations" />
                        </ListItem>
                    </Link>
                    <Link to="/people">
                        <ListItem button key="people" selected={selectedIndex === "people"} onClick={(event) => handleListItemClick(event, "people")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><PeopleAltRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="People" />
                        </ListItem>
                    </Link>
                    <Link to="/services">
                        <ListItem button key="services" selected={selectedIndex === "services"} onClick={(event) => handleListItemClick(event, "services")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><ThumbsUpDownRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Services" />
                        </ListItem>
                    </Link>
                    <Link to="/contactUs">
                        <ListItem button key="contactUs" selected={selectedIndex === "contactUs"} onClick={(event) => handleListItemClick(event, "contactUs")} classes={{ selected: classes.active }} className={classes.listItem}>
                            <ListItemIcon className={classes.linkIcon}><PhoneRoundedIcon /></ListItemIcon>
                            <ListItemText className={classes.linkText} primary="Contact Us" />
                        </ListItem>
                    </Link>
                </>
            )
        }
    }

    return (
        <List>
            {displayDefaultLinks()}
            {displayJobSeekerLinks()}
            {displayAdminLinks()}
            {displayEmployerLinks()}
        </List>
    )
}

export default NavMenu
