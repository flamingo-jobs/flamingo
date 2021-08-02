import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import FloatCard from "../../components/FloatCard";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import GetAppIcon from "@material-ui/icons/GetApp";
import Status from "./status";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import StatusModal from "./statusModal";
import axios from "axios";
import BACKEND_URL from "../../../Config";
import download from 'downloadjs';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
  cardContainer: {
    marginBottom: theme.spacing(2),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  label: {
    alignSelf: "left",
    marginRight: 15,
    backgroundColor: theme.palette.tagYellow,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  editButton: {
    "&:hover": {
      backgroundColor: theme.palette.white,
    },
  },
  editIcon: {
    color: theme.palette.tagIcon,
    "&:hover": {
      cursor: "pointer",
    },
  },
  tagIcon: {
    color: theme.palette.tagIcon,
  },
  favorite: {
    display: "block",
    color: theme.palette.pinkyRed,
  },
  body: {
    margin: 10,
  },
  title: {
    fontWeight: 500,
    marginLeft: 10,
  },
  infoTags: {
    margin: 10,
  },
  tag: {
    marginRight: 10,
    backgroundColor: "white",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    marginTop: 20,
  },
  footerLeft: {
    display: "flex",
    alignItems: "center",
  },
  footerRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    borderRadius: 12,
    width: 70,
    height: 70,
  },
  company: {
    marginLeft: 10,
    fontWeight: 500,
  },
  applyButton: {
    paddingLeft: "13px",
    paddingRight: "13px",
    borderRadius: 12,
    backgroundColor: theme.palette.vividSkyBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.vividSkyBlueHover,
    },
  },
  headerInfo: {
    display: "block",
  },
  tagline: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

// style={{border : "1px solid red"}}
function ApplicantCard(props) {
  const classes = useStyles();

  // Status modal
  const [open, setOpen] = useState(false);

  const jobId = window.location.pathname.split("/")[3];
  const [status, setStatus] = useState(
    props.jobseeker.applicationDetails.filter((item) => item.jobId === jobId)[0]
      .status
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleResumeDownload = async () => {
    const resumeName = props.jobseeker.applicationDetails.filter((item) => item.jobId === jobId)[0]
    .resumeName;
    try {
      const response = await axios.get(`${BACKEND_URL}/resume/${jobId}/${props.jobseeker._id}`,{
        responseType: 'blob'
      });
      return download(response.data, "Flamingo_Resume", "application/pdf");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.cardContainer}>
      <StatusModal 
        status={status}
        setStatus={setStatus}
        open={open}
        handleClose={handleClose}
        userId={props.jobseeker._id}
        jobId={props.jobId}
        setAlertData={props.setAlertData}
        handleAlert={props.handleAlert}
      ></StatusModal>

      <FloatCard>
        <div className={classes.root}>
          <div className={classes.header}>
            <div className={classes.headerLeft}>
              <Avatar className={classes.logo} variant="square" />
              <div className={classes.headerInfo}>
                <Typography variant="h5" className={classes.title}>
                  {props.jobseeker.name}
                </Typography>
                <Typography className={classes.tagline}>
                  {props.jobseeker.tagline}
                </Typography>
              </div>
            </div>
            <div className={classes.headerRight}>
              {status === "pending" && <Status status={status} text={"Pending...."}></Status>}
              {status === "shortlisted" && <Status status={status} text={"Shortlisted"}></Status>}
              {status === "selected" && <Status status={status} text={"Selected"}></Status>}
              <IconButton aria-label="delete" className={classes.editButton}>
                <EditIcon className={classes.editIcon} onClick={handleOpen}/>
              </IconButton>
            </div>
          </div>
          <div className={classes.body}>
            <Typography noWrap className={classes.description}>
              {props.jobseeker.intro}
            </Typography>
            <div className={classes.infoTags}>
              {props.jobseeker.education && props.jobseeker.education.length > 0 ? (
                <Chip
                  icon={<SchoolRoundedIcon />}
                  label={props.jobseeker.education[0].university}
                  className={classes.tag}
                />
              ) : null}
              {props.jobseeker.work.length > 0 ? (
                <Chip
                  icon={<WorkRoundedIcon />}
                  label={props.jobseeker.work[0].place}
                  className={classes.tag}
                />
              ) : null}
            </div>
          </div>

          <div className={classes.footer}>
            <div className={classes.footerLeft}></div>
            <div className={classes.footerRight}>
              <Button
                className={classes.applyButton}
                startIcon={<GetAppIcon />}
                onClick={handleResumeDownload}

              >
                Downlaod Resume
              </Button>
              <Button className={classes.applyButton}>View Profile</Button>
            </div>
          </div>
        </div>
      </FloatCard>
    </div>
  );
}

export default ApplicantCard;