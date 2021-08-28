import React, { useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import axios from "axios";
import BACKEND_URL from "../../Config";
import FloatCard from "../../components/FloatCard";
import OrganizationCard from "./../../employer/components/OrganizationCard";
import SearchNotFound from "./searchNotFound";

const useStyles = makeStyles((theme) => ({
  orgCardWrapper: {
    marginBottom: theme.spacing(2),
  },
}));

const OrganizationCards = (props) => {
  const classes = useStyles();
  const userId = sessionStorage.getItem("loginId");
  const [favoriteOrgs, setFavoriteOrgs] = useState("empty");

  useEffect(() => {
      retrieveJobseeker();
  }, []);

  const retrieveJobseeker = async () => {
    try {
        if(userId){
          const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
          if (response.data.success) {
              setFavoriteOrgs(response.data.jobseeker.favoriteOrganizations);
          }
        }
    } catch (err) {
        console.log(err);
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
