import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Avatar, Checkbox, ListItemSecondaryAction, Typography } from '@material-ui/core';
import BACKEND_URL from '../../Config';
import axios from 'axios';
import theme from '../../Theme';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        marginBottom: 8,
        backgroundColor: theme.palette.background.paper,
    },
    sub: {
        width: '100%',
        maxWidth: 360,
        paddingTop: 3,
        paddingBottom: 3,
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
        color: theme.palette.blueJeans,
        fontWeight: 500
    },
    listDown: {
        color: theme.palette.blueJeans,
    },
    checkBox: {
        color: theme.palette.pinkyRed,
        fill: theme.palette.pinkyRed
    },
    itemCheckBox: {
        minWidth: 'auto'
    },
    listHeader: {
        borderRadius: 8
    }
}));

export default function StackList(props) {

    const classes = useStyles();
    const [openStack, setOpenStack] = React.useState(false);
    const [stack, setStack] = useState(props.technology.stack);

    const handleTechnologyClick = () => {
        setOpenStack(!openStack);

    };


    const [checked, setChecked] = useState([]);

    useEffect(() => {
        passFilters();
    }, [checked])

    // useEffect(() => {
    //     retrieveStack();
    // }, [])

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
        if (checked.length === 0) {
            props.onChange({ name: props.technology.name, stack: [], type: null});
        } else {
            checked.map((value) => values.push(value.name));
            if (stack.list) {
                props.onChange({ name: props.technology.name, stack: values, type: "list" });
            } else{
                props.onChange({ name: props.technology.name, stack: values, type: "dual" });
            }

        }


    }

    const displayStack = () => {

        if (stack) {
            let listArray = [];
            if (stack.list) {
                listArray = stack.list;
            } else {
                listArray = stack.frontEnd.concat(stack.backEnd);
            }
            return listArray.map(item => {
                const labelId = `category-list-${item}`;
                const itemId = item;
                return (
                    <ListItem className={classes.listItem} key={itemId} role={undefined} dense button onClick={handleToggle(item, itemId)}>
                        <ListItemIcon className={classes.itemCheckBox}>
                            <Checkbox
                                edge="start"
                                checked={checked.findIndex(x => x.index === itemId) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                className={classes.checkBox}
                                style={{
                                    color: theme.palette.vividSkyBlue,
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={item} />
                        {/* <ListItemSecondaryAction>
                            <Avatar className={classes.count} variant="square" >
                                <Typography className={classes.countText}>5</Typography>
                            </Avatar>
                        </ListItemSecondaryAction> */}
                    </ListItem>
                )
            })
        } else {
            return (
                <Typography>No technologies available</Typography>
            )
        }
    }

    return (
        <>
            <List
                component="nav"
                className={classes.sub}
            >
                <ListItem button onClick={handleTechnologyClick} className={classes.listHeader}>
                    <ListItemText primary={<Typography className={classes.listTitle} >{props.technology.name}</Typography>}></ListItemText>
                    {openStack ? <ExpandLess className={classes.listDown} /> : <ExpandMore className={classes.listDown} />}
                </ListItem>
                <Collapse in={openStack} timeout="auto" unmountOnExit>
                    <List className={classes.sub}>
                        {displayStack()}
                    </List>
                </Collapse>
            </List>

        </>
    );
}