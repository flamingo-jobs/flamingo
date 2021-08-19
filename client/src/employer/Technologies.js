import React from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddTechForm from "./components/AddTechForm";
import AvailableTechnologies from "./components/AvailableTechnologies";
import NoAccess from "../components/NoAccess";
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
  root: {
    backgroundSize: "cover",
    marginLeft: 20,
    marginTop: 2,
    marginBottom: 5,
  },
  addTechForm: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  availableTech: {
    marginLeft: -20,
    marginRight: 20,
  },
}));

const Technologies = () => {
  const [value, setValue] = React.useState(2);

  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      xs={12}
      spacing={3}
      className={classes.root}
    >
      <Grid item xs={12} lg={12}>
        {haveAccess ? <AddTechForm /> : <NoAccess message="to add/ edit technologies"/>}
      </Grid>

      <Grid item xs={12} lg={6}>
        {/* <AvailableTechnologies /> */}
      </Grid>
    </Grid>
  );
};

export default Technologies;
