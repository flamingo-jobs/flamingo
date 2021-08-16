import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  makeStyles,
  useTheme,
  Avatar,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import wso2 from "../images/wso2.png";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import BACKEND_URL from "../../../../Config";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginLeft: 10,
    marginRight: 10,
  },
  logoItem: {
    marginLeft: 30,
    marginTop: 10,
    float: "center",
    marginBottom: 10,
  },
  logo: {
    borderRadius: 12,
    width: 125,
    height: 125,
    float: "center",
  },
  companyName: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    marginBottom: 20,
    float: "center",
  },
  ratingContainer:{
    marginTop: -30,
  }
}));

const CompanySummaryCard = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    logo: " ",
  });

  const name = state.name;
  const logo = state.logo;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/employers/${props.employerId}`)
      .then((res) => {
        console.log(res.data.employer);
        if (res.data.success) {
          setState({
            name: res.data.employer.name,
            logo: res.data.employer.logo,
          });
        }
      });
  }, []);

  return (
    <div className={classes.root}>
      <FloatCard>
        {/* LOGO */}
        <div className={classes.logoItem}>
          {/* <Avatar className={classes.logo} src={require(`../images/${logo}`).default} variant="square" /> */}
          <Avatar className={classes.logo} src={wso2} variant="square" />
        </div>

        <Typography variant="h5" className={classes.companyName}>
          {name}
        </Typography>

        <Grid item container spacing={1} justify="center" alignItems="center" className={classes.ratingContainer}>
          <Grid item xs={3}>
            <div className={classes.ratingAverage}>
              <Typography variant="body2">
                <Box fontWeight={500} fontSize={25} m={1}>
                  3.5
                </Box>
              </Typography>
            </div>
          </Grid>

          <Grid item xs={5}>
            <div className={classes.rating}>
              <Rating
                name="half-rating-read"
                size="small"
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className={classes.ratingText}>
              <Typography variant="body2">(124)</Typography>
            </div>
          </Grid>
        </Grid>
      </FloatCard>
    </div>
  );
};

export default CompanySummaryCard;
