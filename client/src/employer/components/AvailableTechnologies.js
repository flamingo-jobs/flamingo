import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "./FloatCard";
import ComputerIcon from "@material-ui/icons/Computer";
import { useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../../Config";

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
  mainCategory: {
    fontWeight: "bold",
    color: theme.palette.blueJeans,
    float: "left",
    marginLeft: 10,
  },
  subCategory: {
    color: theme.palette.blueJeans,
    float: "left",
    marginLeft: 10,
  },
}));

const AvailableTechnologies = () => {
  const [value, setValue] = React.useState(2);

  const classes = useStyles();

  const [state, setState] = useState({
    data: [],
  });

  const data = state.data;

  useEffect(() => {
    axios.get(`${BACKEND_URL}/technologies/`).then((res) => {
      if (res.data.success) {
        setState({
          data: res.data.existingData,
        });
      }
      console.log(data);
    });
  }, []);

  return (
    <Grid container direction="column" xs={12} spacing={3}>
      <FloatCard>
        <Grid item className={classes.item}>
          <Typography variant="h6" className={classes.title}>
            Available Technologies
          </Typography>
          <ComputerIcon className={classes.notificationsIcon} />
        </Grid>

        {Array.from(data).map((mainCategory, i) => (
          <Grid item container direction="row" xs={12}>
            <Grid item xs={12}>
              <Typography variant="body1" className={classes.mainCategory}>
                {mainCategory.name}
              </Typography>
            </Grid>

            {Object.keys(mainCategory.stack).map((subCategory, i) => (
              <Grid item xs={6}>
                {subCategory != "list" ? (
                  <Typography variant="body1" className={classes.subCategory}>
                    {subCategory}
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    className={classes.subCategory}
                  ></Typography>
                )}
              </Grid>
              // {Array.prototype.forEach.call(subCategory.values, (technology) => {
              //   console.log(technology);
              // })}
            ))}
          </Grid>
        ))}
      </FloatCard>
    </Grid>
  );
};

export default AvailableTechnologies;
