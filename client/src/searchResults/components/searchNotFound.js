import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import FloatCard from "../../components/FloatCard";
import Search from "../lotties/search.json";
import Lottie from "react-lottie";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    padding: theme.spacing(4),
  },
}));

const SearchNotFound = (props) => {
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Search,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //   style={{border: "1px solid red"}}
  return (
    <div className={classes.animation}>
      <Lottie
        className={classes.lottie}
        options={defaultOptions}
        height="300px"
        width="300px"
      />
      <div className={classes.textContainer}>
        <Typography variant="h6">We didn't find any results.</Typography>
        <Typography>
          Make sure that everything is spelt correctly or try different
          keywords.
        </Typography>
      </div>
    </div>
  );
};

export default SearchNotFound;
