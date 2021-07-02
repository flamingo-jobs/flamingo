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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TechStackModal from "./techStackModal";
import axios from "axios";
import BACKEND_URL from "../../../Config";

const useStyles = makeStyles((theme) => ({
  techStackContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  techStackTitle: {
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
    background: theme.palette.stateBlue,
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  addIcon: {
    color: theme.palette.tagIcon,
  },
  iconGridItem: {
    display: "flex",
    flexDirection: "column",
  },
}));
// style={{ border: "1px solid red" }}
const TechStack = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleTechStackChange = (values) => {
    const newJob = {...props.job};
    newJob.technologyStack = values;
    props.setJob(newJob);
  };

  const handleTechStackSubmit = async (e) => {
    e.preventDefault();

    const updateFields = {
      technologyStack: props.job.technologyStack,
    };

    try {
      const response = await axios.put(
        `${BACKEND_URL}/jobs/update/${props.jobId}`,
        updateFields
      );
      props.setChangesApplied(true);
      handleClose();
      setTimeout(() => props.setChangesApplied(false), 10000);
    } catch (err) {
      props.setChangesNotApplied(true);
      handleClose();
      setTimeout(() => props.setChangesNotApplied(false), 10000);
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <TechStackModal
        open={open}
        handleClose={handleClose}
        technologies={props.technologies}
        technologyStack={props.job.technologyStack}
        handleTechStackChange={handleTechStackChange}
        handleTechStackSubmit={handleTechStackSubmit}
      ></TechStackModal>

      <FloatCard>
        <Container className={classes.techStackContainer}>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h6" className={classes.techStackTitle}>
                Technology stack
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.iconGridItem}>
              <IconButton className={classes.iconButton} onClick={handleOpen}>
                <AddCircleOutlineIcon className={classes.addIcon} />
              </IconButton>
            </Grid>
          </Grid>
          <Container className={classes.chipContainer}>
            {props.job.technologyStack.map((item) => (
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

export default TechStack;
