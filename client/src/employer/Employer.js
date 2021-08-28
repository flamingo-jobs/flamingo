import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import CompanyBasicInfo from "./components/CompanyBasicInfo";
import CompanyDescription from "./components/CompanyDescription";
import Technologies from "./components/Technologies";
import Reviews from "./reviews/Reviews";

const useStyles = makeStyles((theme) => ({

}));

const Employer = (props) => {
  const classes = useStyles();

  let loginId;
  let login = false;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if (token === null) {
    loginId = window.location.pathname.split("/")[3];
  } else if (header.payload.userRole === "employer") {
    login = true;
    loginId = sessionStorage.getItem("loginId");
  } else {
    loginId = window.location.pathname.split("/")[3];
  }

  return (
    <>

      <Grid
        item
        container
        className={classes.outterWrapper}
        xs={12}
        spacing={3}
        direction="row"
      >
        <Grid item container md={12} lg={6}>
          <Grid item xs={12} style={{marginBottom: 24}}>
            <CompanyBasicInfo userRole={loginId}></CompanyBasicInfo>
          </Grid>
          <Grid item xs={12} style={{marginBottom: 24}}>
            <CompanyDescription userRole={loginId}></CompanyDescription>
          </Grid>
          <Grid item xs={12}>
            <Reviews />
          </Grid>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Grid item xs={12}>
            <Technologies
              showEdit={false}
              employerId={loginId}
              login={login}
              userRole={loginId}
            />
          </Grid>

        </Grid>


      </Grid>



    </>
  );
};

export default Employer;
