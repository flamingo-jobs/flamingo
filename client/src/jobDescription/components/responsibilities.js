import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";

const testStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  res: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    minHeight: "300px",
  },
  resTitle: {
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

const Responsibilities = () => {
  const { border, res, resTitle, readMoreBtn } = testStyles();

  const [readMore, setReadMore] = useState(false);
  const [duties, setDuties] = useState([
    "Follows the Pearson processes, agile practices and motivates his/her team members to do so.",
    "Manage the development environments and code branches.",
    "Manage the development environments and code branches.",
    "Manage the development environments and code branches.",
    "Manage the development environments and code branches.",
  ]);
  const firstHalf = duties.slice(0, 5);
  const secondHalf = duties.slice(5);

  const buttonName = readMore ? "Read Less << " : "Read More >> ";

  return (
    <Container className={res}>
      <Typography variant="h6" className={resTitle}>
        Duties and Responsibilities
      </Typography>
      <List dense={true}>
        {firstHalf.map((dutie) => (
          <ListItem key={duties.indexOf(dutie)}>
            <ListItemIcon>
              <StarBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={dutie} />
          </ListItem>
        ))}
        {readMore &&
          secondHalf.map((dutie) => (
            <ListItem key={duties.indexOf(dutie)}>
              <ListItemIcon>
                <StarBorderOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={dutie} />
            </ListItem>
          ))}
      </List>
      {duties.length > 5 && (
        <a
          className={readMoreBtn}
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

export default Responsibilities;
