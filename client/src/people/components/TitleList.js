import {React, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { Avatar, Checkbox, IconButton, ListItemSecondaryAction, Typography } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import theme from '../../Theme';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    count: {
        borderRadius: 5,
        width: 25,
        height: 25,
        backgroundColor: theme.palette.lightSkyBlue
    },
    countText: {
        fontSize: 11,
        color: theme.palette.tuftsBlue,
        fontWeight: 500
    },
    listItem: {
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 8
    },
    listTitle: {
        color: theme.palette.tuftsBlue,
        fontWeight: 700
    },
    listDown: {
        color: theme.palette.tuftsBlue,
    },
    checkBox: {
        color: theme.palette.tuftsBlue,
        fill: theme.palette.tuftsBlue,
        '&:checked': {
            color: theme.palette.blueJeans,
            fill: theme.palette.tuftsBlue,
        }
    },
    itemCheckBox: {
        minWidth: 'auto'
    }
}));

export default function TitileList(props) {
    const classes = useStyles();
    const [openTitles, setOpenTitles] = useState(true);

    const handleTitleClick = () => {
        setOpenTitles(!openTitles);

    };


    const [checked, setChecked] = useState([]);

    useEffect(() => {
        passFilters();
    }, [checked])

    const handleToggle = (value, itemId) => () => {

        const newChecked = [...checked];
        const itemObj = { index: itemId, name: value };
        const currentIndex = checked.findIndex(x => x.index === itemId);

        if (currentIndex === -1) {
            newChecked.push(itemObj);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);


    };

    const passFilters = () => {
        let values = [];
        if (checked.length == 0) {
            props.onChange(0);
        } else {
            checked.map((value) => values.push(value.name));
            props.onChange({ $in: values });
        }


    }

    return (
        <>

            <List
                component="nav"
                className={classes.root}
            >
                <ListItem button onClick={handleTitleClick}>
                    <ListItemText primary={<Typography className={classes.listTitle} >Job Title</Typography>}></ListItemText>
                    {openTitles ? <ExpandLess className={classes.listDown} /> : <ExpandMore className={classes.listDown} />}
                </ListItem>
                <Collapse in={openTitles} timeout="auto" unmountOnExit>
                    <List className={classes.root}>
                        {[{ id: 1, name: "Software Engineer", count: 25 }, { id: 2, name: "Business Analyst", count: 145 }, { id: 3, name: "DevOps Engineer", count: 15 }, { id: 4, name: "Network Engineer", count: 34 }].map((value) => {
                            const labelId = `category-list-${value.id}`;
                            const itemId = value.id + 2000;
                            return (
                                <ListItem className={classes.listItem} key={itemId} role={undefined} dense button onClick={handleToggle(value.name, itemId)}>
                                    <ListItemIcon className={classes.itemCheckBox}>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.findIndex(x => x.index === itemId) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                            className={classes.checkBox}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.name} />
                                    <ListItemSecondaryAction>
                                        <Avatar className={classes.count} variant="square" >
                                            <Typography className={classes.countText}>{value.count}</Typography>
                                        </Avatar>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </Collapse>
            </List>
        </>
    );
}