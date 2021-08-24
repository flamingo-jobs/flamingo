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
import theme from '../../Theme';
import StackList from './StackList';

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
    itemCheckBox: {
        minWidth: 'auto'
    },
    listHeader: {
        borderRadius: 8
    }
}));

export default function TechnologyList(props) {
    const classes = useStyles();
    const [openTechnologies, setOpenTechnologies] = React.useState(false);
    const [openTechList, setOpenTechList] = React.useState([]);
    const [checked, setChecked] = React.useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [stack, setStack] = useState([]);

    const handleTechnologyClick = () => {

        setOpenTechnologies(!openTechnologies);

    };

    const handleTechnologyListClick = (id) => {
        const newList = [...openTechList];

        newList[id].open = !newList[id].open;

        setOpenTechList(newList);

    };

    const updateStackData = (filterData) => {
        const newStack = [...stack];
        const currentIndex = stack.findIndex(x => x.name === filterData.name);

        const itemObj = { name: filterData.name, stack: filterData.stack, type: filterData.type };

        if (currentIndex === -1) {
            if (itemObj.stack.length !== 0) {
                newStack.push(itemObj);
            }
        } else {
            if (itemObj.stack.length === 0) {
                newStack.splice(currentIndex, 1);
            } else {
                newStack.splice(currentIndex, 1);
                newStack.push(itemObj);
            }
        }

        setStack(newStack);
    }



    useEffect(() => {
        passFilters();
        console.log(stack)
    }, [stack])

    useEffect(() => {
        retrieveTechnologies();
    }, [])

    // useEffect(() => {
    //     displayTechnologies();
    //     console.log("hola")
    // }, [technologies])

    // const handleToggle = (value, itemId) => () => {

    //     const newChecked = [...checked];
    //     const itemObj = { index: itemId, name: value };
    //     const currentIndex = checked.findIndex(x => x.index === itemId);
    //     if (currentIndex === -1) {
    //         newChecked.push(itemObj);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }

    //     setChecked(newChecked);
    // };

    const passFilters = () => {
        console.log(stack)
        let list = [];
        let completeStack = [];

        if (stack.length === 0) {
            props.onChange(0);
        } else {
            stack.map(item => {
                    list.push({ "technologyStack": { $in: item.stack } });
            })

            props.onChange(list);
        }
    }

    const retrieveTechnologies = () => {
        axios.get(`${BACKEND_URL}/technologies`).then(res => {
            if (res.data.success) {
                let subList = res.data.existingData.map(technology => {
                    return { open: false }
                });
                setOpenTechList(subList);

                setTechnologies(res.data.existingData);
            } else {
                setTechnologies(null)
            }
        })
    }

    // const displaySubTechnologies = (technology) => {
    //     let listArray = [];
    //     if (technology.stack.list) {
    //         listArray = technology.stack.list;
    //     } else {
    //         listArray = technology.stack.frontEnd.concat(technology.stack.backEnd);
    //     }
    //     return listArray.map((tech, index) => {
    //         const labelId = `category-sub-list-${tech}`;
    //         const itemId = tech;
    //         return (<ListItem className={classes.listItem} key={itemId + index} role={undefined} dense button onClick={handleToggle(tech, index)}>
    //             <ListItemIcon className={classes.itemCheckBox}>
    //                 <Checkbox
    //                     edge="start"
    //                     checked={checked.findIndex(x => x.index === itemId) !== -1}
    //                     tabIndex={-1}
    //                     disableRipple
    //                     inputProps={{ 'aria-labelledby': labelId }}
    //                     className={classes.checkBox}
    //                     style={{
    //                         color: theme.palette.vividSkyBlue,
    //                     }}
    //                 />
    //             </ListItemIcon>
    //             <ListItemText id={labelId} primary={tech} />
    //             <ListItemSecondaryAction>
    //                 <Avatar className={classes.count} variant="square" >
    //                     <Typography className={classes.countText}>{5}</Typography>
    //                 </Avatar>
    //             </ListItemSecondaryAction>
    //         </ListItem>)
    //     })
    // }

    const displayTechnologies = () => {

        if (technologies) {
            return technologies.map((technology, index) => {
                const labelId = `category-list-${technology._id}`;
                const itemId = technology._id;
                return (
                    <StackList key={itemId} technology={technology} onChange={updateStackData} />
                    // <List
                    //     component="nav"
                    //     className={classes.root}
                    //     key={itemId}
                    // >
                    //     <ListItem button onClick={(event) => handleTechnologyListClick(index)}>
                    //         <ListItemText primary={<Typography className={classes.listTitle} >{technology.name}</Typography>}></ListItemText>
                    //         {openTechList[index].open ? <ExpandLess className={classes.listDown} /> : <ExpandMore className={classes.listDown} />}
                    //     </ListItem>
                    //     <Collapse in={openTechList[index].open} timeout="auto" unmountOnExit>
                    //         <List className={classes.root}>
                    //             {displaySubTechnologies(technology)}
                    //         </List>
                    //     </Collapse>
                    // </List>
                )
            })
        } else {
            return (
                <Typography>No technology available</Typography>
            )
        }
    }
    return (
        <>
            <List
                component="nav"
                className={classes.root}
            >
                <ListItem button onClick={handleTechnologyClick} className={classes.listHeader}>
                    <ListItemText primary={<Typography className={classes.listTitle} >Technology</Typography>}></ListItemText>
                    {openTechnologies ? <ExpandLess className={classes.listDown} /> : <ExpandMore className={classes.listDown} />}
                </ListItem>
                <Collapse in={openTechnologies} timeout="auto" unmountOnExit>
                    <List className={classes.root}>
                        {displayTechnologies()}
                    </List>
                </Collapse>
            </List>

        </>
    );
}