import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  makeStyles,
  useTheme,
  Avatar,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginLeft: 10,
    marginRight: 10,
  },
  cardTitle:{
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    marginBottom: 20,
    float: "center",
  }

}));

const Aquisitions = () => {
    const classes = useStyles();
  
    return (
    <Grid container direction="row" xs={12} spacing={3} className={classes.root}>

        <Grid item xs={4}>
            <FloatCard>
                <Typography variant="h6" className={classes.cardTitle}>
                    APPLICATIONS
                </Typography>
            </FloatCard>
        </Grid>

        <Grid item xs={4}>
            <FloatCard>
                <Typography variant="h6" className={classes.cardTitle}>
                    SHORTLISTED
                </Typography>
            </FloatCard>
        </Grid>

        <Grid item xs={4}>
            <FloatCard>
                <Typography variant="h6" className={classes.cardTitle}>
                    ON-HOLD
                </Typography>
  
            </FloatCard>
        </Grid>
     
      
    </Grid>
  );
};

export default Aquisitions;
