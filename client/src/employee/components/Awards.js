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
import AwardItem from './AwardItem';

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
  }
});

function Achievements(props) {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [open, setOpen] = useState(false);
  const [award, setAward] = useState(null);
  const [state, setState] = useState({ title: null, issuedBy: null, year: null, month: null, description: null });
  const [loadingData, setLoadingData] = useState(true);

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
    let awardData;
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
      .then(res => {
        if (res.data.success) {
          if (res.data.jobseeker.award.length > 0) {
            awardData = res.data.jobseeker.award;
            if (Object.keys(res.data.jobseeker.award[0]).length === 0) {
              res.data.jobseeker.award.splice(0, 1)
              i++;
            } else if (awardData[0].title === "" && awardData[0].issuedBy === "" && awardData[0].date === "" && awardData[0].description === "") {
              res.data.jobseeker.award.splice(0, 1)
              i++;
            }
          }
          setAward(awardData);
          setLoadingData(false);
        }
      })
    setFetchedData(0)
  }

  function deleteData(index) {
    award.splice(index, 1)
    axios.put(`${BACKEND_URL}/jobseeker/removeAward/${loginId}`, award)
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Award deleted successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Award could not be deleted!",
          });
          handleAlert();
        }
      });
    handleClose();
    setFetchedData(1)
  }

  useEffect(() => {
    setState({ title: null, issuedBy: null, year: null, month: null, description: null });
    setAward(null);
    fetchData();
  }, [fetchedData])

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
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
  function onChangeTitle(e) {
    setState(prevState => {
      return { ...prevState, title: e.target.value }
    })
  }

  function onChangeIssuedBy(e) {
    setState(prevState => {
      return { ...prevState, issuedBy: e.target.value }
    })
  }

  function onChangeYear(e) {
    setState(prevState => {
      return { ...prevState, year: e.target.value }
    })
  }

  function onChangeMonth(e) {
    setState(prevState => {
      return { ...prevState, month: e.target.value }
    })
  }

  function onChangeDescription(e) {
    setState(prevState => {
      return { ...prevState, description: e.target.value }
    })
  }

  function onSubmit(e) {
    e.preventDefault();
    const newAward = {
      title: state.title,
      issuedBy: state.issuedBy,
      date: state.month + "/" + state.year,
      description: state.description,
    }

    axios.put(`${BACKEND_URL}/jobseeker/addAward/${loginId}`, newAward)
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Award added successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Award could not be added!",
          });
          handleAlert();
        }
      });
    setFetchedData(1);
    handleClose();
  }

  const displayAwardFields = () => {
    if (loadingData) {
      return (<Loading />);
    } else if (award && award.length > 0) {
      return award.map(awd => (
        <AwardItem key={i} index={i++} title={awd.title} issuedBy={awd.issuedBy} date={awd.date} description={awd.description} parentFunction={deleteData} jobseekerID={loginId} login={login} />
      ))
    } else {
      return (<Typography variant="body2" color="textSecondary" component="p">Award details not added.</Typography>)
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
              Awards
            </Typography>
          </Grid>
          <Grid item style={{ textAlign: 'right' }}>
            {login ? <>
              <Button className={classes.defaultButton} style={{ float: 'right', marginRight: '0px', backgroundColor: 'white' }} onClick={handleOpen}>
                <AddIcon style={{ color: theme.palette.tuftsBlue, }} className={classes.editIcon} />
              </Button>
            </> : null}
          </Grid>

          {/*-------------- add new award field popup content ------------------- */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" >
              <Typography style={{ color: theme.palette.stateBlue, textAlign: 'left', fontSize: 18, fontWeight: 600 }}>
                Add Award
              </Typography>
            </DialogTitle>
            <DialogContent>
              <form className={classes.form}>
                <Grid container direction="row" spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="Title"
                      type="text"
                      variant="outlined"
                      size="small"
                      onChange={onChangeTitle}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="Issued By"
                      type="text"
                      variant="outlined"
                      size="small"
                      onChange={onChangeIssuedBy}
                    />
                  </Grid>
                  <Grid item container xs={12} md={6}>
                    <Grid item xs={12}>
                      <Typography variant="body2" component="p" style={{ color: "#777", fontSize: '16px'}}>Issued Date</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                        <Select
                          native
                          onChange={onChangeYear}
                          label="Start Date"
                          className={classes.selectYear}
                        >
                          <option aria-label="None" value="" />
                          {getYearsFrom()}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" className={classes.formControl} style={{ marginLeft: "30px" }}>
                        <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">MM</InputLabel>
                        <Select
                          native
                          onChange={onChangeMonth}
                          label="Start Date"
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
                      onChange={onChangeDescription}
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
                Add Award
              </Button>
            </DialogActions>
          </Dialog>

        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {displayAwardFields()}
          </Grid>
        </Grid>
      </FloatCard>
    </>
  );
}

export default Achievements
