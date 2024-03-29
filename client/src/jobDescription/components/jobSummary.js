import { Avatar, Button, Chip, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import ReactTimeAgo from 'react-time-ago';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL, { FILE_URL } from "../../Config";
import LoginModal from "./loginModal";
import PeopleIcon from '@material-ui/icons/People';
import { useDispatch } from "react-redux";
import { setSavedJobCount } from "../../redux/actions";


const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  summaryContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 8,
    marginBottom: 15,
  },
  jobTitle: {
    fontWeight: 600,
    textAlign: "left",
    color: theme.palette.black,
  },
  companyIcon: {
    borderRadius: "12px",
  },
  companyName: {
    textAlign: "left",
    color: theme.palette.black,

  },
  companyAddress: {
    textAlign: "left",
    color: theme.palette.black,

  },
  jobCategory: {
    color: theme.palette.tagIcon,
  },
  jobDetailsContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: "left",
    marginBottom: theme.spacing(4),
  },
  applyBtn: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.lightSkyBlue,

    }
  },
  savBtn: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: 'transparent',
    color: theme.palette.tuftsBlue,
    "&:hover": {
      backgroundColor: theme.palette.lightSkyBlue,
    }
  },
  header: {
    display: 'block',
    textAlign: "left",
    margin: 10,
    marginLeft: 0
  },
  headerMain: {
    display: 'flex',
    textAlign: "left",
    marginTop: 20,
    marginBottom: 20
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
    color: theme.palette.pinkyRed
  },
  body: {
    margin: 10,
    marginLeft: 0
  },
  title: {
    fontWeight: 500,
  },
  companyName: {
    fontWeight: 400,
  },
  infoTags: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center'
  },
  tag: {
    marginRight: 10,
    backgroundColor: 'white',
  },
  vacanciyContainer: {
    textAlign: 'left',
  },
  type: {
    display: "flex",
    gap: "5px",
    marginBottom: 10,
  },
  typeIcon: {
    color: theme.palette.black,
  },
  typeText: {
    color: theme.palette.black,
  },
  numOfVacancies: {
    fontWeight: 500,
    color: theme.palette.black,
  },
  headerInfo: {
    display: 'block',
    marginLeft: 10
  },
  logo: {
    borderRadius: 12,
    width: 60,
    height: 60
  },
  varifiedBadge: {
    marginLeft: "0.1em",
    width: "0.7em",
    height: "0.7em"
  }
}));

