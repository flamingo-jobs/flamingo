import React from "react";
import Grid from "@material-ui/core/Grid";
import Lottie from "react-lottie";
import Anim from "./lotties/maintenance.json";
import { makeStyles, Typography } from "@material-ui/core";
import FloatCard from "./FloatCard";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 12,
      paddingLeft: 12,
    },
  },
}));

function UnderMaintenance(props) {
  const classes = useStyles();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Anim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Grid
      item
      container
      sm={12}
      spacing={3}
      direction="row"
      className={classes.mainGrid}
      alignItems="center"
      align="center"
    >
      <Grid item xs={12}>
        <FloatCard>
          <Grid container style={{ padding: 24 }}>
            <Grid item xs={12}>
              <Lottie options={defaultOptions} height={200} width={200} />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 16 }}>
              <Typography variant="h6">
                Under Maintenance!
              </Typography>
            </Grid>{" "}
            <Grid item xs={12} style={{ marginTop: 16 }}>
              <Typography>
                {props.message ? props.message : ""}
                <br />
                Please come back later!
              </Typography>
            </Grid>
          </Grid>
        </FloatCard>
      </Grid>
    </Grid>
  );
}

export default UnderMaintenance;
