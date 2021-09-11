import { Checkbox, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FloatCard from '../../components/FloatCard';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from '../../Config';
import theme from '../../Theme';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        columns: '2 auto'
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

export default function InterestArea(props) {
    const classes = useStyles();
    const [fetchedData, setFetchedData] = useState(false);
    const [openCategories, setOpenCategories] = React.useState(false);
    const [categories, setCategories] = useState([]);
    const [interests, setInterests] = useState(null);
    const [checked, setChecked] = useState([1]);
    const [alertShow, setAlertShow] = React.useState(false);
    const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

    let loginId;
    let login = false;
    const jwt = require("jsonwebtoken");
    const token = sessionStorage.getItem("userToken");
    const header = jwt.decode(token, { complete: true });
    if(token === null){
        loginId=props.jobseekerID;
    }else if (header.payload.userRole === "jobseeker") {
        login = true;
        loginId=sessionStorage.getItem("loginId");
    } else {
        loginId=props.jobseekerID;
    }

    // Alert stuff
    const displayAlert = () => {
        return (
          <SnackBarAlert
            open={alertShow}
            onClose={handleAlertClose}
            severity={alertData.severity}
            msg={alertData.msg}
          />
        );
    };
    
    const handleAlert = () => {
    setAlertShow(true);
    };

    const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setAlertShow(false);
    };

    const handleCategoryClick = () => {
        setOpenCategories(!openCategories);
    };

    const retrieveCategories = () => {
        // console.log(filters);
        axios.get(`${BACKEND_URL}/categories`).then(res => {
            if (res.data.success) {
                setCategories(res.data.existingData)
            } else {
                setCategories(null)
            }
        });
    }

    const retrieveInterests = () => {
        
        axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
        .then(res => {
        if(res.data.success){
            setInterests(res.data.jobseeker.interests)
        }
        })
        // console.log(interests)
      //  setCheckedItems();
    }

    useEffect(() => {
        retrieveCategories();
    }, [])

    useEffect(() => {
        retrieveInterests();
    }, [])

    useEffect(() => {
        setCheckedItems();
    }, [interests])

    const handleToggle = (value, itemId) => () => {
        let currentIndex = 0;
        const itemObj = { index: itemId, name: value };
        checked?.forEach(element => {
            if(element.name === value){
                currentIndex = 1;
            }
        });

        if (currentIndex === 0) {
            checked.push(itemObj);
        } else {
            checked.splice(currentIndex, 1);
        }
        let interestSet=[];
        checked?.forEach(interest => {
            interestSet.push(interest.name);
        });

        const data = {
            interests: interestSet,
        }
        
        axios.put(`${BACKEND_URL}/jobseeker/update/${loginId}`,data)
        .then(res => {
            if(!res.data.success){
                setAlertData({
                severity: "error",
                msg: "Interests could not be updated!",
                });
                handleAlert();
                axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
            }
        });
    };

    const setCheckedItems = () => {
        categories?.forEach(category => {
            let index = interests.includes(category.name);
            if(index){
                const itemObj = { index: category._id, name: category.name };
                setChecked(itemObj);
                // console.log(itemObj)
            }
        });
        setFetchedData(true);
    }
    
    const displayCategories = () => {
        if (interests) {
            return categories.map(category => {
                const labelId = `category-list-${category._id}`;
                const itemId = category._id;
                const index = interests.includes(category.name);
                if(category.name === "Other"){
                    return;
                }else{
                    return (
                        <ListItem className={classes.listItem} key={itemId} role={undefined} dense button onClick={handleToggle(category.name, itemId)}>
                            <ListItemIcon className={classes.itemCheckBox}>
                                <Checkbox
                                    edge="start"
                                    checked={index}
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
                }
            })
        } else {
            return (
                <Typography>No category available</Typography>
            )
        }
    }

    return (
        <>
    {displayAlert()}
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <EmojiEventsIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Interested Areas
            </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
        {/* { login ? <>
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}} onClick={handleOpen}>
                <AddIcon style={{color: theme.palette.tuftsBlue,}} className={classes.editIcon} />
            </Button>
            </> : null } */}
        </Grid>
        
      </Grid>
      <List className={classes.root}>
          {fetchedData ? displayCategories() : null}
      </List>
    </FloatCard>
    </>
    );
}