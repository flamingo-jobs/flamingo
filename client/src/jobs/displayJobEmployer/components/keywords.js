import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Container,
  Chip,
  IconButton,
} from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import KeywordsModal from "./keywordsModal";
import axios from "axios";
import BACKEND_URL from "../../../Config";

const useStyles = makeStyles((theme) => ({
  keywordsContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  keywordsTitle: {
    textAlign: "left",
    color: theme.palette.black,
  },
  chipContainer: {
    padding: "0px",
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    paddingTop: theme.spacing(1),
  },
  chip: {
    color: theme.palette.white,
    background: "#6c757d",
    "&:hover": {
      background: theme.palette.black,
      cursor: "pointer",
    },
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  addIcon: {
    color: theme.palette.tagIcon,
    transition: "0.3s",
    "&:hover": {
      transition: "0.3s",
      color: theme.palette.black,
    },
  },
  iconGridItem: {
    display: "flex",
    flexDirection: "column",
  },
  keywordsEmpty:{
    color: "#888",
    fontSize: "15px",
  },
}));

// style={{ border: "1px solid red" }}
const Keywords = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeywordsChange = (values) => {
    const newJob = { ...props.job };
    newJob.keywords = values;
    props.setJob(newJob);
  };

  const handleKeywordsSubmit = async (e) => {
    e.preventDefault();

    const updateFields = {
      keywords: props.job.keywords,
    };

    try {
      const response = await axios.put(
        `${BACKEND_URL}/jobs/update/${props.jobId}`,
        updateFields
      );
      // console.log(response);
      handleClose();
      props.setAlertData({
        severity: "success",
        msg: "Changes saved successfully!",
      });
      props.handleAlert();
      await axios.get(`${BACKEND_URL}/jobs/generateRecommendations/${props.jobId}`);
    } catch (err) {
      handleClose();
      props.setAlertData({
        severity: "error",
        msg: "Changes could not be applied",
      });
      props.handleAlert();
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <KeywordsModal
        open={open}
        handleClose={handleClose}
        keywords={props.job.keywords}
        handleKeywordsChange={handleKeywordsChange}
        handleKeywordsSubmit={handleKeywordsSubmit}
      ></KeywordsModal>

      <FloatCard>
        <Container className={classes.keywordsContainer}>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h6" className={classes.keywordsTitle}>
                Keywords
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.iconGridItem}>
              <IconButton className={classes.iconButton} onClick={handleOpen}>
                <AddCircleOutlineIcon className={classes.addIcon} />
              </IconButton>
            </Grid>
          </Grid>
          <Container className={classes.chipContainer}>
            {props.job.keywords.length === 0 && (
              <Typography className={classes.keywordsEmpty}>
                There are no keywords
              </Typography>
            )}
            {props.job.keywords.map((item) => (
              <Chip
                key={item}
                size="medium"
                label={item}
                className={classes.chip}
              />
            ))}
          </Container>
        </Container>
      </FloatCard>
    </>
  );
};

export default Keywords;
