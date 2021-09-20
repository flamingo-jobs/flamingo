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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from '../../Config';
import theme from '../../Theme';


const useStyles = makeStyles((theme) => ({
  paperCont: {
    backgroundColor: 'MintCream',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
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
      backgroundColor: theme.palette.stateBlueHover,
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
    }
  }
}));

function WorkExpItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [styleEdit, setStyleEdit] = useState({ display: 'none' });
  let workStartDate = [0, 0];
  let workEndDate = [0, 0];
  if (props.from !== 'null/null' && props.from !== '0/0') {
    workStartDate = props.from.split("/");
  }
  if (props.to !== 'null/null' && props.to !== '0/0') {
    workEndDate = props.to.split("/");
  }
  const [state, setState] = useState({ place: props.place, description: props.description, position: props.position, startYear: workStartDate[1], startMonth: workStartDate[0], endYear: workEndDate[1], endMonth: workEndDate[0], taskAndResponsibility: props.task });

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

  function onChangePlace(e) {
    setState(prevState => {
      return { ...prevState, place: e.target.value }
    })
  }

  function onChangeDescription(e) {
    setState(prevState => {
      return { ...prevState, description: e.target.value }
    })
  }

  function onChangePosition(e) {
    setState(prevState => {
      return { ...prevState, position: e.target.value }
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

  function onChangeTask(e) {
    setState(prevState => {
      return { ...prevState, taskAndResponsibility: e.target.value }
    })
  }

  function onSubmit(e) {
    e.preventDefault();
    const work = {
      place: state.place,
      description: state.description,
      position: state.position,
      from: state.startMonth + "/" + state.startYear,
      to: state.endMonth + "/" + state.endYear,
      taskAndResponsibility: state.taskAndResponsibility,
    }

    axios.put(`${BACKEND_URL}/jobseeker/updateWork/${loginId}`, { index: props.index, work: work })
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Work updated successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Work could not be updated!",
          });
          handleAlert();
        }
      });
    handleClose();
  }

  return (
    <>
      {displayAlert()}
      <Paper elevation={0} className={classes.paperCont}
        onMouseEnter={e => {
          setStyleEdit({ display: 'block' });
        }}
        onMouseLeave={e => {
          setStyleEdit({ display: 'none' });
        }}>
        <Grid container spacing={3}>
          <Grid item xs={2} style={{ marginTop: "-2px" }}>
            <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'left', marginLeft: "5px" }}>
              {state.startYear ? state.startMonth + "/" + state.startYear + " - " + state.endMonth + "/" + state.endYear : ""}
            </Typography>
          </Grid>
          <Grid item xs={9} style={{ marginTop: "-5px", paddingLeft: "30px" }}>
            <Typography gutterBottom style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold', color: '#666' }}>
              {state.position}
            </Typography>
            <Typography gutterBottom style={{ color: theme.palette.stateBlue, textAlign: 'left', fontSize: '14px', fontWeight: 'bold', }}>
              {state.place}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'left', paddingTop: '10px', whiteSpace: 'pre-wrap' }}>
              {state.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'left', paddingTop: '10px', whiteSpace: 'pre-wrap' }}>
              <b>{state.taskAndResponsibility ? "Tasks & Responsibilities : " : ""}</b><br />{state.taskAndResponsibility}
            </Typography>
          </Grid>
          <Grid item xs={1} style={{ padding: "10px 0px 0px 0px" }}>
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
            </> : null
            }
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
            {/*-------------- edit work field popup content ------------------- */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <Typography style={{ color: theme.palette.stateBlue, textAlign: 'left', fontSize: 18, fontWeight: 600 }}>
                  Edit Work Experience
                </Typography>
              </DialogTitle>
              <DialogContent>
                <form className={classes.form}>
                  <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        className={classes.field}
                        id="outlined-basic"
                        label="Position"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={state.position}
                        onChange={onChangePosition}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={classes.field}
                        id="outlined-basic"
                        label="Place"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={state.place}
                        onChange={onChangePlace}
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
                        <Typography variant="body2" component="p" style={{ color: "#777", fontSize: '16px'}}>End Date</Typography>
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
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={classes.field}
                        id="outlined-multiline-static"
                        label="Tasks & Responsibilities"
                        multiline
                        rows={5}
                        variant="outlined"
                        value={state.taskAndResponsibility}
                        onChange={onChangeTask}
                      />
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
    </>
  );
}

export default WorkExpItem
