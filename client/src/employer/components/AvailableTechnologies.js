import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "./FloatCard";
import ComputerIcon from "@material-ui/icons/Computer";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
  },
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  notificationsIcon: {
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 150,
  },
  item: {
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 20,
  },
}));

const AvailableTechnologies = () => {
  const [value, setValue] = React.useState(2);

  const classes = useStyles();

  return (
    <Grid container direction="column" xs={12} spacing={3}>
      <FloatCard>
        <Grid item className={classes.item}>
          <Typography variant="h6" className={classes.title}>
            Available Technologies
          </Typography>
          <ComputerIcon className={classes.notificationsIcon} />
        </Grid>
      </FloatCard>
    </Grid>
  );
};

export default AvailableTechnologies;
