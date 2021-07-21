import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Avatar, Checkbox, ListItemSecondaryAction, Typography } from '@material-ui/core';
import axios from 'axios';
import BACKEND_URL from '../../Config';
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

export default function OrganizationList(props) {
    const classes = useStyles();

    const queryParams = new URLSearchParams(window.location.search);
    const org = queryParams.get('org');

    const [openOrganizations, setOpenOrganizations] = useState(org ? true : false);
    const [organizations, setOrganizations] = useState([]);

    const handleOrgClick = () => {
        setOpenOrganizations(!openOrganizations);

    };

    const [checked, setChecked] = useState([]);

    useEffect(() => {
        passFilters();
    }, [checked])

    useEffect(() => {
        retrieveOrganizations();
    }, [])

    useEffect(() => {
        if (org && organizations.length > 0) {
            const newChecked = [...checked];
            let itemId = organizations[organizations.findIndex(x => x.name === org)]._id;
            const itemObj = { index: itemId, name: org };
            newChecked.push(itemObj);
            setChecked(newChecked);
        }
    }, [organizations]);

    const handleToggle = (value, itemId) => () => {

        const newChecked = [...checked];
        const itemObj = { index: itemId, name: value };
        const currentIndex = checked.findIndex(x => x.index === itemId);

        if (currentIndex === -1) {
            newChecked.push(itemObj);
        } else {
            newChecked.splice(currentIndex, 1);
            if(itemObj.name === org){
                let stateObj = { id: "100" };
            window.history.replaceState(stateObj,
                "Page 3", "/jobs");
            }
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

    const retrieveOrganizations = () => {
        axios.get(`${BACKEND_URL}/employers`).then(res => {
            if (res.data.success) {
                setOrganizations(res.data.existingData)
            } else {
                setOrganizations(null)
            }
        })
    }

    const displayOrganizations = () => {

        if (organizations) {
            return organizations.map(org => {
                const labelId = `category-list-${org._id}`;
                const itemId = org._id;
                return (
                    <ListItem className={classes.listItem} key={itemId} role={undefined} dense button onClick={handleToggle(org.name, itemId)}>
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
                        <ListItemText id={labelId} primary={org.name} />
                        {/* <ListItemSecondaryAction>
                            <Avatar className={classes.count} variant="square" >
                                <Typography className={classes.countText}>{5}</Typography>
                            </Avatar>
                        </ListItemSecondaryAction> */}
                    </ListItem>
                )
            })
        } else {
            return (
                <Typography>No organization available</Typography>
            )
        }
    }

    return (
        <>
            <List
                component="nav"
                className={classes.root}
            >
                <ListItem button onClick={handleOrgClick} className={classes.listHeader}>
                    <ListItemText primary={<Typography className={classes.listTitle} >Organizations</Typography>}></ListItemText>
                    {openOrganizations ? <ExpandLess className={classes.listDown} /> : <ExpandMore className={classes.listDown} />}
                </ListItem>
                <Collapse in={openOrganizations} timeout="auto" unmountOnExit>
                    <List className={classes.root}>
                        {displayOrganizations()}
                    </List>
                </Collapse>
            </List>

        </>
    );
}