import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ClearAllRoundedIcon from '@material-ui/icons/ClearAllRounded';
// material
import {
    Box,
    List,
    Menu,
    Badge,
    Button,
    Avatar,
    Tooltip,
    Divider,
    ListItem,
    IconButton,
    Typography,
    ListItemText,
    ListSubheader,
    ListItemAvatar,
    Backdrop,
    makeStyles,
    Grid
} from '@material-ui/core';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
// ----------------------------------------------------------------------

const NOTIFICATIONS = [
    {
        id: 1,
        title: 'Your application is submitted',
        description: 'waiting for employer to review',
        avatar: null,
        type: 'job_applied',
        createdAt: "2019 July 25",
        isUnRead: true
    },
    {
        id: 2,
        title: "You have new recommended jobs",
        description: 'click here to see them',
        avatar: null,
        type: 'job_alert',
        createdAt: "2019 July 25",
        isUnRead: true
    },
    {
        id: 3,
        title: '3 saved jobs are about to due',
        description: 'apply before you miss them',
        avatar: null,
        type: 'saved_jobs',
        createdAt: "2019 July 25",
        isUnRead: false
    },
    {
        id: 4,
        title: 'Congratulations! You\'ve been shortlisted',
        description: 'for Software Engineer - Intern at WSO2',
        avatar: null,
        type: 'shortlisted',
        createdAt: "2019 July 25",
        isUnRead: false
    }
];

const useStyles = makeStyles(() => ({

}))

function renderContent(notification) {
    const title = (
        <Typography variant="subtitle2">
            {notification.title}
            <Typography component="span" variant="body2" style={{ color: '#6D6D6D' }}>
                &nbsp; {notification.description}
            </Typography>
        </Typography>
    );

    if (notification.type === 'job_applied') {
        return {
            avatar: <img alt={notification.title} src={require(`./images/notifications/job_applied.svg`).default} style={{ width: 'inherit' }} />,
            title
        };
    }
    if (notification.type === 'job_alert') {
        return {
            avatar: <img alt={notification.title} src={require(`./images/notifications/job_alert.png`).default} style={{ width: 'inherit' }} />,
            title
        };
    }
    if (notification.type === 'saved_jobs') {
        return {
            avatar: <img alt={notification.title} src={require(`./images/notifications/saved_jobs.png`).default} style={{ width: 'inherit' }} />,
            title
        };
    }
    if (notification.type === 'shortlisted') {
        return {
            avatar: <img alt={notification.title} src={require(`./images/notifications/shortlisted.png`).default} style={{ width: 'inherit' }} />,
            title
        };
    }
    return {
        avatar: <img alt={notification.title} src={require(`./images/notifications/job_applied.svg`).default} style={{ width: 'inherit' }} />,
        title
    };
}

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired
};

function NotificationItem({ notification }) {
    const { avatar, title } = renderContent(notification);

    return (
        <ListItem
            button
            to="#"
            disableGutters
            component={RouterLink}
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(notification.isUnRead && {
                    bgcolor: 'action.selected'
                })
            }}
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <Typography
                        variant="caption"
                        style={{
                            mt: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            color: '#6D6D6D'
                        }}
                    >
                        <WatchLaterRoundedIcon style={{width: 18, marginRight: 5}}/>
                        30 mins ago
                    </Typography>
                }
            />
        </ListItem>
    );
}

export default function NotificationsPopover(props) {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;
    const classes = useStyles();

    // useEffect(() => {
    //     if (props.open == true) {
    //         handleOpen();
    //     }
    // }, [props])

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const handleMarkAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                isUnRead: false
            }))
        );
    };

    return (
        <>
            <Grid container spacing={3} style={{ marginBottom: 10 }}>
                <Grid item xs={10}>
                    <Typography variant="h6">Notifications</Typography>
                    <Typography variant="body2" style={{ color: '#6D6D6D' }}>
                        You have {totalUnRead} unread messages
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Tooltip title=" Mark all as read">
                        <IconButton color="primary" onClick={handleMarkAllAsRead}>
                            <ClearAllRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>


            <Divider />


            <List
                disablePadding
            >
                {notifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                ))}
            </List>

            <Divider />

            <Grid container spacing={3} style={{ marginTop: 8 }} direction="column"
  justify="center"
  alignItems="center">
                <Grid item xs={12}>
                    <Button disableRipple component={RouterLink} to="#">
                        View All
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
