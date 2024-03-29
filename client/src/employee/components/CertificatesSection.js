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
import CertificateItem from './CertificateItem';

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

function CertificatesSection(props) {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [open, setOpen] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const [allCertificates, setAllCertificates] = useState(null);
  const [state, setState] = useState({ issuer: null, title: null, score: null, month: null, year: null });
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

  function fetchCertificates() {
    axios.get(`${BACKEND_URL}/certifications`)
      .then(res => {
        if (res.data.success) {
          if (res.data.existingData?.length > 0) {
            if (Object.keys(res.data.existingData[0]).length === 0) {
              res.data.existingData.splice(0, 1)
              i++;
            }
          }
          setAllCertificates(res.data.existingData)
        }
      })
    setFetchedData(0)
  }

  function fetchData() {
    setLoadingData(true);
    let certificateData;
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
      .then(res => {
        if (res.data.success) {
          if (res.data.jobseeker.certificate.length > 0) {
            certificateData = res.data.jobseeker.certificate;
            if (Object.keys(res.data.jobseeker.certificate[0]).length === 0) {
              res.data.jobseeker.certificate.splice(0, 1)
              i++;
            } else if (certificateData[0].issuer === "" && certificateData[0].title === "") {
              res.data.jobseeker.course.splice(0, 1)
              i++;
            }
          }
          setCertificate(certificateData)
          setLoadingData(false);
        }
      })
    setFetchedData(0)
  }

  //generate issuer list
  function getIssuers() {
    return allCertificates?.map((x, index) => (<option key={index} value={x.issuer}>{x.issuer}</option>));
  }

  //generate title list
  function getTitles() {
    for (let index = 0; index < allCertificates?.length; index++) {
      if (allCertificates[index].issuer === state.issuer) {
        let titles = allCertificates[index].certificates;
        return titles.map((title) => (<option value={JSON.stringify(title)}>{title.name}</option>));
      }
    }
  }

  function deleteData(index) {
    certificate.splice(index, 1)
    axios.put(`${BACKEND_URL}/jobseeker/removeCertificate/${loginId}`, certificate)
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Certificate deleted successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Certificate could not be deleted!",
          });
          handleAlert();
        }
      });
    handleClose();
    setFetchedData(1)
  }

  useEffect(() => {
    setState({ issuer: null, title: null, score: null, month: null, year: null });
    setCertificate(null);
    fetchCertificates();
    fetchData();
  }, [fetchedData])

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setState({ issuer: null, title: null, score: null, month: null, year: null });
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
  function onChangeIssuer(e) {
    setState(prevState => {
      return { ...prevState, issuer: e.target.value }
    })
    getTitles();
  }

  function onChangeTitle(e) {
    let obj = JSON.parse(e.target.value);
    setState(prevState => {
      return { ...prevState, title: obj.name }
    })
    setState(prevState => {
      return { ...prevState, score: obj.score }
    })
  }

  function onChangeMonth(e) {
    setState(prevState => {
      return { ...prevState, month: e.target.value }
    })
  }

  function onChangeYear(e) {
    setState(prevState => {
      return { ...prevState, year: e.target.value }
    })
  }


  function onSubmit(e) {
    e.preventDefault();
    const newCertificate = {
      issuer: state.issuer,
      title: state.title,
      score: state.score,
      date: state.month + "/" + state.year,
    }

    axios.put(`${BACKEND_URL}/jobseeker/addCertificate/${loginId}`, newCertificate)
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Certificate added successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Certificate could not be added!",
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
    } else if (certificate) {
      if (certificate.length > 0) {
        return certificate.map(awd => (
          <CertificateItem key={i} index={i++} issuer={awd.issuer} title={awd.title} score={awd.score} date={awd.date} allCertificates={allCertificates} parentFunction={deleteData} jobseekerID={loginId} login={login} />
        ))
      } else {
        return (<Typography variant="body2" color="textSecondary" component="p">Certificates not added.</Typography>)
      }
    } else {
      return (<Typography variant="body2" color="textSecondary" component="p">Certificates not added.</Typography>)
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
              Professional Certificates
            </Typography>
          </Grid>
          <Grid item style={{ textAlign: 'right' }}>
            {login ? <>
              <Button className={classes.defaultButton} style={{ float: 'right', marginRight: '0px', backgroundColor: 'white' }} onClick={handleOpen}>
                <AddIcon style={{ color: theme.palette.tuftsBlue, }} className={classes.editIcon} />
              </Button>
            </> : null}
          </Grid>

          {/*-------------- add certificate field popup content ------------------- */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography style={{ color: theme.palette.stateBlue, textAlign: 'left', fontSize: 18, fontWeight: 600 }}>
                Add Professional Certificate
              </Typography>
            </DialogTitle>
            <DialogContent>
              <form className={classes.form}>
                <Grid container direction="row" spacing={3}>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.field}>
                      <InputLabel className={classes.placeholder} htmlFor="outlined-age-native-simple">Select Issuer</InputLabel>
                      <Select
                        native
                        onChange={onChangeIssuer}
                        className={classes.select}
                        required
                      >
                        <option aria-label="None" value="" />
                        {getIssuers()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.field}>
                      <InputLabel className={classes.placeholder} htmlFor="outlined-age-native-simple">Select Certification</InputLabel>
                      <Select
                        native
                        onChange={onChangeTitle}
                        className={classes.select}
                        required
                      >
                        <option aria-label="None" value="" />
                        {getTitles()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12}>
                      <Typography variant="body2" component="p" style={{ color: "#777", fontSize: '16px'}}>Issued Date</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                        <Select
                          native
                          onChange={onChangeYear}
                          className={classes.selectYear}
                        >
                          <option aria-label="None" value="" />
                          {getYearsFrom()}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">MM</InputLabel>
                        <Select
                          native
                          onChange={onChangeMonth}
                          className={classes.selectMonth}
                        >
                          <option aria-label="None" value="" />
                          {getMonthsFrom()}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: "#999" }}>
                Cancel
              </Button>
              <Button onClick={onSubmit} color="primary" autoFocus>
                Add Certificate
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

export default CertificatesSection
