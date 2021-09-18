import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FloatCard from '../../components/FloatCard';
import Loading from '../../components/Loading';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from '../../Config';
import theme from '../../Theme';
import CourseItem from './CourseItem';

const useStyles = makeStyles({
  defaultButton: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
      color: 'white',
    }
  },
  editIcon: {
    "&:hover": {
      fontSize: "30px",
    }
  },
  closeIcon: {
    "&:hover": {
      fontSize: "25px",
      color: "#b30000 !important"
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: '600px',
    borderRadius: 10,
    paddingBottom: "30px"
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  field: {
    margin: "20px 0px 20px 0px",
    display: "flex",
    fontSize: "16px",
    "& label": {
      color: "#777",
      fontSize: '16px',
    }
  },
  select: {
    minWidth: "200px",
    fontSize: "16px",
    display: "flex",
    "& .MuiSelect-outlined": {
      padding: "10px 10px 10px 10px"
    }
  },
  selectYear: {
    margin: "20px 10px 0px 0px",
    minWidth: "90px",
    fontSize: "16px",
    display: "flex",
    "& .MuiSelect-outlined": {
      padding: "10px 10px 10px 10px"
    }
  },
  selectMonth: {
    margin: "20px 10px 0px 0px",
    minWidth: "80px",
    fontSize: "16px",
    display: "flex",
    "& .MuiSelect-outlined": {
      padding: "10px 10px 10px 10px"
    }
  },
  placeholder: {
    color: "#777",
    fontSize: '16px',
    marginTop: "-8px",
  },
  placeholderDate: {
    color: "#777",
    fontSize: '14px',
    marginTop: "12px",
  }
});

