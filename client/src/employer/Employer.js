import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CompanyBasicInfo from "./components/CompanyBasicInfo";
import CompanyDescription from "./components/CompanyDescription";
import Technologies from "./components/Technologies";
import FloatCard from "./components/FloatCard";
import ComputerIcon from "@material-ui/icons/Computer";
import Reviews from "./reviews/Reviews";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundSize: "cover",
    // minHeight: "100vh",
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
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 20,
  },
  icon: {
    color: theme.palette.stateBlue,
    marginLeft: -40,
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
  const [empId, setEmpId] = useState(window.location.pathname.split("/")[3]);

  return (
    <div className={classes.root}>
    <Grid
      container
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
        style={{ marginLeft: 0, marginTop: -5, marginBottom: 5 }}
      >
        <Grid item>
          <CompanyBasicInfo userRole={props.userRole}></CompanyBasicInfo>
        </Grid>

        <Grid item>
          <CompanyDescription userRole={props.userRole}></CompanyDescription>
        </Grid>

      </Grid>

      <Grid
        item
        container
        xs={12}
        sm={12}
        md={5}
        spacing={1}
        style={{ marginTop: 5, marginBottom: 5, marginRight: 5 }}
      >
        <FloatCard>
          <Grid
            item
            container
            xs={12}
            direction="row"
            style={{ marginTop: 20 }}
          >
            <Grid item xs={10}>
              <Typography variant="h6" className={classes.title}>
                Company Technology Stack
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <ComputerIcon className={classes.icon} />
            </Grid>
          </Grid>

          <Grid item style={{ marginLeft: 15, marginTop: 10 }}>
            <Technologies
              showEdit={false}
              employerId={loginId}
              login={login}
              userRole={props.userRole}
            ></Technologies>
          </Grid>
        </FloatCard>
      </Grid>

      <Grid item xs={12} md={7}>
        <Reviews empId={empId}/>
      </Grid>
    </Grid>
    </div>
    
  );
};

export default Employer;
