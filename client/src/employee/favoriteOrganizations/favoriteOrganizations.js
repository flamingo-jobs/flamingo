import React, { useState, useEffect } from "react";
import FloatCard from "../../components/FloatCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Container } from "@material-ui/core";
import BACKEND_URL from "../../Config";
import axios from "axios";
import OrganizationCard from "./components/organizationCard";
import { CircularProgress } from "@material-ui/core";
import SnackBarAlert from "../../components/SnackBarAlert";

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
  const userId = sessionStorage.getItem("loginId");
  const [favoriteOrgs, setFavoriteOrgs] = useState("empty");

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
    try {
      const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
      if (response.data.success) {
        setFavoriteOrgIds(response.data.jobseeker.favoriteOrganizations);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const retrieveEmployers = async () => {
    if(favoriteOrgIds !== "empty"){
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
    // if (!favoriteOrgs.length) {
    //   return (
    //     <Grid item xs={12}>
    //       <FloatCard>
    //         <CircularProgress />
    //       </FloatCard>
    //     </Grid>
    //   );
    // }
    if (favoriteOrgs === "empty" || favoriteOrgIds.length===0) {
      return (
        <Grid item xs={12}>
          <FloatCard>
            <Typography>
              You haven't added any favorite organizations yet.
            </Typography>
          </FloatCard>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={9}>
          {favoriteOrgs.map((org) => (
            <OrganizationCard
              userId={userId}
              org={org}
              favoriteOrgIds={favoriteOrgIds}
              setFavoriteOrgIds={setFavoriteOrgIds}
              setAlertData={setAlertData}
              handleAlert={handleAlert}
            ></OrganizationCard>
          ))}
        </Grid>
      );
    }
  };

  return (
    <Container className={classes.root}>
      {displayAlert()}
      <Grid container justify="center">
        {displayFavoriteOrgs()}
      </Grid>
    </Container>
  );
};

export default FavoriteOrganizations;
