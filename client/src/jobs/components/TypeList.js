import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
        color: theme.palette.pinkyRed,
        fill: theme.palette.pinkyRed
    },
    itemCheckBox: {
        minWidth: 'auto'
    }
}));

export default function TypeList(props) {
    const classes = useStyles();
    const [openTypes, setOpenTypes] = React.useState(true);

    const handleTypeClick = () => {
        setOpenTypes(!openTypes);

    };


    const [checked, setChecked] = React.useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        passFilters();
    }, [checked])

    useEffect(() => {
        retrieveTypes();
    }, [])
    
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

    const retrieveTypes = () => {
        // console.log(filters);s
        axios.get(`${BACKEND_URL}/types`).then(res => {
            if (res.data.success) {
                setTypes(res.data.existingTypes)
            } else {
                setTypes(null)
            }
        })
    }
    
    const displayTypes = () => {

        if (types) {
            return types.map(type => {
                const labelId = `category-list-${type._id}`;
                const itemId = type._id;
                return (
                    <ListItem className={classes.listItem} key={itemId} role={undefined} dense button onClick={handleToggle(type.name, itemId)}>
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
                        <ListItemText id={labelId} primary={type.name} />
                        <ListItemSecondaryAction>
                            <Avatar className={classes.count} variant="square" >
                                <Typography className={classes.countText}>{5}</Typography>
                            </Avatar>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })
        } else {
            return (
                <Typography>No type available</Typography>
            )
        }
    }

    return (
        <>
            <List
                component="nav"
                className={classes.root}
            >
                <ListItem button onClick={handleTypeClick}>
                    <ListItemText primary={<Typography className={classes.listTitle} >Type</Typography>}></ListItemText>
                    {openTypes ? <ExpandLess className={classes.listDown} /> : <ExpandMore className={classes.listDown} />}
                </ListItem>
                <Collapse in={openTypes} timeout="auto" unmountOnExit>
                    <List className={classes.root}>
                        {displayTypes()}
                    </List>
                </Collapse>
            </List>

        </>
    );
}