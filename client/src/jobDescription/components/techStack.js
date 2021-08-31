import { Chip, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    position: "relative",
  },
  techstackTitle: {
    textAlign: "left",
    color: theme.palette.black,
  },
  chipContainer: {
    paddingTop: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  chip:{
    backgroundColor: "#52b788",
    "&:hover":{
      cursor: "pointer",
      backgroundColor: "#40916c",

    }
  },
}));
// style={{border: "1px solid red"}}
const TechStack = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h6" className={classes.techstackTitle}>
        Technology stack
      </Typography>

      <div className={classes.chipContainer}>
        {props.techStack.map((item) => (
          <Chip key={item} label={item} className={classes.chip} variant="outlined"/>
        ))}
      </div>
    </Container>
  );
};

export default TechStack;
