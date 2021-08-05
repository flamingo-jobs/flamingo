import React, { useState, useEffect } from "react";
import FloatCard from "../../components/FloatCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Container } from "@material-ui/core";
import BACKEND_URL from "../../Config";
import axios from "axios";
import OrganizationCard from "./components/organizationCard";
import { CircularProgress } from "@material-ui/core";
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
  // Used for updating DB
  const [favoriteOrgIdsForDB, setFavoriteOrgIdsForDB] = useState([]);
  const userId = sessionStorage.getItem("loginId");
  const [favoriteOrgs, setFavoriteOrgs] = useState("empty");

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
        setFavoriteOrgIdsForDB(response.data.jobseeker.favoriteOrganizations);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const retrieveEmployers = async () => {
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
  };

  const displayFavoriteOrgs = () => {
    if (!favoriteOrgs.length) {
      return (
        <Grid item xs={12}>
          <FloatCard>
          <CircularProgress />
          </FloatCard>
        </Grid>
      );
    }
    if (favoriteOrgs === "empty") {
      return (
        <Grid item xs={12}>
          <FloatCard>
          <Typography>You haven't added any favorite organizations yet.</Typography>
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
              favoriteOrgIdsForDB={favoriteOrgIdsForDB}
              setFavoriteOrgIdsForDB={setFavoriteOrgIdsForDB}
            ></OrganizationCard>
          ))}
        </Grid>
      );
    }
  };

  return (
    <Container className={classes.root}>
      <Grid container>{displayFavoriteOrgs()}</Grid>
    </Container>
  );
};

export default FavoriteOrganizations;
