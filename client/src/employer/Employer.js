import React from "react";
import {
  CssBaseline,
  Container,
  ThemeProvider,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CompanyInfo from "./components/CompanyInfo";
import Technologies from "./components/Technologies";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  container: {
    paddingTop: 20,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 0,
    },
  },
  FeaturedOrganizations: {
    paddingTop: 25,
  },
  topBarGrid: {
    [theme.breakpoints.down("xs")]: {
      display: "block",
      maxWidth: "unset",
    },
  },
  sideDrawerGrid: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const Employer = (props) => {
  const classes = useStyles();

  let loginId;
  let login = false;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if (token === null) {
    loginId = props.employerID;
  } else if (header.payload.userRole === "employer") {
    login = true;
    loginId = sessionStorage.getItem("loginId");
  } else {
    loginId = props.employerID;
  }

  return (
    <Grid
      container
      xs={12}
      spacing={3}
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={7}
        spacing={3}
        style={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}
      >
        <CompanyInfo userRole={props.userRole}></CompanyInfo>
      </Grid>

      <Grid item xs={12} sm={12} md={5} spacing={3}>
        <Technologies
          showEdit={false}
          employerId={loginId}
          login={login}
          userRole={props.userRole}
        ></Technologies>
      </Grid>
    </Grid>
  );
};

export default Employer;
