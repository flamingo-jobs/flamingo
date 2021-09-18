import React, { useEffect, useState } from "react";
import { makeStyles, Switch, Typography } from "@material-ui/core";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import FloatCard from "../../../components/FloatCard";
import theme from "../../../Theme";
import StatusList from "./statusList";


const useStyles = makeStyles(() => ({
  titleDiv: {
    textAlign: "left",
    backgroundColor: theme.palette.lightSkyBlue,
    padding: 8,
    paddingLeft: 16,
    borderRadius: 8,
  },
  title: {
    alignItems: "center",
    display: "flex",
    color: theme.palette.stateBlue,
    fontWeight: 700,
  },
  icon: {
    marginRight: 8,
  },
  featuredCheck: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
  },
  featuredJobs: {
    color: theme.palette.stateBlue,
    fontWeight: 600,
  },
}));

const ApplicationFilters = (props) => {
  const classes = useStyles();

  return (
    <>
      <FloatCard>
        <div className={classes.titleDiv}>
          <Typography className={classes.title}>
            <FilterListRoundedIcon className={classes.icon} /> Filter by
          </Typography>
        </div>
        <div className={classes.types}>
          <StatusList updateFilters={props.updateFilters} />
        </div>
      </FloatCard>
    </>
  );
}

export default ApplicationFilters;
