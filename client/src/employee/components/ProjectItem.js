import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from '../../Config';
import theme from '../../Theme';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paperCont: {
    backgroundColor: '#E6E6FA',
    padding: '20px',
    borderRadius: 10,
    "&:hover": {
      defaultButton: {
        display: 'block'
      }
    }
  },
  defaultButton: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: '#0088cc',
      color: 'white',
    }
  },
  editIcon: {
    padding: '0px',
    margin: '-15px',
    color: theme.palette.tuftsBlue,
    "&:hover": {
      backgroundColor: theme.palette.lightSkyBlue,
      borderRadius: "100%"
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
  placeholder: {
    color: "#777",
    fontSize: '16px',
    marginTop: "-8px",
  },
  placeholderDate: {
    color: "#777",
    fontSize: '14px',
    marginTop: "12px",
  },
  item: {
    color: "#666",
    padding: "10px 20px"
  },
  linkCont: {
    textAlign: 'left',
    paddingTop: '10px',
    wordWrap: "break-word",
    overflowWrap: "break-word",
    [theme.breakpoints.down('sm')]: {
      width: "23vw"
    },
  },
  label: {
    alignSelf: 'left',
    backgroundColor: "MintCream"
  },
  tagIcon: {
    color: theme.palette.tagIcon
  },
  paperRoot: {
    padding: 20,
  },
  confrimDelete: {
    boxShadow: "none",
    color: theme.palette.red,
    backgroundColor: theme.palette.lightyPink,
    borderRadius: 12,
    marginLeft: "16px !important",
    padding: "10px",
    "&:hover": {
      backgroundColor: theme.palette.lightyPinkHover,
      boxShadow: "none",
    },
  },
}));

function ProjectItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [styleEdit, setStyleEdit] = useState({ display: 'none' });
  let projectStartDate = [0, 0];
  let projectEndDate = [0, 0];
  if (props.from !== 'null/null' && props.from !== '0/0') {
    projectStartDate = props.from.split("/");
  }
  if (props.to !== 'null/null' && props.to !== '0/0') {
    projectEndDate = props.to.split("/");
  }
  let tech = [];
  tech = props.usedTech;
  const [state, setState] = useState({ name: props.name, link: props.link, description: props.description, startYear: projectStartDate[1], startMonth: projectStartDate[0], endYear: projectEndDate[1], endMonth: projectEndDate[0], usedTech: tech, type: props.type });
  const [newData, setNewData] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const [alertShow, setAlertShow] = React.useState(false);
  const index = props.index;
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

  useEffect(() => {
    if (deleteSuccess === true) {
      setAlertData({ severity: "success", msg: "Item deleted successfully!" });
      handleAlert();
    }
    setLoading(true);
    // retrieveCategories();
    setDeleteSuccess(false);
  }, [deleteSuccess]);

  const handleDelete = () => {
    props.parentFunction(index)
  }

  const handleClickOpen = () => {
    setConfirmDelete(true);
    handleMenuClose();
  };

  const handleClickClose = () => {
    setConfirmDelete(false);
  };

  function handleOpen() {
    setOpen(true);
    handleMenuClose();
  }

  function handleClose() {
    setOpen(false);
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
    const project = {
      name: state.name,
      link: state.link,
      description: state.description,
      from: state.startMonth + "/" + state.startYear,
      to: state.endMonth + "/" + state.endYear,
      usedTech: state.usedTech,
      type: state.type
    }

    axios.put(`${BACKEND_URL}/jobseeker/updateProject/${loginId}`, { index: props.index, project: project })
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Project updated successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Project could not be updated!",
          });
          handleAlert();
        }
      });
    handleClose();
  }

  return (
    <>
      {displayAlert()}
      <TimelineItem>
        <TimelineOppositeContent style={{ flex: '0.2', paddingLeft: "0px" }}>
          <Typography variant="body2" color="textSecondary">
            {state.startMonth === 0 ? "" : state.startMonth + "/" + state.startYear + " - " + state.endMonth + "/" + state.endYear}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot style={{ backgroundColor: "Plum" }}>
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{ paddingRight: "0px" }}>
          <Paper elevation={0} className={classes.paperCont}
            onMouseEnter={e => {
              setStyleEdit({ display: 'block' });
            }}
            onMouseLeave={e => {
              setStyleEdit({ display: 'none' });
            }}>
            <Grid container spacing={3}>
              <Grid item xs={11} style={{ marginTop: "-5px", boxSizing: "border-box" }}>

                <Typography gutterBottom style={{ textAlign: 'left', alignItems: 'left' }}>
                  <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label={state.type} className={classes.label} />
                </Typography>
                <Typography gutterBottom style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold', color: '#666' }}>
                  {state.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
                  {state.description}
                </Typography>
                <Typography gutterBottom style={{ color: theme.palette.stateBlue, textAlign: 'left', fontSize: '14px', fontWeight: 'bold', paddingTop: '5px' }}>
                  {state.usedTech ? "Tech Stack : " + state.usedTech.join(", ") : ""}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={classes.linkCont}>
                  <b>{state.link === null || state.link === "" ? "" : "Link : "}</b>{state.link}
                </Typography>
              </Grid>
              <Grid item xs={1} style={{ padding: "10px 0px 0px 0px", textAlign: 'right' }}>
                {login ? <>
                  <Button style={{ minWidth: '25px', width: '25px' }}>
                    <MoreVertIcon className={classes.editIcon} size="small" style={{ color: "#999" }} onClick={handleMenuClick} />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem className={classes.item} onClick={handleOpen}><EditIcon style={{ marginRight: "7px" }} />Change</MenuItem>
                    <MenuItem className={classes.item} onClick={handleClickOpen}><DeleteIcon style={{ marginRight: "7px" }} />Remove</MenuItem>
                  </Menu>
                </> : null}
                <Dialog
                  open={confirmDelete}
                  onClose={handleClickClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  classes={{ paper: classes.paperRoot }}
                >
                  <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure that you want to delete the selected item? This cannot be undone.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClickClose} color="primary">
                      No
                    </Button>
                    <Button onClick={handleDelete}
                      color="primary" autoFocus className={classes.confrimDelete}>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                {/*-------------- update project field popup content ------------------- */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" >
                    <Typography style={{ color: theme.palette.stateBlue, textAlign: 'left', fontSize: 18, fontWeight: 600 }}>
                      Edit Project Details
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
                            value={state.name}
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
                            value={state.link}
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
                            value={state.description}
                            onChange={onChangeDescription}
                            required
                          />
                        </Grid>
                        <Grid item container xs={12} md={6}>
                          <Grid item xs={12}>
                            <Typography variant="body2" component="p" style={{ color: "#777", fontSize: '16px'}}>Start Date</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                              <Select
                                native
                                onChange={onChangestartYear}
                                label="Start Date"
                                value={state.startYear}
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
                                value={state.startMonth}
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
                            <Typography variant="body2" component="p" style={{ color: "#777", fontSize: '16px' }}>End Date</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                              <Select
                                native
                                onChange={onChangeEndYear}
                                label="End Date"
                                value={state.endYear}
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
                                value={state.endMonth}
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
                            value={state.usedTech}
                            onChange={onChangeUsedTech}
                            required
                            /> */}
                        <Grid item xs={12}>

                          <Autocomplete
                            className={classes.field}
                            multiple
                            
                            id="tags-outlined"
                            filterSelectedOptions
                            options={props.techList}
                            getOptionLabel={(option) => option}
                            value={state.usedTech}
                            onChange={(event, value) => {
                              setState(prevState => {
                                return { ...prevState, usedTech: value }
                              })
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
                              value={state.type}
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
                      Apply Changes
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </>
  );
}

export default ProjectItem
