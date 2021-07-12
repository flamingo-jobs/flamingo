import React from 'react'
import {  Link, makeStyles, withStyles } from '@material-ui/core'
import FloatCard from '../../../components/FloatCard';
import { Box, Grid, Container, Typography, Card, Paper, Button } from '@material-ui/core';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import { indigo } from '@material-ui/core/colors';
import CardMedia from '@material-ui/core/CardMedia';
import cardImage from '../images/profilePic.jpg';
import theme from '../../../Theme';
import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import LinearProgress from '@material-ui/core/LinearProgress';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    card: {
        boxShadow: indigo[75],
        textAlign: 'center',
        padding: theme.spacing(5, 0),
        color: "#3f51b5",
        backgroundColor: "white"
    },
    iconWrapper: {
        margin: 'auto',
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        width: theme.spacing(4),
        height: theme.spacing(3),
        justifyContent: 'center',
        marginBottom: theme.spacing(3),
        color: "#7986cb",
    },
    paperCont: {
        backgroundColor: indigo[50],
        color: indigo[600],
        padding: "15px 0px 15px 15px",
        borderRadius: 10,
        "&:hover": {
            defaultButton: {
                display: 'block'
            }
          }
      },
      media: {
        height: '100px',
        width: '100px',
        margin: 'auto',
        borderRadius: 20,
      },
      defaultButton: {
        color: theme.palette.white,
        borderRadius: 15,
        "&:hover": {
          backgroundColor: '#0088cc',
          color: 'white',
        }
      },
}));

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: theme.palette.stateBlue,
    },
  }))(LinearProgress);

function ProfileStatus() {
    const classes = useStyles();

    return (
        <FloatCard>
            <Grid container spacing={3} style={{padding: "20px"}}>
                <Grid item sm={12} md={3}>
                    <Typography component="div">
                        <CardMedia
                            className={classes.media}
                            image={cardImage}
                            alt="profile image"
                            zIndex="background"
                        />
                    </Typography>
                </Grid>
                <Grid item sm={12} md={8} style={{alignItems:"center",display: "flex"}}>
                    <div>
                        <Typography sx={{ opacity: 0.72 }} style={{fontSize:"30px",textAlign:"left",fontWeight:"bold",color: theme.palette.stateBlue}}>
                            Anne Shirley
                        </Typography>
                        <Typography variant="body2" component="p" sx={{ opacity: 0.72 }} style={{fontSize:"16px",textAlign:"left",}}>
                            <Link style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',color: theme.palette.tuftsBlue}}>
                            <span>View Profile</span><ChevronRightTwoToneIcon style={{marginTop:"-1px"}} />
                            </Link>
                        </Typography>
                    </div>
                </Grid>
                <Grid item sm={12} md={4} style={{alignItems:"center",display: "flex"}}>

                </Grid>
                <Grid item sm={12} style={{alignItems:"center",display: "flex"}}>
                    <div style={{width:"100%"}}>
                        <Typography  variant="body2" component="p" sx={{ opacity: 0.72 }} style={{fontSize:"16px",textAlign:"left", fontWeight:"bold", paddingBottom:"5px",color:"#666"}}>
                            Your profile is 40% complete
                        </Typography>
                        <BorderLinearProgress variant="determinate" value={40} />
                    </div>
                </Grid>
                <Grid item sm={12} style={{alignItems:"center",display: "flex"}}>
                    <div style={{width:"60%"}}>
                        <Typography  variant="body2" component="p" sx={{ opacity: 0.72 }} style={{fontSize:"15px",textAlign:"left", fontWeight:"bold",color:"#1976d2"}}>
                            Next : Add your experience
                        </Typography>
                    </div>
                    <div style={{width:"40%"}}>
                        <Button className={classes.defaultButton} style={{padding:"10px 15px 10px 15px",textTransform: 'none',backgroundColor:theme.palette.tuftsBlue}}>Finish Your Profile</Button>
                    </div>
                </Grid>
            </Grid>
        </FloatCard>
    )
}

export default ProfileStatus
