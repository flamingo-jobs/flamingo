import { Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BACKEND_URL from '../../Config';
import CertificatesList from './CertificateList';

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

export default function CertificationList(props) {
    const classes = useStyles();
    const [openCertifications, setOpenCertifications] = React.useState(false);
    const [openTechList, setOpenTechList] = React.useState([]);
    const [checked, setChecked] = React.useState([]);
    const [certifications, setCertifications] = useState([]);
    const [certificates, setCertificates] = useState([]);

    const handleCertificationClick = () => {

        setOpenCertifications(!openCertifications);

    };

    const handleCertificationListClick = (id) => {
        const newList = [...openTechList];

        newList[id].open = !newList[id].open;

        setOpenTechList(newList);

    };

    const updateCertificatesData = (filterData) => {
        const newCertificates = [...certificates];
        const currentIndex = certificates.findIndex(x => x.issuer === filterData.issuer);

        const itemObj = { issuer: filterData.issuer, certificates: filterData.certificates };

        if (currentIndex === -1) {
            if (itemObj.certificates.length !== 0) {
                newCertificates.push(itemObj);
            }
        } else {
            if (itemObj.certificates.length === 0) {
                newCertificates.splice(currentIndex, 1);
            } else {
                newCertificates.splice(currentIndex, 1);
                newCertificates.push(itemObj);
            }
        }

        setCertificates(newCertificates);
    }



    useEffect(() => {
        passFilters();
        console.log(certificates)
    }, [certificates])

    useEffect(() => {
        retrieveCertifications();
    }, [])

    // useEffect(() => {
    //     displayCertifications();
    //     console.log("hola")
    // }, [certifications])

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
        console.log(certificates)
        let list = [];
        let completeCertificates = [];

        if (certificates.length === 0) {
            props.onChange(0);
        } else {
            props.onChange({ $in: Array.prototype.concat.apply([], certificates.map(x => x.certificates)) });
        }
    }

    const retrieveCertifications = () => {
        axios.get(`${BACKEND_URL}/certifications`).then(res => {
            if (res.data.success) {
                let subList = res.data.existingData.map(certification => {
                    return { open: false }
                });
                setOpenTechList(subList);

                setCertifications(res.data.existingData);
            } else {
                setCertifications(null)
            }
        })
    }

    // const displaySubCertifications = (certification) => {
    //     let listArray = [];
    //     if (certification.certificates.list) {
    //         listArray = certification.certificates.list;
    //     } else {
    //         listArray = certification.certificates.frontEnd.concat(certification.certificates.backEnd);
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

    const displayCertifications = () => {

        if (certifications) {
            return certifications.map((certification, index) => {
                const labelId = `category-list-${certification._id}`;
                const itemId = certification._id;
                return (
                    <CertificatesList key={itemId} certification={certification} onChange={updateCertificatesData} />
                    // <List
                    //     component="nav"
                    //     className={classes.root}
                    //     key={itemId}
                    // >
                    //     <ListItem button onClick={(event) => handleCertificationListClick(index)}>
                    //         <ListItemText primary={<Typography className={classes.listTitle} >{certification.name}</Typography>}></ListItemText>
                    //         {openTechList[index].open ? <ExpandLess className={classes.listDown} /> : <ExpandMore className={classes.listDown} />}
                    //     </ListItem>
                    //     <Collapse in={openTechList[index].open} timeout="auto" unmountOnExit>
                    //         <List className={classes.root}>
                    //             {displaySubCertifications(certification)}
                    //         </List>
                    //     </Collapse>
                    // </List>
                )
            })
        } else {
            return (
                <Typography>No certification available</Typography>
            )
        }
    }
    return (
        <>
            <List
                component="nav"
                className={classes.root}
            >
                <ListItem button onClick={handleCertificationClick} className={classes.listHeader}>
                    <ListItemText primary={<Typography className={classes.listTitle} >Certification</Typography>}></ListItemText>
                    {openCertifications ? <ExpandLess className={classes.listDown} /> : <ExpandMore className={classes.listDown} />}
                </ListItem>
                <Collapse in={openCertifications} timeout="auto" unmountOnExit>
                    <List className={classes.root}>
                        {displayCertifications()}
                    </List>
                </Collapse>
            </List>

        </>
    );
}