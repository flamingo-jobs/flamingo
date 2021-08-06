import React, { useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import axios from "axios";
import BACKEND_URL from "../../Config";
import FloatCard from "../../components/FloatCard";
import UserCard from "../../people/components/PeopleCard";
import SearchNotFound from "./searchNotFound";

const useStyles = makeStyles((theme) => ({
  userCardWrapper: {
    marginBottom: theme.spacing(2),
  },
}));

const UserCards = (props) => {
  const classes = useStyles();

  const displayUsers = () => {
    if (props.users.length === 0) {
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
          {props.users.map((user) => (
            <div className={classes.userCardWrapper}>
              <UserCard
                key={user._id}
                info={user}
              ></UserCard>
            </div>
          ))}
        </Grid>
      );
    }
  };

  return displayUsers();
};

export default UserCards;
