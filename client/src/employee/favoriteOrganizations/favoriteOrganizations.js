import React, { useState, useEffect } from "react";
import FloatCard from "../../components/FloatCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Container } from "@material-ui/core";
import BACKEND_URL from "../../Config";
import axios from "axios";
import OrganizationCard from "./components/organizationCard";
import { CircularProgress } from "@material-ui/core";
import SnackBarAlert from "../../components/SnackBarAlert";
import NoInfo from "../../components/NoInfo";
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setReduxFavoriteOrgIds } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
}));

// style={{border: "1px solid red"}}
const FavoriteOrganizations = () => {
  const classes = useStyles();
  const [favoriteOrgIds, setFavoriteOrgIds] = useState([]);
  const [favoriteOrgs, setFavoriteOrgs] = useState([]);
  
  const jwt = require("jsonwebtoken");
  const userId = sessionStorage.getItem("loginId");
  const isSignedIn = sessionStorage.getItem("userToken") ? true : false;
  const token = sessionStorage.getItem("userToken");
  const [role, setRole] = useState(
    jwt.decode(token, { complete: true })
    ? jwt.decode(token, { complete: true }).payload.userRole
    : null
  );

  // Redux
  const reduxFavoriteOrgIds = useSelector(state => state.favoriteOrgIds);
  const dispatch = useDispatch();

  // Alert related states
  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });

  // Error related stuff
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

  useEffect(() => {
    retrieveJobseeker();
  }, []);

  useEffect(() => {
    retrieveEmployers();
  }, [favoriteOrgIds]);

  const retrieveJobseeker = async () => {
    if(isSignedIn && role === "jobseeker" && userId && reduxFavoriteOrgIds === "empty"){
      try {
        const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
        if (response.data.success) {
          setFavoriteOrgIds(response.data.jobseeker.favoriteOrganizations);
          dispatch(setReduxFavoriteOrgIds(response.data.jobseeker.favoriteOrganizations));

        }
      } catch (err) {
        // console.log(err);
      }
    } else {
      setFavoriteOrgIds(reduxFavoriteOrgIds);
    }

  };

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
          // console.log(err);
        }
      }
    }
  };

  const displayFavoriteOrgs = () => {

    if (favoriteOrgs.length === 0) {
      return (
        <Grid item sm={12} style={{ marginBottom: 16 }}>
          <FloatCard>
            <Loading />
          </FloatCard>
        </Grid>)
    } else if (favoriteOrgs === "empty" || favoriteOrgIds.length === 0) {
      return (
        <Grid item sm={12} style={{ marginBottom: 16 }}>
          <FloatCard>
            <NoInfo message="You haven't added any favorite organizations yet." />
          </FloatCard>
        </Grid>
      );
    } else {
      return favoriteOrgs.map((org) => (
        <Grid item xs={12} md={6}>
          <OrganizationCard
            userId={userId}
            org={org}
            favoriteOrgIds={favoriteOrgIds}
            setFavoriteOrgIds={setFavoriteOrgIds}
            setAlertData={setAlertData}
            handleAlert={handleAlert}
          ></OrganizationCard>
        </Grid>
      ));
    }
  };

  return (
    <Container className={classes.root}>
      {displayAlert()}
      <Grid container spacing={3}>
        {displayFavoriteOrgs()}
      </Grid>
    </Container>
  );
};

export default FavoriteOrganizations;
