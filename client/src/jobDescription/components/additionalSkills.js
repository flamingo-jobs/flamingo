import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Container, Chip } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    position: "relative",
  },
  skillsTitle: {
    textAlign: "left",
    color: theme.palette.black,
  },
}));

// style={{border: "1px solid red"}}
const AdditionalSkills = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h6" className={classes.skillsTitle}>
        Additional Skills
      </Typography>
      <List dense={true}>

        {props.skills.map((skill, index) => (
          <ListItem key={index}>
            <ListItemIcon style={{ minWidth: 24 }}>
              <FiberManualRecordRoundedIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary={skill} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdditionalSkills;
