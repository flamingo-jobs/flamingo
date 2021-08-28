import { Container, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },

  req: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    position: "relative",
  },

  reqTitle: {
    textAlign: "left",
    color: theme.palette.black,

  },

  readMoreBtn: {
    cursor: "pointer",
    color: theme.palette.stateBlue,
    "&:hover": {
      color: theme.palette.stateBlueHover,
    },
  },
}));

const Requirements = (props) => {
  const classes = useStyles();

  const [reqs, setReqs] = useState(props.requirements);

  return (
    <Container className={classes.req}>
      <Typography variant="h6" className={classes.reqTitle}>
        Skills and Requirements
      </Typography>
      <List dense={true}>
        {reqs.map((dutie, index) => (
          <ListItem key={index}>
            <ListItemIcon style={{minWidth: 24}}>
              <FiberManualRecordRoundedIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary={dutie} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Requirements;
