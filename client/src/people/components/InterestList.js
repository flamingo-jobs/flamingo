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
    },
    listHeader: {
        borderRadius: 8
    }
}));

export default function InterestList(props) {
    const classes = useStyles();
    const [openCategories, setOpenCategories] = React.useState(false);
    const [categories, setCategories] = useState([]);

    const handleCategoryClick = () => {
        setOpenCategories(!openCategories);

    };


    const [checked, setChecked] = useState([]);

    useEffect(() => {
        passFilters();
    }, [checked])

    useEffect(() => {
        retrieveCategories();
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


    const retrieveCategories = () => {
        // console.log(filters);
        axios.get(`${BACKEND_URL}/categories`).then(res => {
            if (res.data.success) {
                setCategories(res.data.existingData)
            } else {
                setCategories(null)
            }
        })
    }
    
    const displayCategories = () => {

        if (categories) {
            return categories.map(category => {
                const labelId = `category-list-${category._id}`;
                const itemId = category._id;
                return (
                    <ListItem className={classes.listItem} key={itemId} role={undefined} dense button onClick={handleToggle(category.name, itemId)}>
                        <ListItemIcon className={classes.itemCheckBox}>
                            <Checkbox
                                edge="start"
                                checked={checked.findIndex(x => x.index === itemId) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                className={classes.checkBox}
                                style ={{
                                    color: theme.palette.vividSkyBlue,
                                  }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={category.name} />
                        {/* <ListItemSecondaryAction>
                            <Avatar className={classes.count} variant="square" >
                                <Typography className={classes.countText}>{category.count}</Typography>
                            </Avatar>
                        </ListItemSecondaryAction> */}
                    </ListItem>
                )
            })
        } else {
            return (
                <Typography>No areas available</Typography>
            )
        }
    }

    return (
        <>
            <List
                component="nav"
                className={classes.root}
            >
                <ListItem button onClick={handleCategoryClick} className={classes.listHeader}>
                    <ListItemText primary={<Typography className={classes.listTitle} >Interested Areas</Typography>}></ListItemText>
                    {openCategories ? <ExpandLess className={classes.listDown} /> : <ExpandMore className={classes.listDown} />}
                </ListItem>
                <Collapse in={openCategories} timeout="auto" unmountOnExit>
                    <List className={classes.root}>
                        {displayCategories()}
                    </List>
                </Collapse>
            </List>

        </>
    );
}