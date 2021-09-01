import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FloatCard from "../../components/FloatCard";
import BACKEND_URL from "../../Config";
import OrganizationCard from "./../../employer/components/OrganizationCard";
import SearchNotFound from "./searchNotFound";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  orgCardWrapper: {
    marginBottom: theme.spacing(2),
  },
}));

const OrganizationCards = (props) => {
  const classes = useStyles();

  // Redux
  const reduxFavoriteOrgIds = useSelector(state => state.favoriteOrgIds);

  const [favoriteOrgs, setFavoriteOrgs] = useState("empty");

  const jwt = require("jsonwebtoken");
  const isSignedIn = sessionStorage.getItem("userToken") ? true : false;
  const userId = sessionStorage.getItem("loginId");
  const token = sessionStorage.getItem("userToken");
  const [role, setRole] = useState(
    jwt.decode(token, { complete: true })
    ? jwt.decode(token, { complete: true }).payload.userRole
    : null
  );

  useEffect(() => {
      retrieveJobseeker();
  }, []);

  const retrieveJobseeker = async () => {
    if(isSignedIn && role === "jobseeker" && userId && reduxFavoriteOrgIds === "empty"){
      try {
        const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
        if (response.data.success) {
            setFavoriteOrgs(response.data.jobseeker.favoriteOrganizations);
        }
      } catch (err) {
          console.log(err);
      }
    } else {
      setFavoriteOrgs(reduxFavoriteOrgIds);
    }
  };
  
  const displayOrganizations = () => {
    if (props.organizations.length === 0) {
      return (
        <Grid item xs={12}>
          <FloatCard>
            <SearchNotFound></SearchNotFound>
          </FloatCard>
        </Grid>
      );
    } else{
      return (
        <Grid item xs={12}>
          {props.organizations.map((organization) => (
            <div className={classes.orgCardWrapper} key={organization._id}>
              <OrganizationCard
                info={organization}
                favoriteOrgs={favoriteOrgs}
                setFavoriteOrgs={setFavoriteOrgs}
              ></OrganizationCard>
            </div>
          ))}
        </Grid>
      );
    }
  };

  return displayOrganizations();
};

export default OrganizationCards;