function Course(props) {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [state, setState] = useState({ course: null, institute: null, startYear: null, startMonth: null, endYear: null, endMonth: null });
  const [loadingData, setLoadingData] = useState(true);

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });
  let i = 0;
  let loginId=props.jobseekerID;
  let login = props.login;

  //generate year list
  function getYearsFrom() {
    let maxOffset = 25;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for (let x = 0; x <= maxOffset; x++) {
      allYears.push(thisYear - x)
    }

    return allYears.map((x, index) => (<option key={index} value={x}>{x}</option>));
  }

  //generate year list
  function getYearsTo() {
    let maxOffset = 30;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for (let x = -7; x <= maxOffset; x++) {
      allYears.push(thisYear - x)
    }

    return allYears.map((x, index) => (<option key={index} value={x}>{x}</option>));
  }

  //generate month list
  function getMonthsFrom() {
    let maxOffset = 12;
    let allMonths = [];
    for (let x = 1; x <= maxOffset; x++) {
      if (x < 10) {
        allMonths.push("0" + x);
      } else {
        allMonths.push(x);
      }
    }

    return allMonths.map((x, index) => (<option key={index} value={x}>{x}</option>));
  }

  function fetchData() {
    setLoadingData(true);
    let courseData;
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
      .then(res => {
        if (res.data.success) {
          if (res.data.jobseeker.course.length > 0) {
            courseData = res.data.jobseeker.course;
            if (Object.keys(res.data.jobseeker.course[0]).length === 0) {
              res.data.jobseeker.course.splice(0, 1)
              i++;
            } else if (courseData[0].course === "" && courseData[0].institute === "" && courseData[0].from === "" && courseData[0].to === "") {
              res.data.jobseeker.course.splice(0, 1)
              i++;
            }
          }
          setCourse(courseData)
          setLoadingData(false);
        }
      })
    setFetchedData(0)
  }

  function deleteData(index) {
    course.splice(index, 1)
    axios.put(`${BACKEND_URL}/jobseeker/removeCourse/${loginId}`, course)
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Course deleted successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Course could not be deleted!",
          });
          handleAlert();
        }
      });
    handleClose();
    setFetchedData(1)
  }

  useEffect(() => {
    setState({ course: null, institute: null, startYear: null, startMonth: null, endYear: null, endMonth: null });
    setCourse(null);
    fetchData();
  }, [fetchedData])

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setState({ course: null, institute: null, startYear: null, startMonth: null, endYear: null, endMonth: null });
  }

  // Alert stuff
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

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };


  //---------------------------- text field onChange events
  function onChangeCourse(e) {
    setState(prevState => {
      return { ...prevState, course: e.target.value }
    })
  }

  function onChangeInstitute(e) {
    setState(prevState => {
      return { ...prevState, institute: e.target.value }
    })
  }

  function onChangestartYear(e) {
    setState(prevState => {
      return { ...prevState, startYear: e.target.value }
    })
  }

  function onChangestartMonth(e) {
    setState(prevState => {
      return { ...prevState, startMonth: e.target.value }
    })
  }

  function onChangeEndYear(e) {
    setState(prevState => {
      return { ...prevState, endYear: e.target.value }
    })
  }

  function onChangeEndMonth(e) {
    setState(prevState => {
      return { ...prevState, endMonth: e.target.value }
    })
  }


  function onSubmit(e) {
    e.preventDefault();
    const newCourse = {
      course: state.course,
      institute: state.institute,
      from: state.startMonth + "/" + state.startYear,
      to: state.endMonth + "/" + state.endYear,
    }

    axios.put(`${BACKEND_URL}/jobseeker/addCourse/${loginId}`, newCourse)
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Course added successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Course could not be added!",
          });
          handleAlert();
        }
      });
    setFetchedData(1);
    handleClose();
  }

  const displayCourseFields = () => {
    if (loadingData) {
      return (<Loading />);
    } else if (course) {
      if (course.length > 0) {
        return course.map(awd => (
          <CourseItem key={i} index={i++} course={awd.course} institute={awd.institute} startDate={awd.from} endDate={awd.to} parentFunction={deleteData} />
        ))
      } else {
        return (<Typography variant="body2" color="textSecondary" component="p">Course details not added.</Typography>)
      }
    } else {
      return (<Typography variant="body2" color="textSecondary" component="p">Course details not added.</Typography>)
    }
  }

  return (
    <>
      {displayAlert()}
      <FloatCard>
        <Grid container spacing={3}>
          <Grid item xs style={{ textAlign: 'left', }}>
            <Typography gutterBottom variant="h5" style={{ color: theme.palette.tuftsBlue, padding: '10px', fontWeight: 'bold' }}>
              <EmojiEventsIcon style={{ color: theme.palette.turfsBlue, marginRight: '10px', marginBottom: '-5px', fontSize: '27' }} />
              Courses
            </Typography>
          </Grid>
          <Grid item style={{ textAlign: 'right' }}>
            {login ? <>
              <Button className={classes.defaultButton} style={{ float: 'right', marginRight: '0px', backgroundColor: 'white' }} onClick={handleOpen}>
                <AddIcon style={{ color: theme.palette.tuftsBlue, }} className={classes.editIcon} />
              </Button>
            </> : null}
          </Grid>

          {/*-------------- add course field popup content ------------------- */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{ color: theme.palette.stateBlue }}>
              Add Courses
            </DialogTitle>
            <Divider variant="middle" />
            <DialogContent>
              <form className={classes.form}>
                <div>
                  <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="Course Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangeCourse}
                    required
                  />
                  <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="Institute"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangeInstitute}
                    required
                  />
                  <Grid container direction="row">
                    <Grid item container sm={12} md={6} style={{ paddingRight: "15px" }}>
                      <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ color: "#777", fontSize: '16px', marginBottom: "-10px" }}>Start Date</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                          <Select
                            native
                            onChange={onChangestartYear}
                            label="Start Date"
                            className={classes.selectYear}
                          >
                            <option aria-label="None" value="" />
                            {getYearsFrom()}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">MM</InputLabel>
                          <Select
                            native
                            onChange={onChangestartMonth}
                            label="Start Date"
                            className={classes.selectMonth}
                          >
                            <option aria-label="None" value="" />
                            {getMonthsFrom()}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item container sm={12} md={6} style={{ paddingRight: "15px" }}>
                      <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ color: "#777", fontSize: '16px', marginBottom: "-10px" }}>End Date</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                          <Select
                            native
                            onChange={onChangeEndYear}
                            label="End Date"
                            className={classes.selectYear}
                          >
                            <option aria-label="None" value="" />
                            {getYearsTo()}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">MM</InputLabel>
                          <Select
                            native
                            onChange={onChangeEndMonth}
                            label="Start Date"
                            className={classes.selectMonth}
                          >
                            <option aria-label="None" value="" />
                            {getMonthsFrom()}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: "#999" }}>
                Cancel
              </Button>
              <Button onClick={onSubmit} color="primary" autoFocus>
                Apply Changes
              </Button>
            </DialogActions>
          </Dialog>

        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {displayCourseFields()}
          </Grid>
        </Grid>
      </FloatCard>
    </>
  );
}

export default Course
