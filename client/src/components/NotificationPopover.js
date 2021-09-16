import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ClearAllRoundedIcon from '@material-ui/icons/ClearAllRounded';
import axios from 'axios';
import BACKEND_URL from '../Config'
import ReactTimeAgo from 'react-time-ago';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
// material
import {
    List,
    Button,
    Avatar,
    Tooltip,
    Divider,
    ListItem,
    IconButton,
    Typography,
    ListItemText,
    ListItemAvatar,
    makeStyles,
    Grid
} from '@material-ui/core';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import Loading from './Loading';
import { setNewNotifications } from '../redux/actions';
import { useDispatch } from 'react-redux';
// ----------------------------------------------------------------------

const NOTIFICATIONS = [
    {
        id: 1,
        title: 'Your application is submitted',
        description: 'waiting for employer to review',
        link: null,
        type: 'job_applied',
        createdAt: "2019 July 25",
        isUnRead: true
    },
    {
        id: 2,
        title: "You have new suggested jobs",
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

const useStyles = makeStyles((theme) => ({
    loading: {
        minWidth: 500,
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down("sm")]: {
            minWidth: 310,
        },
    },
    unRead: {
        backgroundColor: theme.palette.lightSkyBlueHover,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        maxWidth: 500
    },
    read: {
        backgroundColor: theme.palette.white,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        maxWidth: 500
    }
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
    if (notification.type === 'update') {
        return {
            avatar: <img alt={notification.title} src={require(`./images/notifications/update.png`).default} style={{ width: 'inherit' }} />,
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

function NotificationItem({ notification, onClose }) {
    const { avatar, title } = renderContent(notification);
    const classes = useStyles();

    return (
        <ListItem
            button
            to={notification.link}
            disableGutters
            component={RouterLink}
            className={notification.isUnRead ? classes.unRead : classes.read}
            onClick={onClose}
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
                        <WatchLaterRoundedIcon style={{ width: 18, marginRight: 5 }} />
                        <ReactTimeAgo date={notification.createdAt} locale="en-US" />
                    </Typography>
                }
            />
        </ListItem>
    );
}

export default function NotificationsPopover(props) {
    const [notifications, setNotifications] = useState("empty");
    const [totalUnRead, setTotalUnRead] = useState(props.count);
    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        if (props.open) {
            retrieveNotifications();
        } else {
            setNotifications("empty");
        }
    }, [props.open]);

    useEffect(() => {
        displayNotifications();
    }, [notifications]);


    const deleteAll = async () => {
        await axios.post(`${BACKEND_URL}/${props.userRole}/deleteNotifications/${props.loginId}`).then((res) => {
            if (res.data.success) {
                setTotalUnRead(0);
                dispatch(setNewNotifications(0));
                setNotifications([]);
            }
        });
    }

    const handleMarkAllAsRead = async () => {
        let read = notifications.map((notification) => ({
            ...notification,
            isUnRead: false
        }))
        setNotifications(
            read
        );

        await axios.post(`${BACKEND_URL}/${props.userRole}/markNotifications/${props.loginId}`, read).then((res) => {
            if (res.data.success) {
                setTotalUnRead(0);
                dispatch(setNewNotifications(0));
            }
        });

    };

    const retrieveNotifications = () => {
        if (props.userRole) {
            axios.get(`${BACKEND_URL}/${props.userRole}/getNotifications/${props.loginId}`).then((res) => {

                if (res.data.success) {
                    setNotifications(res.data.existingData.sort((a, b) => {
                        return new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ? 1 : -1;
                    }));

                    if (res.data.existingData && res.data.existingData.length > 0) {
                        let unread = res.data.existingData.filter((item) => item.isUnRead === true).length;
                        setTotalUnRead(unread);
                        dispatch(setNewNotifications(unread));
                    }
                } else {
                    setNotifications("empty");
                }
            });
        }

    }

    const displayNotifications = () => {
        if (notifications !== "empty" && notifications.length > 0) {
            return notifications.map((notification, index) => (
                <NotificationItem key={index} notification={notification} onClose={props.onClose} />
            ))
        }
    }

    return (
        <>
            <Grid container spacing={3} style={{ marginBottom: 10 }} justify="space-between">
                <Grid item xs={8} md={8}>
                    <Typography variant="h6">Notifications</Typography>
                    <Typography variant="body2" style={{ color: '#6D6D6D' }}>
                        You have {totalUnRead} unread notifications
                    </Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                    {notifications !== "empty" && notifications.length > 0 ?
                        <Tooltip title=" Delete all">
                            <IconButton color="secondary" onClick={deleteAll}>
                                <DeleteRoundedIcon />
                            </IconButton>
                        </Tooltip>
                        : null}
                </Grid>
                {notifications !== "empty" && totalUnRead > 0 ? 
                <Grid item xs={2} md={2}>

                    <Tooltip title=" Mark all as read">
                        <IconButton color="primary" onClick={handleMarkAllAsRead}>
                            <ClearAllRoundedIcon />
                        </IconButton>
                    </Tooltip>

                </Grid> : null}
            </Grid>
            {notifications !== "empty" && notifications.length > 0 ?
                <>
                    <Divider style={{ marginBottom: 8 }} />
                    <List
                        disablePadding
                    >
                        {displayNotifications()}
                    </List>
                </>
                : null}
            {notifications === "empty" ? <>
                <Divider />
                <div className={classes.loading}>
                    <Avatar className={classes.loadingImage} src={require('./images/loadingImage.gif').default} />
                </div>
            </> : null}
        </>
    );
}
