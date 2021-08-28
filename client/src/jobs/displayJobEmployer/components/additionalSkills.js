import {
  Chip, Container, Grid, IconButton, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import axios from "axios";
import React, { useState } from "react";
import FloatCard from "../../../components/FloatCard";
import BACKEND_URL from "../../../Config";
import AdditionalSkillsModal from "./additionalSkillsModal";

const useStyles = makeStyles((theme) => ({
  additionalSkillsContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  additionalSkillsTitle: {
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
  additionalSkillsEmpty:{
    color: "#888",
    fontSize: "15px",
  },
}));

// style={{ border: "1px solid red" }}
const AdditionalSkills = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdditionalSkillsChange = (values) => {
    const newJob = { ...props.job };
    newJob.additionalSkills = values;
    props.setJob(newJob);
  };

  const handleAdditionalSkillsSubmit = async (e) => {
    e.preventDefault();

    const updateFields = {
      additionalSkills: props.job.additionalSkills,
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
      <AdditionalSkillsModal
        open={open}
        handleClose={handleClose}
        additionalSkills={props.job.additionalSkills}
        handleAdditionalSkillsChange={handleAdditionalSkillsChange}
        handleAdditionalSkillsSubmit={handleAdditionalSkillsSubmit}
      ></AdditionalSkillsModal>

      <FloatCard>
        <Container className={classes.additionalSkillsContainer}>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h6" className={classes.additionalSkillsTitle}>
                Additional Skills
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.iconGridItem}>
              <IconButton className={classes.iconButton} onClick={handleOpen}>
                <AddCircleOutlineIcon className={classes.addIcon} />
              </IconButton>
            </Grid>
          </Grid>
          <Container className={classes.chipContainer}>
            {props.job.additionalSkills.length === 0 && (
              <Typography className={classes.additionalSkillsEmpty}>
                There are no additional skills.
              </Typography>
            )}
            {props.job.additionalSkills.map((item) => (
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

export default AdditionalSkills;
