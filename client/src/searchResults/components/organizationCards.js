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

  const displayOrganizations = () => {
    if (props.organizations.length === 0) {
      return (
        <Grid item xs={9}>
          <FloatCard>
            <SearchNotFound></SearchNotFound>
          </FloatCard>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={9}>
          {props.organizations.map((organization) => (
            <div className={classes.orgCardWrapper}>
              <OrganizationCard
                key={organization._id}
                info={organization}
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
