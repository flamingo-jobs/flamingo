import React from 'react'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import ifs from '../images/ifs.png';
import FloatCard from './FloatCard';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
        width:650,
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
                <Typography variant="body2">
                Industrial and Financial Systems, commonly referred to as IFS, is a multinational company that develops and delivers 
                enterprise software to customers who manufacture and distribute goods, maintain assets and manage service-focused operations. 
                Founded in 1983, it is headquartered in Linköping, Sweden, and has local offices worldwide in over 16 countries including Sri Lanka, 
                Sweden, UK, USA. As per the status quo of the company, IFS has over 4000 employees that serve over 10000 customers worldwide via 
                their local offices and partner companies. The industry expertise achieved by IFS through years of experience in the industry, 
                the expertise of its people, and their growing ecosystem of clientele have made IFS a recognized leader in the industry. 

                IFS operates in the Enterprise Resource Planning, Enterprise Asset Management, and Field Service Management genres and has
                acquired over $826 million in revenue in the year 2020. The ERP solution provided by IFS is often acclaimed as one of the 
                top five ERP solutions in the world. They operate with the primary goals of being agile, collaborative, and trustworthy 
                and has achieved some prestigious clientele over the years of operation. IFS provides solutions for clients in many sectors, 
                including Aerospace and Defense, Food and Beverages, Energy and Utilities, Engineering and Construction, Manufacturing, Oil and Gas, 
                Telecommunications, Service Industries. 

    

                </Typography>
            </div>
            </FloatCard>
        </div>
        
    )
}

export default CompanyInfo
