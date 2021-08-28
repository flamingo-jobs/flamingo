import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import Grid from "@material-ui/core/Grid";
import FloatCard from "../../components/FloatCard";
import theme from "../../Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    "& .MuiChip-root.Mui-disabled": {
      opacity: 0.8,
      "& .MuiChip-deleteIcon": {
        display: "none",
      },
    },
    "& .MuiPaper-elevation1": {
      boxShadow: "rgba(83, 144, 230, 0.1) 0px 0px 5px",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginBottom: 8
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },

  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  inputRoot: {
    color: theme.palette.black,
    fontSize: 14,
    backgroundColor: "transparent",
    border: "none",
    minWidth: 250,
    transition: "background-color 200ms cubic-bezier(1, 1, 1, 0.1) 0ms",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:hover:before": {
      border: "none",
    },
    "&:before": {
      display: "none",
    },
    "&:after": {
      border: "none",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    background: "transparent",
  },
  keywordInput: {
    border: "none",
    "&hover": {
      border: "none",
    },
  },
  keywordChip: {
    backgroundColor: theme.palette.lightSkyBlue,
    margin: 3,
    marginRight: 5,
  },
  editButton: {
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    margin: 17,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  },
  cancelButton: {
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    margin: 17,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  },
  saveButton: {
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    margin: 17,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  },
}));

export default function TechDisplay(props) {
  const classes = useStyles();

  const displayAccordionDetails = () => {

    return (
      <Grid container spacing={3}>
        {props.info.frontEnd ? (
          <>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.secondaryHeading}>
                Front-end
              </Typography>
              {
                props.info.frontEnd.map((option, index) => (
                  <Chip
                    key={index}
                    label={option}
                    className={classes.keywordChip}
                  />
                ))
              }
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.secondaryHeading}>
                Back-end
              </Typography>
              {
                props.info.backEnd.map((option, index) => (
                  <Chip
                    key={index}
                    label={option}
                    className={classes.keywordChip}
                  />
                ))
              }
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            {
              props.info.list.map((option, index) => (
                <Chip
                  key={index}
                  label={option}
                  className={classes.keywordChip}
                />
              ))
            }
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <FloatCard backColor={theme.palette.lightyPurple}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.heading}>
              {props.info.type}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {displayAccordionDetails()}
          </Grid>
        </Grid>
      </FloatCard>
    </div>
  );
}
