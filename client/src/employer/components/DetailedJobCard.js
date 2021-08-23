import React, { useState, useEffect } from 'react'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import FloatCard from '../../components/FloatCard';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { Doughnut, Pie } from 'react-chartjs-2';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    label: {
        alignSelf: 'left',
        marginRight: 15,
        backgroundColor: theme.palette.tagYellow
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    tagIcon: {
        color: theme.palette.tagIcon
    },
    favorite: {
        display: 'block',
        color: theme.palette.pinkyRed,
        "&:hover": {
            cursor: "pointer",
        },
    },
    body: {
        margin: 10
    },
    title: {
        fontWeight: 500,
        marginBottom: 5
    },
    infoTags: {
        marginTop: 10,
        marginBottom: 10
    },
    tag: {
        marginRight: 10,
        backgroundColor: 'white',
    },

    footerLeft: {
        display: 'flex',
        alignItems: 'center'
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    logo: {
        borderRadius: 12
    },
    company: {
        marginLeft: 10,
        fontWeight: 500
    },
    applyButton: {
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 12,
        backgroundColor: theme.palette.vividSkyBlue,
        color: theme.palette.white,
        "&:hover": {
            backgroundColor: theme.palette.vividSkyBlueHover,
        },
    },
    applicantButton: {
        marginTop: 16,
        marginLeft: 16,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 12,
        backgroundColor: theme.palette.lightSkyBlue,
        color: theme.palette.stateBlue,
        "&:hover": {
            backgroundColor: theme.palette.lightSkyBlueHover,
        }
    },
    activeChip: {
        marginLeft: 16,
        backgroundColor: theme.palette.green,
        color: theme.palette.black,
    },
    inactiveChip: {
        marginLeft: 16,
        backgroundColor: theme.palette.lightRed,
        color: theme.palette.black,
    },
}))

function EmployerJobCard(props) {

    const classes = useStyles();
    const { loading = false } = props;

    return (
        <FloatCard >
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <div className={classes.root}>
                        <div className={classes.header}>
                            <div className={classes.headerLeft}>
                                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label={props.info.category} className={classes.label} />
                                <Typography className={classes.time}><ReactTimeAgo date={props.info.postedDate} locale="en-US" /></Typography>
                                {props.info.isPublished ? (
                                    <Chip
                                        icon={<CheckCircleIcon />}
                                        label="Active"
                                        className={classes.activeChip}
                                    />
                                ) : (
                                    <Chip
                                        icon={<CancelIcon />}
                                        label="Inactive"
                                        className={classes.inactiveChip}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={classes.body} >
                            <Typography variant="h5" className={classes.title} >{props.info.title}</Typography>
                            <Typography noWrap className={classes.description} >{props.info.description}</Typography>
                            <div className={classes.infoTags}>
                                <Chip icon={<LocationOnRoundedIcon />} label={props.info.location} className={classes.tag} />
                                <Chip icon={<WorkRoundedIcon />} label={props.info.type} className={classes.tag} />
                            </div>
                        </div>
                        <div className={classes.footer} >
                            <div className={classes.footerRight} >
                                <Link to={`/employer/jobs/update/${props.info._id}`}><Button className={classes.applyButton}>View Job</Button></Link>
                                {props.info.applicationDetails.length ? <Link to={`/jobDescription/${props.info._id}`}><Button className={classes.applicantButton}>View Applicants</Button></Link> : null}
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    {props.info.applicationDetails.length ?
                        <Doughnut data={{
                            datasets: [
                                {
                                    data: props.values.map(x => x.value),
                                    backgroundColor: props.values.map(x => x.color),
                                    label: "Categories",

                                },
                            ],
                            labels: props.values.map(x => x.label),

                        }} options={{
                            plugins: {
                                datalabels: {
                                    display: true,
                                    anchor: 'center',
                                    clam: true,
                                    formatter: (val, ctx) => {
                                        return val + " - " + ctx.chart.data.labels[ctx.dataIndex];
                                    },
                                    font: {
                                        weight: 'bold',
                                    },
                                    color: 'white'

                                }
                            },
                        }} plugins={[ChartDataLabels]} width="100" /> :
                        <Typography style={{ position: 'relative', top: '50%' }}>No applications yet!</Typography>}
                </Grid>
            </Grid>

        </FloatCard>
    )
}

export default EmployerJobCard
