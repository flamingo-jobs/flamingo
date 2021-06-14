import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },

  req: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    minHeight: "300px",
    position: "relative",
  },

  reqTitle: {
    textAlign: "left",
    paddingLeft: theme.spacing(2),
  },

  readMoreBtn: {
    cursor: "pointer",
    color: theme.palette.stateBlue,
    "&:hover": {
      color: theme.palette.frenchViolet,
    },
  },
}));

const Requirements = (props) => {
  const classes = useStyles();

  const [readMore, setReadMore] = useState(false);
  const [reqs, setReqs] = useState(props.requirements);

  const firstHalf = reqs.slice(0, 5);
  const secondHalf = reqs.slice(5);

  const buttonName = readMore ? "Read Less << " : "Read More >> ";

  return (
    <Container className={classes.req}>
      <Typography variant="h6" className={classes.reqTitle}>
        Skills and Requirements
      </Typography>
      <List dense={true}>
        {firstHalf.map((dutie) => (
          <ListItem key={firstHalf.indexOf(dutie)}>
            <ListItemIcon>
              <StarBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={dutie} />
          </ListItem>
        ))}
        {readMore &&
          secondHalf.map((dutie) => (
            <ListItem key={secondHalf.indexOf(dutie)}>
              <ListItemIcon>
                <StarBorderOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={dutie} />
            </ListItem>
          ))}
      </List>
      {reqs.length > 5 && (
        <a
          className={classes.readMoreBtn}
          onClick={() => {
            setReadMore(!readMore);
          }}
        >
          {buttonName}
        </a>
      )}
    </Container>
  );
};

export default Requirements;