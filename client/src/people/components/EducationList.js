import { Checkbox, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

export default function EducationList(props) {
    const classes = useStyles();
    const [openEducationLevels, setOpenEducationLevels] = useState(false);
    const [educationLevels, setEducationLevels] = useState([
        { id: 1, name: "School" },
        { id: 2, name: "Diploma" },
        { id: 3, name: "Graduate Diploma" },
        { id: 4, name: "Bachelor's" },
        { id: 5, name: "Bachelor's Honours" },
        { id: 6, name: "Masters" },
        { id: 7, name: "M.Phil." },
        { id: 8, name: "PhD" }
    ]);

    const handleOrgClick = () => {
        setOpenEducationLevels(!openEducationLevels);

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
        if (checked.length === 0) {
            props.onChange(0);
        } else {
            checked.map((value) => values.push(value.name));
            props.onChange({ $in: values });
        }


    }

    const displayEducationLevels = () => {

        if (educationLevels) {
            return educationLevels.map(level => {
                const labelId = `category-list-${level.id}`;
                const itemId = level.id;
                return (
                    <ListItem className={classes.listItem} key={itemId} role={undefined} dense button onClick={handleToggle(level.name, itemId)}>
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
                        <ListItemText id={labelId} primary={level.name} />
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
                <Typography>No education levels available</Typography>
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
                    <ListItemText primary={<Typography className={classes.listTitle} >Education Levels</Typography>}></ListItemText>
                    {openEducationLevels ? <ExpandLess className={classes.listDown} /> : <ExpandMore className={classes.listDown} />}
                </ListItem>
                <Collapse in={openEducationLevels} timeout="auto" unmountOnExit>
                    <List className={classes.root}>
                        {displayEducationLevels()}
                    </List>
                </Collapse>
            </List>

        </>
    );
}