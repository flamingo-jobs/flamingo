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
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { useState, useEffect } from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginLeft: 10,
    marginRight: 10,
  },
  cardTitle:{
    fontWeight: "bolder",
    fontSize: 15,
    color: theme.palette.stateBlue,
    marginBottom: 20,
    float: "center",
  },
  cardNumber:{
    fontWeight: "bolder",
    fontSize: 40,
    color: theme.palette.stateBlue,
    float: "center",
  },
  pieChart:{
    width:100,
    height:100,
    padding: '0 0 0 0',
    marginTop: -200,
    marginBottom: -200,
    marginLeft: 100,
  }

}));

const TopCards = () => {
    
    const classes = useStyles();
    const [data1, setData1] = React.useState([
        { region: 'Asia', val: 244 },
        { region: 'Africa', val: 100 },
    ]);

    const [data2, setData2] = React.useState([
        { region: 'Asia', val: 28 },
        { region: 'Africa', val: 200 },
    ]);

    const [data3, setData3] = React.useState([
        { region: 'Asia', val: 2 },
        { region: 'Africa', val: 100 },
    ]);
   
   
   
  
    return (
    <Grid container direction="row" xs={12} spacing={1} className={classes.root}>

        <Grid item xs={4}>
            <FloatCard>
                <Grid container direction="row" xs={12} spacing={2}>
                    <Grid item xs={1}>
                        <Typography variant="body2" className={classes.cardTitle}>
                            APPLICATIONS
                        </Typography>
                        <Typography variant="h5" className={classes.cardNumber}>
                            244
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                  
                        <Chart
                            data={data1}
                            className={classes.pieChart}
                            >
                            <PieSeries
                                valueField="val"
                                argumentField="region"
                                innerRadius={0.6}
                            />
                            <Animation />
                        </Chart>
               
                    </Grid>
                </Grid>
                
            </FloatCard>
        </Grid>

        <Grid item xs={4}>
        <FloatCard>
                <Grid container direction="row" xs={12} spacing={2}>
                    <Grid item xs={1}>
                        <Typography variant="body2" className={classes.cardTitle}>
                            SHORTLISTED
                        </Typography>
                        <Typography variant="h5" className={classes.cardNumber}>
                            126
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                  
                        <Chart
                            data={data2}
                            className={classes.pieChart}
                            >
                            <PieSeries
                                valueField="val"
                                argumentField="region"
                                innerRadius={0.6}
                            />
                            <Animation />
                        </Chart>
               
                    </Grid>
                </Grid>
                
            </FloatCard>
        </Grid>

        <Grid item xs={4}>
        <FloatCard>
                <Grid container direction="row" xs={12} spacing={2}>
                    <Grid item xs={1}>
                        <Typography variant="body2" className={classes.cardTitle}>
                            ONHOLD
                        </Typography>
                        <Typography variant="h5" className={classes.cardNumber}>
                            12
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                  
                        <Chart
                            data={data3}
                            className={classes.pieChart}
                            >
                            <PieSeries
                                valueField="val"
                                argumentField="region"
                                innerRadius={0.6}
                            />
                            <Animation />
                        </Chart>
               
                    </Grid>
                </Grid>
                
            </FloatCard>
        </Grid>
     
      
    </Grid>
  );
};

export default TopCards;
