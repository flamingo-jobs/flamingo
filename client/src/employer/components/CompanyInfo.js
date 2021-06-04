import React from 'react'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
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

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
        // width:auto,
    },
    bottom: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        marginLeft:125,
        marginTop:-10,
        maxWidth:200,
        marginBottom:30,
    },
    label: {
        alignSelf: 'left',
        marginRight: 15,
        backgroundColor: theme.palette.tagYellow
    },
    bottomLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    tagIcon: {
        color: theme.palette.tagIcon
    },
    favorite: {
        display: 'block',
        color: theme.palette.pinkyRed
    },
    body: {
        marginLeft: 130,
        marginTop: -108,
    },
    title: {
        fontWeight: 500,
        marginBottom: 5
    },
    infoTags: {
        marginTop: -10,
        marginBottom: 10,
        marginLeft:-9,
        marginRight: -20,
    },
    tag: {
        marginRight: 10,
        backgroundColor: 'white',
    },
    
    headerLeft: {
        display: 'flex',
        alignItems: 'center'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    logo: {
        borderRadius: 12,
        width:100,
        height:100,
    },
    company: {
        marginLeft: 10,
        fontWeight: 500
    },
    applyButton: {
        borderRadius: 12,
        backgroundColor: theme.palette.mediumTurquoise,
        color: theme.palette.white,
        "&:hover": {
            backgroundColor: theme.palette.vividSkyBlue,
        }
    },
    backcolor: {
        backgroundColor: theme.palette.mediumTurquoise,
    },
    button: {
        marginTop:-50,
        color:theme.palette.white,
        backgroundColor:theme.palette.frenchViolet,
        margin: theme.spacing(1),
    },
    billingPlan:{
        marginTop:-55,
        backgroundColor:theme.palette.gold,
    },
    listItem:{
        paddingTop:0,
        paddingBottom:0,
    },


}))

function CompanyInfo() {

    const classes = useStyles();
    const [value, setValue] = React.useState(2);

    return (
        

        <div className={classes.root}>

            <FloatCard>

            <div className={classes.header} >
                <div className={classes.headerLeft}>
                    <Avatar className={classes.logo} src={ifs} variant="square" />
                </div>
                <div>
                    
                    <Chip icon={<LoyaltyIcon />} label="Premium"  className={classes.billingPlan}/>

                    <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<EditIcon />}
                    >
                        Edit
                    </Button>

                </div>
            </div>

            <div className={classes.body} >

                <Typography variant="h5" className={classes.title} >IFS R&D International</Typography>


                <div className={classes.infoTags}>
                    <Chip icon={<LocationOnRoundedIcon />} label="Colombo, Sri Lanka" className={classes.tag} />
                    <Chip icon={<WorkRoundedIcon />} label="Full-time" className={classes.tag} />
                </div>

            </div>

            <div className={classes.bottom} >
                <div className={classes.bottomLeft} style={{ maxWidth: 10 }}>
                    <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="Development" className={classes.label} />
                    <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="DevOps" className={classes.label} />
                    <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="Quality Assurance" className={classes.label} />
                    
                </div>
            </div>
            <div>
                <Typography variant="body2" align="justify" style={{padding:20,paddingTop:10}}>
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
            </FloatCard>
        </div>
        
    )
}

export default CompanyInfo
