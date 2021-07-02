import React, {useState} from "react";
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
    const newJob = {...props.job};
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
