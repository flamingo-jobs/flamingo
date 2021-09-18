import React, { useEffect, useState } from "react";
import { Checkbox, Typography } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import axios from "axios";
import BACKEND_URL from "../../../Config";
import theme from "../../../Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  count: {
    borderRadius: 5,
    width: 25,
    height: 25,
    backgroundColor: theme.palette.lightSkyBlue,
  },
  countText: {
    fontSize: 11,
    color: theme.palette.tuftsBlue,
    fontWeight: 500,
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 8,
  },
  listTitle: {
    color: theme.palette.tuftsBlue,
    fontWeight: 700,
  },
  listDown: {
    color: theme.palette.tuftsBlue,
  },
  checkBox: {
    color: theme.palette.pinkyRed,
    fill: theme.palette.pinkyRed,
  },
  itemCheckBox: {
    minWidth: "auto",
  },
  listHeader: {
    borderRadius: 8,
  },
}));

const StatusList = (props) => {
  const classes = useStyles();
  const [openCategories, setOpenCategories] = useState(false);

  const states = [
    "Pending",
    "Reviewing",
    "Shortlisted",
    "Rejected",
  ];

  const handleStateClick = () => {
    setOpenCategories(!openCategories);
  };

  const [checked, setChecked] = useState([]);

  useEffect(() => {
    passFilters();
  }, [checked]);


  const handleToggle = (value) => () => {
    const newChecked = [...checked];
    const currentIndex = checked.indexOf(value.toLowerCase());

    if (currentIndex === -1) {
      newChecked.push(value.toLowerCase());
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const passFilters = () => {
    props.updateFilters(checked);
  };


  const displayStatus = () => {
    if (states) {
      return states.map((status, i) => {
        const labelId = `status-list-${status+i}`;
        const itemId = status+i;
        
        return (
          <ListItem
            className={classes.listItem}
            key={itemId}
            role={undefined}
            dense
            button
            onClick={handleToggle(status)}
          >
            <ListItemIcon className={classes.itemCheckBox}>
              <Checkbox
                edge="start"
                checked={checked.indexOf(status.toLocaleLowerCase()) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
                className={classes.checkBox}
                style={{
                  color: theme.palette.vividSkyBlue,
                }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={status} />
          </ListItem>
        );
      });
    } else {
      return <Typography>No statuses available</Typography>;
    }
  };

  return (
    <>
      <List component="nav" className={classes.root}>
        <ListItem
          button
          onClick={handleStateClick}
          className={classes.listHeader}
        >
          <ListItemText
            primary={
              <Typography className={classes.listTitle}>Resume Status</Typography>
            }
          ></ListItemText>
        </ListItem>
        <List className={classes.root}>{displayStatus()}</List>
        
      </List>
    </>
  );
};

export default StatusList;
