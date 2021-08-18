import React from "react";
import { makeStyles, Typography, Chip } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "./FloatCard";
import ComputerIcon from "@material-ui/icons/Computer";
import { useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../../Config";
import Divider from "@material-ui/core/Divider";

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
    marginLeft: 40,
  },
  subCategory: {
    color: theme.palette.blueJeans,
    float: "left",
    marginLeft: 40,
  },
  technology: {
    marginRight: 30,
  },
  chip: {
    backgroundColor: theme.palette.greenyLightSky,
    color: theme.palette.black,
    marginRight: 5,
    marginBottom: 5,
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
          <Grid item container direction="row" xs={12} spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body1" className={classes.mainCategory}>
                {mainCategory.name}
              </Typography>
            </Grid>

            {Object.keys(mainCategory.stack).map((subCategory, i) => (
              <Grid item container xs={12}>
                {subCategory != "list" ? (
                  <Grid item container xs={12}>
                    <Grid item xs={3}>
                      {subCategory == "frontEnd" ? (
                        <Typography
                          variant="body1"
                          className={classes.subCategory}
                        >
                          Front End
                        </Typography>
                      ) : (
                        <Typography
                          variant="body1"
                          className={classes.subCategory}
                        >
                          Back End
                        </Typography>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={6}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginLeft: 40,
                        marginBottom: 10,
                      }}
                    >
                      {Array.from(mainCategory.stack[subCategory]).map(
                        (tech, i) => (
                          <Chip
                            label={tech}
                            // variant="outlined"
                            className={classes.chip}
                          />
                        )
                      )}
                    </Grid>
                  </Grid>
                ) : (
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginLeft: 40,
                      marginBottom: 10,
                    }}
                  >
                    {Array.from(mainCategory.stack[subCategory]).map(
                      (tech, i) => (
                        <Chip
                          label={tech}
                          // variant="outlined"
                          className={classes.chip}
                        />
                      )
                    )}
                  </Grid>
                )}
                <Divider />
              </Grid>
            ))}
          </Grid>
        ))}
      </FloatCard>
    </Grid>
  );
};

export default AvailableTechnologies;
