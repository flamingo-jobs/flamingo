import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Modal,
  Button,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
// import Flamingo from "../lotties/flamingo.json";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    padding: `0px 30px`,
    paddingBottom: "20px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    maxHeight: "98vh",
    overflowY: "auto",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  closeButton: {
    width: "20px",
    "&:hover": {
      backgroundColor: "#fff",
    },
    padding: "0px",
  },
  closeIcon: {
    color: "#bbb",
    "&:hover": {
      color: "#888",
    },
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: "20px !important",
    },
    padding: "20px !important",
    margin: "0px",
  },
  shortlistContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    color: theme.palette.stateBlue,
    fontSize: "17px",
    fontWeight: 500,
    textAlign: "left",
  },
  countText: {
    marginTop: theme.spacing(2),
  },
  sliderContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  slider: {
    color: theme.palette.stateBlue,
    width: "70%",
  },
  btnContainer: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "flex-end",
  },
  cancelBtn: {
    background: "#e8e8e4",
    color: theme.palette.black,
    "&:hover": {
      background: "#e8e8e4",
      color: theme.palette.black,
    },
  },
  submitBtn: {
    marginLeft: "10px",
    background: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      background: theme.palette.stateBlue,
      color: theme.palette.white,
    },
  },
}));

// style={{border: "1px solid red"}}
const ShortlistModal = (props) => {
  const classes = useStyles();

  {
    /* style={{border: "1px solid red"}} */
  }
  return (
    <>
      <Modal
        open={props.openShortlistModal}
        onClose={props.handleCloseShortlistModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Grid container xs={12}>
              <div className={classes.closeBtnContainer}>
                <IconButton
                  onClick={props.handleCloseShortlistModal}
                  className={classes.closeButton}
                >
                  <CloseIcon className={classes.closeIcon} />
                </IconButton>
              </div>
              <form onSubmit={props.handleShortlistSubmit}>
                <div className={classes.shortlistContent}>
                  <Typography className={classes.text}>
                    Select the amount of applicants needed from below.
                  </Typography>
                  <Typography className={classes.countText}>
                    No. of Applicants: {props.shortlistCount}
                  </Typography>
                  <div className={classes.sliderContainer}>
                    <Slider
                      className={classes.slider}
                      value={
                        typeof props.shortlistCount === "number"
                          ? props.shortlistCount
                          : 0
                      }
                      onChange={props.handleSliderChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={props.max}
                    />
                  </div>
                  <div className={classes.btnContainer}>
                    <Button
                      variant="contained"
                      className={classes.cancelBtn}
                      onClick={props.handleCloseShortlistModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      className={classes.submitBtn}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default ShortlistModal;
