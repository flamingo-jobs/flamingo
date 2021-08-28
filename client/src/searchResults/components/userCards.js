import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
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
  const userId = sessionStorage.getItem("loginId");

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
            <div className={classes.userCardWrapper} key={user._id}>
              <UserCard
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
