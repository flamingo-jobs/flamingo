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
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import Box from "@material-ui/core/Box";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  notificationsIcon:{
    color: theme.palette.stateBlue,
    marginTop: 5,
  },
  notificationsIconSmall:{
    width: 20,
    height:20,
    color: theme.palette.blueJeans,
  },
  notificationCard:{
    backgroundColor: theme.palette.greenyLightSky,
    marginTop: 10,
    padding: 5,
  },
  button:{
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    margin: 10,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  }
}));

const DashboardNotifications = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FloatCard>
        <Typography variant="h6" className={classes.title}>
          Notifications
        </Typography>
        <NotificationsIcon className={classes.notificationsIcon}/>

        <Card className={classes.notificationCard}>
            <Grid container direction="row" xs={12}>
                <Grid item xs={2}>
                    <NotificationsIcon className={classes.notificationsIconSmall}/>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body2" className={classes.notificationsText}>
                        Your billing plan expires in 2 days
                    </Typography>
                </Grid>
            </Grid>  
        </Card>

        <Card className={classes.notificationCard}>
            <Grid container direction="row" xs={12}>
                <Grid item xs={2}>
                    <NotificationsIcon className={classes.notificationsIconSmall}/>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body2" className={classes.notificationsText}>
                        You received a new resumes for the job Software Engineer
                    </Typography>
                </Grid>
            </Grid>  
        </Card>

        <Card className={classes.notificationCard}>
            <Grid container direction="row" xs={12}>
                <Grid item xs={2}>
                    <NotificationsIcon className={classes.notificationsIconSmall}/>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body2" className={classes.notificationsText}>
                        Your billing plan expires in 2 days
                    </Typography>
                </Grid>
            </Grid>  
        </Card>

        <Card className={classes.notificationCard}>
            <Grid container direction="row" xs={12}>
                <Grid item xs={2}>
                    <NotificationsIcon className={classes.notificationsIconSmall}/>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body2" className={classes.notificationsText}>
                    You received 2 new resumes for the job DevOps Engineer
                    </Typography>
                </Grid>
            </Grid>  
        </Card>

        <Button
              onClick={() => {
                window.location = "";
              }}
              className={classes.button}
            >
              View All
            </Button>

      </FloatCard>
    </div>
  );
};

export default DashboardNotifications;
