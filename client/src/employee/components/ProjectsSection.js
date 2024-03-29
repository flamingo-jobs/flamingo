import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import Timeline from '@material-ui/lab/Timeline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-vertical-timeline-component/style.min.css';
import FloatCard from '../../components/FloatCard';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from '../../Config';
import theme from '../../Theme';
import ProjectItem from './ProjectItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loading from "../../components/Loading";

const useStyles = makeStyles({
  defaultButton: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
      color: 'white',
    }
  },
  paper: {
    padding: '6px 16px',
    backgroundColor: '#D5F0F5',
    boxShadow: "0px 0px 0px 0px",
    borderRadius: 15,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  paperCont: {
    backgroundColor: 'MintCream',
    marginBottom: 25,
    borderRadius: 10,
    width: "100%",
    "&:hover": {
      defaultButton: {
        display: 'block'
      }
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
  form: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  field: {
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
  selectType: {
    margin: "20px 10px 0px 0px",
    minWidth: "130px",
    fontSize: "16px",
    display: "flex",
    "& .MuiSelect-outlined": {
      padding: "10px 10px 10px 10px"
    }
  },
  placeholderDate: {
    color: "#777",
    fontSize: '14px',
    marginTop: "12px",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: '600px',
    borderRadius: 10,
    paddingBottom: "30px"
  },
});

function ProjectsSection(props) {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [technologyList, setTechnologyList] = useState([]);
  const [project, setProject] = useState(null);
  const [state, setState] = useState({ name: null, link: null, description: null, startYear: null, startMonth: null, endYear: null, endMonth: null, usedTech: [], type: null });

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });
  let i = 0;
  let loginId = props.jobseekerID;
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
    setLoading(true);
    let projectData;
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
      .then(res => {
        if (res.data.success) {
          if (res.data.jobseeker.project.length > 0) {
            projectData = res.data.jobseeker.project;
            if (Object.keys(res.data.jobseeker.project[0]).length === 0) {
              res.data.jobseeker.project.splice(0, 1)
              i++;
            } else if (projectData[0].name === "" && projectData[0].link === "" && projectData[0].description === "" && projectData[0].from === "" && projectData[0].to === "") {
              res.data.jobseeker.project.splice(0, 1)
              i++;
            }
          }
          setProject(projectData)
          setLoading(false);
        }
      })

    //tech stack from db
    axios.get(`${BACKEND_URL}/technologies`).then(res => {
      if (res.data.success) {
        setTechnologies(res.data.existingData)
      } else {
        setTechnologies([])
      }
    })
    setFetchedData(0)
  }

  function deleteData(index) {
    project.splice(index, 1)
    axios.put(`${BACKEND_URL}/jobseeker/removeProject/${loginId}`, project)
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Project deleted successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Project could not be deleted!",
          });
          handleAlert();
        }
      });
    handleClose();
    setFetchedData(1)
  }

  useEffect(() => {
    setState({ name: null, link: null, description: null, startYear: null, startMonth: null, endYear: null, endMonth: null, usedTech: [], type: null });
    setProject(null);
    fetchData();
  }, [fetchedData])

  useEffect(() => {
    technologies.map(technology => {
      if (technology.stack.list) {
        technology.stack.list.map(el => {
          technologyList.push(el)
        })
      } else if (technology.stack.frontEnd) {
        technology.stack.frontEnd.map(el => {
          technologyList.push(el)
        })
        technology.stack.backEnd.map(el => {
          technologyList.push(el)
        })
      }
    })
  }, [technologies])

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setState({ name: null, link: null, description: null, startYear: null, startMonth: null, endYear: null, endMonth: null, usedTech: [], type: null });
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
  function onChangeName(e) {
    setState(prevState => {
      return { ...prevState, name: e.target.value }
    })
  }

  function onChangeLink(e) {
    setState(prevState => {
      return { ...prevState, link: e.target.value }
    })
  }

  function onChangeDescription(e) {
    setState(prevState => {
      return { ...prevState, description: e.target.value }
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

  function onChangeType(e) {
    setState(prevState => {
      return { ...prevState, type: e.target.value }
    })
  }


  function onSubmit(e) {
    e.preventDefault();
    let tech = [];
    tech = newData;
    const newProject = {
      name: state.name,
      link: state.link,
      description: state.description,
      from: state.startMonth + "/" + state.startYear,
      to: state.endMonth + "/" + state.endYear,
      usedTech: tech,
      type: state.type
    }

    axios.put(`${BACKEND_URL}/jobseeker/addProject/${loginId}`, newProject)
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Project added successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Project could not be added!",
          });
          handleAlert();
        }
      });
    setFetchedData(1);
    handleClose();
  }

  const displayProjectFields = () => {
    if (loading) {
      return (<Loading />);
    } else if (project) {
      if (project.length > 0) {
        return project.map(pro => (
          <ProjectItem key={i} index={i++} name={pro.name} link={pro.link} description={pro.description} from={pro.from} to={pro.to} usedTech={pro.usedTech} type={pro.type} parentFunction={deleteData} techList={technologyList} jobseekerID={loginId} login={login} />
        ))
      } else {
        return (<Typography variant="body2" color="textSecondary" component="p" style={{ paddingBottom: "10px" }}>Project details not added.</Typography>)
      }
    } else {
      return (<Typography variant="body2" color="textSecondary" component="p" style={{ paddingBottom: "10px" }}>Project details not added.</Typography>);
    }
  }


  return (
    <>
      {displayAlert()}
      <FloatCard>
        <Grid container spacing={3}>
          <Grid item xs style={{ textAlign: 'left', }}>
            <Typography gutterBottom variant="h5" style={{ color: theme.palette.tuftsBlue, padding: '10px', fontWeight: 'bold' }}>
              <LaptopChromebookIcon style={{ color: theme.palette.turfsBlue, marginRight: '10px', marginBottom: '-5px', fontSize: '27' }} />
              Projects
            </Typography>
          </Grid>
          <Grid item style={{ textAlign: 'right' }}>
            {login ? <>
              <Button className={classes.defaultButton} style={{ float: 'right', marginRight: '0px', backgroundColor: 'white' }} onClick={handleOpen}>
                <AddIcon style={{ color: theme.palette.tuftsBlue, }} className={classes.editIcon} />
              </Button>
            </> : null}
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography style={{ color: theme.palette.stateBlue, textAlign: 'left', fontSize: 18, fontWeight: 600 }}>
                Add Project
              </Typography>
            </DialogTitle>
            <DialogContent>
              <form className={classes.form}>
                <Grid container direction="row" spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="Name"
                      type="text"
                      variant="outlined"
                      size="small"
                      onChange={onChangeName}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="Link"
                      type="text"
                      variant="outlined"
                      size="small"
                      onChange={onChangeLink}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.field}
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      rows={5}
                      variant="outlined"
                      onChange={onChangeDescription}
                      required
                    />
                  </Grid>
                  <Grid item container xs={12}  md={6}>
                    <Grid item xs={12}>
                      <Typography variant="body2" component="p" style={{ color: "#777", fontSize: '16px',}}>Start Date</Typography>
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
                  <Grid item container xs={12} md={6}>
                    <Grid item xs={12}>
                      <Typography variant="body2" component="p" style={{ color: "#777", fontSize: '16px'}}>End Date</Typography>
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
                  {/* <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="Tech. Stack"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangeUsedTech}
                    required
                  /> */}
                  <Grid item xs={12}>
                    <Autocomplete
                      className={classes.field}
                      multiple
                      id="tags-outlined"
                      size="small"
                      filterSelectedOptions
                      options={technologyList}
                      getOptionLabel={(option) => option}
                      onChange={(event, value) => {
                        setNewData(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Tech. Stack"
                          placeholder="+ new"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">Select Type</InputLabel>
                      <Select
                        native
                        size="small"
                        onChange={onChangeType}
                        label="Select Type"
                        className={classes.selectType}
                      >
                        <option aria-label="None" value="" />
                        <option value="Individual">Individual</option>
                        <option value="Group">Group</option>
                        <option value="Community">Community</option>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: "#999" }}>
                Cancel
              </Button>
              <Button onClick={onSubmit} color="primary" autoFocus>
                Add Project
              </Button>
            </DialogActions>
          </Dialog>

        </Grid>
        <Paper elevation={0} className={classes.paperCont}>
          <Timeline align="left">
            {displayProjectFields()}
          </Timeline>
        </Paper>
      </FloatCard>
    </>
  );
}

export default ProjectsSection
