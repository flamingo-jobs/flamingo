import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import FloatCard from '../../../components/FloatCard';
import Organization from '../../../employer/components/Organization';
import { Link } from 'react-router-dom'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import axios from 'axios';
import BACKEND_URL from '../../../Config';
import SnackBarAlert from "../../../components/SnackBarAlert";


const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        color: theme.palette.black
    },
    container: {
        maxWidth: 'unset'
    },
    link: {
        backgroundColor: theme.palette.white,
        color: theme.palette.tuftsBlue,
        fontWeight: 800,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
            backgroundColor: theme.palette.white,
            color: theme.palette.tuftsBlueHover,
        }
    },
}))

function FeaturedOrganizations(props) {
    const classes = useStyles();
    const [favoriteOrgIds, setFavoriteOrgIds] = useState("empty");
    const [favoriteOrgs, setFavoriteOrgs] = useState("empty");

    const [alertShow, setAlertShow] = useState(false);
    const [alertData, setAlertData] = useState({ severity: "", msg: "" });

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
    const userId = sessionStorage.getItem("loginId");

    const handleAlert = () => {
        setAlertShow(true);
      };
    
    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertShow(false);
    };

    useEffect(() => {
        retrieveFavoriteOrgIds()
    }, [])

    useEffect(() => {
        retrieveEmployers();
      }, [favoriteOrgIds]);

    const retrieveFavoriteOrgIds = () => {
        axios.get(`${BACKEND_URL}/jobseeker/${userId}`)
        .then(res => {
            if(res.data.success){
                if(res.data.jobseeker.favoriteOrganizations.length > 0){
                    setFavoriteOrgIds(res.data.jobseeker.favoriteOrganizations);
                }
            }
        })
    }

    const retrieveEmployers = async () => {
        if (favoriteOrgIds !== "empty") {
          if (favoriteOrgIds.length) {
            const empIds = favoriteOrgIds.join("$$");
            try {
              const response = await axios.get(
                `${BACKEND_URL}/employers/favorites/${empIds}`
              );
              if (response.data.success) {
                setFavoriteOrgs(response.data.employers);
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      };

    const displayFavoriteOrgs = () => {
        if (favoriteOrgs !== "empty") {
            return favoriteOrgs.map(favoriteOrg => (
                <Grid item xs={12} key={favoriteOrg._id}>
                    <Organization 
                        info={favoriteOrg} 
                        favoriteOrgIds={favoriteOrgIds} 
                        setFavoriteOrgIds={setFavoriteOrgIds}
                        setAlertData={setAlertData}
                        handleAlert={handleAlert}
                    />
                </Grid>
            ))
        } else {
            return (
                <Grid item sm={12}>
                    <Typography>No Favourite Organizations</Typography>
                </Grid>)
        }
    }

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

    return (
        <div>
            {displayAlert()}

            <Grid container direction="column" spacing={2} className={classes.container}>
                <Grid item sm={12} >
                    <FloatCard>
                        <Typography variant="h5" className={classes.title}>Favourite Organizations</Typography>
                    </FloatCard>
                </Grid>
                <Grid item container direction="column" spacing={2}>
                    {displayFavoriteOrgs()}
                </Grid>
                <Grid item sm={12}>
                    <FloatCard>
                        <Link to="/jobseeker/favoriteOrganizations">
                            <Button
                                className={classes.link}
                                endIcon={<ArrowForwardRoundedIcon />}
                            >
                                See All
                            </Button>
                        </Link>
                    </FloatCard>
                </Grid>
            </Grid>
        </div>
    )
}

export default FeaturedOrganizations
