import {
  Avatar,
  Chip, Container, Grid, IconButton, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import TodayIcon from "@material-ui/icons/Today";
import WorkIcon from "@material-ui/icons/Work";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import FloatCard from "../../../components/FloatCard";
import BACKEND_URL, { FILE_URL } from "../../../Config";
import DeleteModal from "./deleteModal";
import JobSummaryModal from "./jobSummaryModal";
const jwt = require("jsonwebtoken");

const useStyles = makeStyles((theme) => ({
  summaryContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  label: {
    alignSelf: "left",
    marginRight: 15,
    backgroundColor: theme.palette.tagYellow,
  },
  activeChip: {
    alignSelf: "left",
    marginRight: 15,
    backgroundColor: "#4caf50",
    color: theme.palette.white,
    fontWeight: 500,
  },
  inactiveChip: {
    alignSelf: "left",
    marginRight: 15,
    backgroundColor: "#f44336",
    color: theme.palette.white,
    fontWeight: 500,
  },
  tagIcon: {
    color: theme.palette.tagIcon,
  },
  activeIcon: {
    color: theme.palette.white,
  },
  inactiveIcon: {
    color: theme.palette.white,
  },
  jobTitle: {
    fontSize: "23px",
    fontWeight: 600,
    textAlign: "left",
    color: theme.palette.black,
  },
  companyIcon: {
    borderRadius: "12px",
    width: 50,
    height: 50,
  },
  companyName: {
    textAlign: "left",
    color: theme.palette.black,
    fontSize: "17px",
    fontWeight: 500,
  },
  companyAddress: {
    textAlign: "left",
    color: theme.palette.black,
  },
  jobDetailsContainer: {
    textAlign: "left",
    marginBottom: theme.spacing(4),
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  createIcon: {
    fontSize: "20px",
    color: theme.palette.tagIcon,
    transition: "0.3s",
    "&:hover": {
      transition: "0.3s",
      color: theme.palette.black,
    },
  },
  minEducation: {
    fontWeight: 600,
  },
  minExperience: {
    fontWeight: 600,
  },
  salary: {
    fontWeight: 600,
  },
  numOfVacancies: {
    fontWeight: 600,
  },
  description: {
    marginTop: theme.spacing(2),
    color: theme.palette.black,
  },
  locationAndType: {
    width: "100%",
    display: "flex",
    gap: "30px",
    marginTop: "12px",
  },
  location: {
    display: "flex",
    gap: "10px",
  },
  type: {
    display: "flex",
    gap: "10px",
  },
  locationIcon: {
    color: "#666",
  },
  locationText: {
    color: "#666",
  },
  typeIcon: {
    color: "#666",
  },
  typeText: {
    color: "#666",
  },
  time: {
    padding: "4px 0px",
    marginLeft: "10px",
  },
  deleteBtnContainer: {
    height: "100%",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
  },
  deleteBtn: {
    padding: "0px",
    paddingTop: "9px",
    "&:hover": {
      background: theme.palette.white,
    },
  },
  deleteIcon: {
    color: theme.palette.tagIcon,
    transition: "0.3s",
    "&:hover": {
      color: theme.palette.red,
      transition: "0.3s",
    },
  },
}));

const getFormattedDate = (date) => {
  // console.log("Due date", date);
  const dateStr = date.toString().slice(0, 10).replaceAll("-", "/");
  return dateStr;
};

function JobSummary(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [updatedFields, setUpdatedFields] = useState([]);
  const userId = jwt.decode(sessionStorage.getItem("userToken"),{complete:true}).payload.userId;
  const [logo, setLogo] = useState(require(`../../../components/images/loadingImage.gif`).default);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const minEducationList = [
    "Diploma",
    "Graduate Diploma",
    "Bachelor's",
    "Bachelor's Honours",
    "M.Phil.",
    "PhD",
  ];

  const minExperienceList = ["0", "0-1", "1-3", "+3"];

  useEffect(() => {
    loadLogo();
  }, [])
  
  const loadLogo = async () => {
    await axios.get(`${FILE_URL}/employer-profile-pictures/${props.job.organization.id}.png`).then(res => {
      setLogo(`${FILE_URL}/employer-profile-pictures/${props.job.organization.id}.png`);
    }).catch(error => {
      setLogo(require(`../../../employer/images/default_company_logo.png`).default);
    })
  }

  // delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleSummaryChange = (e) => {
    const newJob = { ...props.job };
    const newErrors = {...props.errors};

    if (e.target.name === "min" || e.target.name === "max" || e.target.name === "numberOfVacancies") {
      const regex = new RegExp('^[0-9]+$');
      const name = e.target.name;
      const value = e.target.value;

      if(value.trim() === ""){
        if(name === "min" || name === "max"){
          delete newErrors[name];
        }
        else if(name === "numberOfVacancies"){
          delete newErrors[name];
        }
      } else {
        if(regex.test(value.trim().replace(/\s/g, ''))){
          delete newErrors[name];
        } else {
          if(name === "min" || name === "max"){
            newErrors[name] = "Salary can only contain numbers.";
          }
          else if(name === "numberOfVacancies"){
            newErrors[name] = "Number of vacancies cannot contain numbers.";
          }
          
        }
      }

      if(name === "min" || name === "max"){
        newJob.salaryRange[e.target.name] = value;
        if(!updatedFields.includes(e.target.name + " salary")){
          setUpdatedFields([...updatedFields, e.target.name+" salary"]);
        }
      }
      else if(name === "numberOfVacancies"){
        newJob.numberOfVacancies = value;
        if(!updatedFields.includes(e.target.name)){
          setUpdatedFields([...updatedFields, e.target.name]);
        }
      }
      
    } 
    else if (e.target.name === "isPublished") {
      newJob[e.target.name] = e.target.checked;
      if(!updatedFields.includes(e.target.name)){
        setUpdatedFields([...updatedFields, e.target.name]);
      }

    } 
    else if(e.target.name === "title" || e.target.name === "description"){
      const name = e.target.name;
      const value = e.target.value;

      if(value.trim() === ""){
        newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be empty.`;
      } else{
        delete newErrors[name];
      }
      newJob[e.target.name] = value;
      if(!updatedFields.includes(e.target.name)){
        setUpdatedFields([...updatedFields, e.target.name]);
      }

    } 
    else {
      newJob[e.target.name] = e.target.value;
      if(!updatedFields.includes(e.target.name)){
        setUpdatedFields([...updatedFields, e.target.name]);
      }
    }
    props.setErrors(newErrors);
    props.setJob(newJob);
  };

  const handleDueDateChange = (date) => {
    const newJob = { ...props.job };
    newJob.dueDate = date;
    props.setJob(newJob);
    if(!updatedFields.includes("dueDate")){
      setUpdatedFields([...updatedFields, "dueDate"]);
    }
  };

  // console.log("updated fields", updatedFields);
  const handleSummarySubmit = async (e) => {
    e.preventDefault();

    if(props.errors.hasOwnProperty("title") || 
      props.errors.hasOwnProperty("description") ||
      props.errors.hasOwnProperty("min") ||
      props.errors.hasOwnProperty("max") ||
      props.errors.hasOwnProperty("numberOfVacancies")){
      return;
    }
    
    const updateFields = {
      title: props.job.title.trim(),
      category: props.job.category,
      type: props.job.type,
      description: props.job.description.trim(),
      location: props.job.location,
      dueDate: props.job.dueDate,
      salaryRange: {
        min: props.job.salaryRange.min.trim(),
        max: props.job.salaryRange.max.trim(),
      },
      isPublished: props.job.isPublished,
      minimumEducation: props.job.minimumEducation,
      minimumExperience: props.job.minimumExperience,
      numberOfVacancies: props.job.numberOfVacancies
    };

    try {
      const response = await axios.put(
        `${BACKEND_URL}/jobs/update/${props.jobId}`,
        updateFields
      );

      if(response.data.success){
        handleClose();
        props.setAlertData({
          severity: "success",
          msg: "Changes saved successfully!",
        });
        props.handleAlert();
        await axios.get(`${BACKEND_URL}/jobs/generateRecommendations/${props.jobId}`);
        const msg = "Job updated";
        const status = "informational";
        await axios.post(`${BACKEND_URL}/logs/create/${props.job._id}/${userId}`, {msg: msg, status: status, updatedFields: updatedFields});
        setUpdatedFields([]);
      }
      // console.log(response);
    } catch (err) {
      handleClose();
      props.setAlertData({
        severity: "error",
        msg: "Changes could not be applied",
      });
      props.handleAlert();
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/jobs/delete/${props.jobId}`
      );
      if (response.data.success) {
        props.setAlertData({
          severity: "success",
          msg: "Job deleted successfully",
        });
        props.handleAlert();
        const msg = "Job deleted";
        const status = "informational";
        await axios.post(`${BACKEND_URL}/logs/create/${props.job._id}/${userId}`, {msg: msg, status: status});
        
        window.location = "/employer/jobs";
      } else {
        props.setAlertData({
          severity: "error",
          msg: "Somethig went wrong",
        });
        props.handleAlert();
      }
    } catch {
      props.setAlertData({
        severity: "error",
        msg: "Somethig went wrong",
      });
      props.handleAlert();
    }
  };

  // style={{border: "1px solid red"}}
  return (
    <>
      <DeleteModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
      ></DeleteModal>

      <JobSummaryModal
        job={props.job}
        categories={props.categories}
        types={props.types}
        locations={props.locations}
        open={open}
        handleClose={handleClose}
        handleSummaryChange={handleSummaryChange}
        handleSummarySubmit={handleSummarySubmit}
        handleDueDateChange={handleDueDateChange}
        minEducationList={minEducationList}
        minExperienceList={minExperienceList}
        errors={props.errors}
      ></JobSummaryModal>

      <FloatCard>
        <Container className={classes.summaryContainer}>
          <Grid container>
            <Grid item container>
              <Grid item container xs={10}>
                <Chip
                  icon={<LocalOfferRoundedIcon className={classes.tagIcon} />}
                  label={props.job.category}
                  className={classes.label}
                />
                {/* ClearIcon */}
                <Chip
                  icon={
                    props.job.isPublished ? (
                      <CheckCircleIcon className={classes.activeIcon} />
                    ) : (
                      <CancelIcon className={classes.inactiveIcon} />
                    )
                  }
                  label={props.job.isPublished ? "Active" : "Inactive"}
                  className={ props.job.isPublished ? classes.activeChip : classes.inactiveChip }
                />
                <div className={classes.time}>
                  <Typography>
                    <ReactTimeAgo date={props.job.postedDate} locale="en-US" />
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={1}>
                <div className={classes.deleteBtnContainer}>
                  <IconButton
                    className={classes.deleteBtn}
                    onClick={handleOpenDeleteModal}
                  >
                    <DeleteIcon className={classes.deleteIcon} />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={1}>
                <IconButton className={classes.iconButton} onClick={handleOpen}>
                  <CreateIcon className={classes.createIcon} />
                </IconButton>
              </Grid>
            </Grid>

            <Grid item container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  className={classes.companyIcon}
                  src={logo}
                  variant="square"
                ></Avatar>
              </Grid>
              <Grid item>
                <Typography className={classes.jobTitle}>
                  {props.job.title}
                </Typography>
                <Typography className={classes.companyName}>
                  {props.job.organization.name}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.locationAndType}>
                <div className={classes.location}>
                  <LocationOnIcon
                    fontSize="small"
                    className={classes.locationIcon}
                  ></LocationOnIcon>
                  <Typography
                    variant="subtitle2"
                    className={classes.locationText}
                  >
                    {props.job.location}
                  </Typography>
                </div>

                <div className={classes.type}>
                  <WorkIcon
                    fontSize="small"
                    className={classes.typeIcon}
                  ></WorkIcon>
                  <Typography variant="subtitle2" className={classes.typeText}>
                    {props.job.type}
                  </Typography>
                </div>

                <div className={classes.type}>
                  <TodayIcon
                    fontSize="small"
                    className={classes.typeIcon}
                  ></TodayIcon>
                  <Typography variant="subtitle2" className={classes.typeText}>
                    {getFormattedDate(props.job.dueDate)}
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <Typography align="left" className={classes.description}>
                  <span className={classes.minEducation}>
                    Minimum Education:{" "}
                  </span>
                  {props.job.minimumEducation}
                </Typography>
              </div>

              <div>
                <Typography align="left" className={classes.description}>
                  <span className={classes.minExperience}>
                    Minimum Experience:{" "}
                  </span>
                  {props.job.minimumExperience} years
                </Typography>
              </div>

              <div>
                {props.job.salaryRange.min !== "" &&
                  props.job.salaryRange.max !== "" && (
                    <Typography align="left" className={classes.description}>
                      <span className={classes.salary}>Salary: </span>Rs.
                      {props.job.salaryRange.min} - Rs.
                      {props.job.salaryRange.max}
                    </Typography>
                  )}

                {props.job.salaryRange.min !== "" &&
                  props.job.salaryRange.max === "" && (
                    <Typography align="left" className={classes.description}>
                      <span className={classes.salary}>Minimum Salary: </span>
                      Rs.
                      {props.job.salaryRange.min}
                    </Typography>
                  )}

                {props.job.salaryRange.min === "" &&
                  props.job.salaryRange.max !== "" && (
                    <Typography align="left" className={classes.description}>
                      <span className={classes.salary}>Maximum Salary: </span>
                      Rs.
                      {props.job.salaryRange.max}
                    </Typography>
                  )}
              </div>

              <div>
                {props.job.numberOfVacancies !== "" &&
                  <Typography align="left" className={classes.description}>
                    <span className={classes.numOfVacancies}>
                      Number of vacancies:{" "}
                    </span>
                    {props.job.numberOfVacancies}
                  </Typography>
                }
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography align="left" className={classes.description}>
                {props.job.description}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </FloatCard>
    </>
  );
}

export default JobSummary;
