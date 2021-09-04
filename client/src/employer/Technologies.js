import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import NoAccess from "../components/NoAccess";
import AddTechForm from "./components/AddTechForm";
const jwt = require("jsonwebtoken");

let haveAccess = false;

if (sessionStorage.getItem("userToken")) {
  var accessTokens = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.accessTokens;
  if (accessTokens.includes("all") || accessTokens.includes("company")) {
    haveAccess = true;
  }
}

const useStyles = makeStyles((theme) => ({
}));

const Technologies = () => {
  const [value, setValue] = React.useState(2);

  const classes = useStyles();

  return (
    <Grid item container xs={12} spacing={3} direction="row"
      justify="space-between"
      alignItems="flex-start" className={classes.mainGrid}>
      <Grid item xs={12} className={classes.searchGrid}>
        {haveAccess ? <AddTechForm /> : <NoAccess message="to add/ edit technologies" />}
      </Grid>
    </Grid>
  );
};

export default Technologies;
