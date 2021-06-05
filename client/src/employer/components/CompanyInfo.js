import React from 'react'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import ifs from '../images/ifs.png';
import FloatCard from './FloatCard';
import EditIcon from '@material-ui/icons/Edit';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import TurnedInNotTwoToneIcon from '@material-ui/icons/TurnedInNotTwoTone';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import LanguageIcon from '@material-ui/icons/Language';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
    },
    header:{

    },
    body:{

    },
    logoItem:{
        marginLeft:10,
        marginTop:10,
    },
    logo:{
        borderRadius: 12,
        width:125,
        height:125,
    },
    info:{
        marginLeft:150,
        marginTop:-130,

    },
    infoTags:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        marginTop:-10,
        maxWidth:200,
        marginBottom:15,

    },
    companyDescription:{
        paddingTop:-25,
        paddingLeft:20,
        paddingRight:20,
    },
    companyName:{
        fontWeight: 500,
        marginBottom: 5,
    },
    membershipType:{
        marginTop:-55,
        backgroundColor:theme.palette.gold,
    },
    listItem:{
        paddingTop:0,
        paddingBottom:0,
    },
    editButton:{
        marginTop:-90,
        marginLeft:110,
        // color:theme.palette.white,
        // backgroundColor:theme.palette.frenchViolet,
        margin: theme.spacing(1),
        padding:theme.spacing(1),
    },
    locationTags:{
        marginTop: -50,
        marginBottom: 10,
        marginLeft:-14,
        marginRight: -20,
    },
    tag:{
        marginRight: 10,
        backgroundColor: 'white',
    },
    label: {
        alignSelf: 'left',
        marginRight: 15,
        marginBottom:5,
        backgroundColor: theme.palette.tagYellow
    },
    headerRight:{
        marginLeft:260,
    },
    rating:{
        marginTop:-25,
    },
    ratingText:{
        marginTop:-35,
        marginLeft:130,
    },
    smIcons:{
        marginLeft:-14,
        marginTop:-25,
    }


}))



function CompanyInfo() {

    const classes = useStyles();
    const [value, setValue] = React.useState(2);

    return (
        

        <div className={classes.root}>

            <FloatCard>

                <Grid item container  direction="row" spacing={1}>

                    {/* HEAD PART OF THE COMPANY INFO CARD */}

                        <Grid xs={12} item container  direction="column" spacing={1} className={classes.header}>

                            {/* LOGO */}

                            <Grid item xs={3} className={classes.logoItem}>
                                <Avatar className={classes.logo} src={ifs} variant="square" />
                            </Grid>

                            {/* OTHER INFO NEXT TO LOGO */}

                            <Grid item container xs={9} direction="row" spacing={1} className={classes.info}>

                            {/* PANEL 01 FOR COMPANY NAME, MEMBERSHIP TYPE AND EDIT BUTTON */}

                                <Grid item xs={9}>
                                    <Typography variant="h5" className={classes.companyName} >IFS R&D International</Typography>

                                    <div className={classes.headerRight}>
                                        <Chip icon={<LoyaltyIcon />} label="Premium"  className={classes.membershipType}/>

                                        <IconButton variant="outlined" aria-label="edit" className={classes.editButton}>
                                            <EditIcon />
                                        </IconButton>

                                    </div>
 
                                </Grid>

                                {/* PANEL 02 FOR LOCATION AND JOB TYPE */}

                                <Grid item xs={9}>

                                    <div className={classes.locationTags}>
                                        <Chip icon={<LocationOnRoundedIcon />} label="Colombo, Sri Lanka" className={classes.tag} />
                                        <Chip icon={<WorkRoundedIcon />} label="Full-time" className={classes.tag} />
                                    </div>
                                        
                                </Grid>

                                {/* PANEL 03 FOR STAR RATING DISPLAY */}

                                <Grid item xs={9}>

                                    <div className={classes.rating}>
                                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    </div>  

                                    <div className={classes.ratingText}>
                                        <Typography>
                                            <Box fontSize={14} fontWeight="fontWeightMedium" m={1}>
                                                3.5 stars (124)
                                            </Box>
                                        </Typography>

                                    </div>  
                                        
                                </Grid>

                                {/* PANEL 04 FOR SOCIAL MEDIA LINKS */}

                                <Grid container item xs={9} className={classes.smIcons}>

                                    <Grid item xs={1}>
                                        <IconButton variant="outlined" aria-label="website">
                                            <LanguageIcon />
                                        </IconButton>
                                    </Grid>

                                    <Grid item xs={1}>
                                        <IconButton variant="outlined" aria-label="linkedin">
                                            <LinkedInIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton variant="outlined" aria-label="twitter">
                                            <TwitterIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton variant="outlined" aria-label="edit">
                                            <FacebookIcon />
                                        </IconButton>
                                    </Grid>       
                                </Grid>

                            </Grid>
                                

                        </Grid>



                    {/* BODY PART OF THE COMPANY INFO CARD */}

                    <Grid item xs={12}>


                        <div className={classes.infoTags}>

                            <div>
                                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="Full Stack Development" className={classes.label} />
                                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="DevOps" className={classes.label} />
                                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="Quality Assurance" className={classes.label} />
                            </div>

                            <div>
                                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="Data Science" className={classes.label} />
                                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="Software Engineering" className={classes.label} />
                                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="Business Analysis" className={classes.label} />
                                

                            </div>

                            <div>
                                
                                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="ERP Condulting" className={classes.label} />
                                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="R & D" className={classes.label} />
                                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="Project Management" className={classes.label} />
                            </div>
                            
                            
                            
                    
                        </div>
                    </Grid>

                    <Grid item xs={12} className={classes.body}>
            
                        <div className={classes.companyDescription}>
                            <Typography variant="body2" align="justify">
                            IFS develops and delivers enterprise software for companies around the world who manufacture and distribute goods, 
                            build and maintain assets, and manage service-focused operations. Within our single platform, our industry specific 
                            products are innately connected to a single data model and use embedded digital innovation so that our customers can 
                            be their best when it really matters to their customers – at the Moment of Service. The industry expertise of our people 
                            and of our growing ecosystem, together with a commitment to deliver value at every single step, has made IFS a recognized 
                            leader and the most recommended supplier in our sector. Our team of 4,000 employees every day live our values of agility, 
                            trustworthiness and collaboration in how we support our 10,000+ customers.

                            <br/><br/>
                            We provide solutions in:

                            </Typography>

                            <List component="nav" aria-label="main mailbox folders" >

                                <ListItem className={classes.listItem}>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                <ListItemText primary="Enterprise Asset Management" />
                                </ListItem>

                                <ListItem  className={classes.listItem}>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Field Service Management" />
                                </ListItem>

                                <ListItem className={classes.listItem}>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Enterprise Resource Planning" />
                                </ListItem>

                            </List>
   
                        </div>
    
                    </Grid>

                </Grid>

            </FloatCard>

        </div>
        
    )
}

export default CompanyInfo