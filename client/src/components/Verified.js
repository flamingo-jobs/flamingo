import React from "react";
import Grid from "@material-ui/core/Grid";
import Lottie from "react-lottie";
import VerifiedAnim from "./lotties/verified.json";
import PendingAnim from "./lotties/pending.json";
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

function Verified(props) {
  const classes = useStyles();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: props.message === "Verified" ? VerifiedAnim : PendingAnim,
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
          {props.message === "Verified" ? (
            <Grid container style={{ padding: 24 }}>
              <Grid item xs={12}>
                <Lottie options={defaultOptions} height={150} width={150} />
              </Grid>
              <Grid item xs={12} style={{ marginTop: 16 }}>
                <Typography variant="h6">
                  Congratulations! <br />
                  Your are a verified company inside Flamingo Jobs
                </Typography>
              </Grid>{" "}
              <Grid item xs={12} style={{ marginTop: 16 }}>
                <Typography>
                  If there is any issue, please contact our support center.
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid container style={{ padding: 24 }}>
              <Grid item xs={12}>
                <Lottie options={defaultOptions} height={200} width={400} />
              </Grid>
              <Grid item xs={12} style={{ marginTop: 16 }}>
                <Typography variant="h6">
                  Pending! <br />
                  We are reviewing your documents
                </Typography>
              </Grid>{" "}
              <Grid item xs={12} style={{ marginTop: 16 }}>
                <Typography>
                  If there is any issue, please contact our support center.
                </Typography>
              </Grid>
            </Grid>
          )}
        </FloatCard>
      </Grid>
    </Grid>
  );
}

export default Verified;
