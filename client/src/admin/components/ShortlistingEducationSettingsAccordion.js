import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import BACKEND_URL from '../../Config';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ContinousSlider from './ContinousSlider';
import Alert from '@material-ui/lab/Alert';
import Loading from '../../components/Loading';
import SnackBarAlert from '../../components/SnackBarAlert';
import { Checkbox, Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: 10,
    '& .MuiPaper-root': {
      borderRadius: 12,
    },
    '& .MuiChip-root.Mui-disabled': {
      opacity: 0.8,
      '& .MuiChip-deleteIcon': {
        display: 'none'
      }
    },
    '& .MuiPaper-elevation1': {
      background: theme.palette.lightSkyBlueHover,
      boxShadow: 'none',
    }

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  inputRoot: {
    color: theme.palette.black,
    fontSize: 14,
    backgroundColor: 'transparent',
    border: 'none',
    minWidth: 250,
    transition: 'background-color 200ms cubic-bezier(1, 1, 1, 0.1) 0ms',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:hover:before': {
      border: 'none',
    },
    '&:before': {
      display: 'none'
    },
    '&:after': {
      border: 'none',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    background: 'transparent'
  },
  keywordInput: {
    border: 'none',
    '&hover': {
      border: 'none'
    }
  },
  keywordChip: {
    backgroundColor: theme.palette.lightSkyBlue,
    margin: 3,
    marginRight: 5
  },
  featuredCheck: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8
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

export default function ShortlistingEducationSettingsAccordion(props) {
  const classes = useStyles();
  const id = props.id;
  const [editing, setEditing] = React.useState(false);
  const [settings, setSettings] = React.useState(false);
  const [updatedSettings, setUpdatedSettings] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);

  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const [updateFailed, setUpdateFailed] = React.useState(false);
  const [refreshRequired, setRefreshRequired] = React.useState(false);

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  const [minimum, setMinimum] = React.useState(0);
  const [gpaToggle, setGpaToggle] = React.useState(false);

  const handleMinimumToggleChange = (event) => {
    setGpaToggle(event.target.checked);
    getSettingValues("GPA", event.target.checked);
  };

  const handleClose = () => {
    setConfirmDelete(false);
  };

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  useEffect(() => {
    setUpdatedSettings(false);
    setSettings(false);
    retrieveRecommendationSettings();
    if (refreshRequired) {
      setRefreshRequired(false);
    }
  }, [refreshRequired])

  useEffect(() => {
    displayAccordionDetails();
    if (settings) {
      setMinimum(settings.settings.minimum);
      setGpaToggle(settings.settings.considerGpa);
    }
  }, [settings])


  // useEffect(() => {
  //     displaySettingOptions();
  // }, [minimum])

  useEffect(() => {
    if (updatedSettings) {
      calculateTotal();
    }
    if (JSON.stringify(settings) === JSON.stringify(updatedSettings)) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  }, [updatedSettings])

  useEffect(() => {
    if (updateSuccess === true) {
      setAlertData({ severity: "success", msg: "Changes saved successfully!" });
      handleAlert();
    }
    setRefreshRequired(true);
    setUpdateSuccess(false);
  }, [updateSuccess]);

  useEffect(() => {
    if (updateFailed === true) {
      setAlertData({ severity: "error", msg: "Failed to save changes!" });
      handleAlert();
    }
    setUpdateFailed(false);
  }, [updateFailed]);

  useEffect(() => {
    if (props.type === "custom") {
      props.handleInvalid(invalid);
    }
  }, [invalid]);

  const handleSave = () => {
    saveChanges();
    if (props.type !== "custom") {
      setRefreshRequired(true);
    }
  }

  const handleCancel = () => {
    setEditing(false);
    setRefreshRequired(true);
  }

  const handleUpdatesuccess = () => {
    setUpdateSuccess(true);
  }

  const handleUpdateFailed = () => {
    setUpdateFailed(true);
  }

  const displayAlert = () => {
    return <SnackBarAlert open={alertShow} onClose={handleAlertClose} severity={alertData.severity} msg={alertData.msg} />
  }

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertShow(false);
  };

  const retrieveRecommendationSettings = () => {
    axios.get(`${BACKEND_URL}/settingsByType/shortlistingEducation${id}`).then(res => {
      if (res.data.success) {
        setSettings(res.data.existingData[0]);
      } else {
        setSettings("empty")
      }
    })
  }


  const saveChanges = () => {
    let data = { settings: updatedSettings.settings };
    if (props.type === "custom") {
      props.passSettings(updatedSettings);
    } else {
      axios.put(`${BACKEND_URL}/settings/update/${settings._id}`, data).then(res => {
        if (res.data.success) {
          setRefreshRequired(true);
          setSettings(false);
          setUpdatedSettings(false);
          retrieveRecommendationSettings();
          handleUpdatesuccess();
        } else {
          handleUpdateFailed();
        }
      })
      setRefreshRequired(true);
    }
  }

  const resetToDefault = () => {
    setConfirmDelete(false);

    axios.get(`${BACKEND_URL}/settingsByType/shortlistingEducationDefaults`).then(res => {
      if (res.data.success) {
        let data = { settings: res.data.existingData[0].settings };

        axios.put(`${BACKEND_URL}/settings/update/${settings._id}`, data).then(res => {
          if (res.data.success) {
            setRefreshRequired(true);
            setSettings(false);
            setUpdatedSettings(false);
            retrieveRecommendationSettings();
            handleUpdatesuccess();
          } else {
            handleUpdateFailed();
          }
        })
          ;
      } else {
        setSettings("empty")
      }
    });
  }

  const getSettingValues = (name, value) => {
    let newSettings;

    if (updatedSettings === false) {
      newSettings = JSON.parse(JSON.stringify(settings));
    } else {
      newSettings = JSON.parse(JSON.stringify(updatedSettings));
    }

    switch (name) {
      case "Minimum Requirement":
        newSettings.settings.minimum = value;
        setMinimum(value);
        break;
      case "Diploma":
        newSettings.settings.diploma = value;
        break;
      case "Bachelor's":
        newSettings.settings.bachelors = value;
        break;
      case "Bachelor's Honors":
        newSettings.settings.bachelorsHons = value;
        break;
      case "Masters":
        newSettings.settings.masters = value;
        break;
      case "PhD":
        newSettings.settings.phd = value;
        break;
      case "GPA":
        newSettings.settings.considerGpa = value;
        break;
      default:
        break;
    }
    setUpdatedSettings(newSettings);
  }

  const calculateTotal = () => {
    let total = updatedSettings.settings.minimum + updatedSettings.settings.diploma +
      updatedSettings.settings.bachelors + updatedSettings.settings.bachelorsHons + updatedSettings.settings.masters +
      updatedSettings.settings.phd;
    if (total === 100) {
      setInvalid(false);
      if (props.type === "custom") {
        saveChanges();
      }
    } else {
      setInvalid(true);
    }
  }

  const displayConfirmation = () => {
    return (<Dialog
      open={confirmDelete}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.paperRoot }}
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Reset?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure that you reset these settings to default? <b>This cannot be undone.</b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={resetToDefault} color="primary" className={classes.confrimDelete} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>)
  }

  const displayAccordionDetails = () => {
    return <AccordionDetails className={classes.details}>
      <Grid container spacing={1}>

        <Grid item xs={12} style={{ padding: 24 }}>
          <Typography>Applicants who has met the minimum educational qualifications get the below marks for education.</Typography>
        </Grid>
        {displaySettingOptions()}
      </Grid>
    </AccordionDetails >
  }

  const displaySettingOptions = () => {
    if (settings !== false) {
      return (
        <Grid item xs={12}>
          <ContinousSlider name={"Minimum Requirement"} value={settings.settings.minimum} passValue={getSettingValues} />
          <div style={{ padding: 24 }}>
            <Typography>Remaining percentage are divided as the weights for each education levels. <br />Total wights of below levels should be {100 - minimum}%.</Typography>
          </div>
          <ContinousSlider name={"Diploma"} value={settings.settings.diploma} passValue={getSettingValues} max={100 - minimum} />
          <ContinousSlider name={"Bachelor's"} value={settings.settings.bachelors} passValue={getSettingValues} max={100 - minimum} />
          <ContinousSlider name={"Bachelor's Honours"} value={settings.settings.bachelorsHons} passValue={getSettingValues} max={100 - minimum} />
          <Grid item xs={12} style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={gpaToggle}
                onChange={handleMinimumToggleChange}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <Typography className={classes.featuredJobs}>Consider GPA. (If checked, the weight for the bachelor's degree would be multiplied by the GPA/4. When the candidate doesn't mention the GPA, default is set to 2.</Typography>

            </div>
          </Grid>
          <ContinousSlider name={"Masters"} value={settings.settings.masters} passValue={getSettingValues} max={100 - minimum} />
          <ContinousSlider name={"PhD"} value={settings.settings.phd} passValue={getSettingValues} max={100 - minimum} />
        </Grid>
      )
    } else {
      return (<Loading />)
    }
  }

  return (
    <div className={classes.root}>
      {displayAlert()}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Typography className={classes.heading}>Advanced Education Settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Controls the weights given for each education levels
          </Typography>
        </AccordionSummary>
        {displayAccordionDetails()}
        {displayConfirmation()}
        <Divider />
        <AccordionActions style={{ minHeight: 65 }}>
          {invalid ? <Alert severity="error">Invalid settings - Weight total should be 100%!</Alert> : null}
          {editing && props.type !== "custom" ? <Button size="small" onClick={handleCancel}>Cancel</Button> : null}
          {!editing && props.id !== "Defaults" && props.type !== "custom" ? <> <Button size="small" color="secondary" onClick={handleDelete}>Reset to Default</Button></> : null}
          {editing && !invalid && props.type !== "custom" ? <Button size="small" color="primary" onClick={handleSave}>Save</Button> : null}
        </AccordionActions>
      </Accordion>
    </div>
  );
}