function JobSummary(props) {
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();

  // Login modal 
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState(require(`../../components/images/loadingImage.gif`).default);
  const [verified, setVerified] = useState(false)

  // Alert related states
  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginModal = () => {
    handleOpen();
  }

  // Error related stuff
  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };

  useEffect(() => {
    loadLogo();
    getVerificationStatus();
  }, [])

  const loadLogo = async () => {
    await axios.get(`${FILE_URL}/employer-profile-pictures/${props.job.organization.id}.png`).then(res => {
      setLogo(`${FILE_URL}/employer-profile-pictures/${props.job.organization.id}.png`);
    }).catch(error => {
      setLogo(require(`../../employer/images/default_company_logo.png`).default);
    })
  }

  const getVerificationStatus = () => {
    axios
      .get(`${BACKEND_URL}/employer/verificationStatus/${props.job.organization.id}`)
      .then((res) => {
        if (res.data.success) {
          if (res.data.verificationStatus === "Verified") setVerified(true);
        }
      })
      .catch((err) => {
        if (err) {
          setVerified(false);
        }
      });
  };

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  const handleSavingJob = async () => {
    let newSavedJobIds = [];
    const isSaved = props.isSaved;

    props.setIsSaved(!props.isSaved);

    if (props.isSaved) { // Unsave
      newSavedJobIds = props.savedJobIds.filter((id) => id !== props.job._id);
    } else { // Save
      newSavedJobIds = [...props.savedJobIds, props.job._id];
    }

    props.setSavedJobIds(newSavedJobIds);
    try {
      const response = await axios.patch(`${BACKEND_URL}/jobseeker/updateSavedJobs/${props.userId}`, newSavedJobIds);
      if (response.data.success) {
        dispatch(setSavedJobCount(newSavedJobIds.length));
      }
    } catch (err) {
      // console.log(err);
      props.setIsSaved(isSaved);

      setAlertData({
        severity: "error",
        msg: "Sorry, Job could not be saved. Please try again later.",
      });
      handleAlert();
    }
  }

  const displaySaveForLater = () => {
    if (props.userRole !== "employer" && props.userRole !== "admin") {
      if (props.userRole === "jobseeker") {
        if (props.isSaved) {
          return (
            <Button
              className={classes.savBtn}
              onClick={handleSavingJob}
            >
              <BookmarkIcon />Saved
            </Button>
          );
        } else {
          return (
            <Button
              className={classes.savBtn}
              onClick={handleSavingJob}
            >
              <BookmarkBorderRoundedIcon />Save for later
            </Button>
          );
        }
      } else {
        return (
          <Button
            className={classes.savBtn}
            onClick={handleLoginModal}
          >
            <BookmarkBorderRoundedIcon />Save for later
          </Button>
        );
      }

    }
  }

  const displayApplyButton = () => {
    if (props.userRole !== "employer" && props.userRole !== "admin") {
      if (props.isSignedIn && !props.isApplied) {
        return (
          <ScrollLink to="applyForm" smooth={true} duration={1000}>
            <Button className={classes.applyBtn}>
              Apply For This Job
            </Button>
          </ScrollLink>
        );
      }

      if (!props.isSignedIn) {
        return (
          <Button className={classes.applyBtn} onClick={handleLoginModal}>
            Apply For This Job
          </Button>);
      }

      if (props.isApplied) {
        return (
          <Tooltip title="You Can Upload Your CV Again Using the Applied Jobs Page">
            <div>
              <Button disabled className={classes.applyBtn}>
                Already Applied
              </Button>
            </div>
          </Tooltip>
        );
      }
    }
  }
  // style={{border: "1px solid red"}}

  
  const numOfApplicants = () => {
    if(props.job.applicationDetails?.length === 1){
      return `${props.job.applicationDetails.length} applicant`;
    }
    return `${props.job.applicationDetails.length} applicants`;
  }

  const numOfVacancies = () => {
    if(props.job.numberOfVacancies > 0){
      return (
        <Typography>
          <span className={classes.numOfVacancies}>
            Number of vacancies:<span>&nbsp;&nbsp;</span>
          </span>
          {props.job.numberOfVacancies}
        </Typography>
      );
    }
  }

  const getFormattedDate = (date) => {
    const dateStr = date.toString().slice(0, 10).replaceAll("-", "/");
    return dateStr;
  };

  return (
    <Container>
      {displayAlert()}

      <LoginModal
        open={open}
        handleClose={handleClose}
        jobId={props.job._id}
      ></LoginModal>

      <Container className={classes.summaryContainer}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={8}>
            <div className={classes.header}>
              <div className={classes.infoTags} style={{ marginTop: 0 }}>
                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label={props.job.category} className={classes.label} />
                <Typography className={classes.time}><ReactTimeAgo date={props.job.postedDate} locale="en-US" /></Typography>
              </div>
              <div className={classes.headerMain}>
                <Avatar className={classes.logo} src={logo} variant="square" />
                <div className={classes.headerInfo}>
                  <Typography variant="h5" className={classes.title} >{props.job.title}</Typography>
                  <Typography variant="h6" className={classes.companyName} >{props.job.organization.name}{verified?<VerifiedUserIcon className={classes.varifiedBadge} color="primary" />:""}</Typography>
                </div>
              </div>

            </div>
            <div className={classes.body} >

              <div className={classes.infoTags}>
                <Chip icon={<LocationOnRoundedIcon />} label={props.job.location} className={classes.tag} />
                <Chip icon={<WorkRoundedIcon />} label={props.job.type} className={classes.tag} />
                <Chip icon={<PeopleIcon />} label={numOfApplicants()} className={classes.tag} />
              </div>

              <div className={classes.type}>
                <Typography variant="subtitle2" className={classes.typeText}>
                  Due Date: <span>&nbsp;</span>{getFormattedDate(props.job.dueDate)}
                </Typography>
              </div>

              <div className={classes.vacanciyContainer}>
                {numOfVacancies()}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} align="center">
            {displaySaveForLater()}
            {displayApplyButton()}

          </Grid>
        </Grid>
      </Container>
      <Container className={classes.jobDetailsContainer}>
        <Typography>{props.job.description}</Typography>
      </Container>
    </Container>
  );
}

export default JobSummary;
