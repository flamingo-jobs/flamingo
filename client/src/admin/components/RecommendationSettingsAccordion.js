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
      boxShadow: 'rgba(83, 144, 217, 0.1) 0px 4px 12px',
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

export default function RecommendationSettingsAccordion(props) {
  const classes = useStyles();

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

  const [isMinimumToggle, setMinimumToggle] = React.useState(true);

  const handleMinimumToggleChange = (event) => {
    setMinimumToggle(event.target.checked);
    getSettingValues("Minimum", !event.target.checked);
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
      setMinimumToggle(!settings.settings.ignoreMinimum);
    }
  }, [settings])

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

  const handleSave = () => {
    saveChanges();
    setRefreshRequired(true);
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
    axios.get(`${BACKEND_URL}/settingsByType/recommendation`).then(res => {
      if (res.data.success) {
        setSettings(res.data.existingData[0])
      } else {
        setSettings("empty")
      }
    })
  }


  const saveChanges = () => {
    let data = { settings: updatedSettings.settings };

    axios.put(`${BACKEND_URL}/settings/update/${settings._id}`, data).then(res => {
      if (res.data.success) {
        handleUpdatesuccess();
      } else {
        handleUpdateFailed();
      }
    })
    setRefreshRequired(true);
  }

  const resetToDefault = () => {
    setConfirmDelete(false);

    axios.get(`${BACKEND_URL}/settingsByType/recommendationDefaults`).then(res => {
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
      case "Interested Areas":
        newSettings.settings.interests = value;
        break;
      case "Technology Stack":
        newSettings.settings.techStack = value;
        break;
      case "Project Technology Stack":
        newSettings.settings.projectTechStack = value;
        break;
      case "Skills":
        newSettings.settings.skills = value;
        break;
      case "Certificates":
        newSettings.settings.certifications = value;
        break;
      case "Courses":
        newSettings.settings.courses = value;
        break;
      case "Minimum":
        newSettings.settings.ignoreMinimum = value;
        break;
      default:
        break;
    }
    setUpdatedSettings(newSettings);
  }

  const calculateTotal = () => {
    let total = updatedSettings.settings.interests + updatedSettings.settings.techStack + updatedSettings.settings.projectTechStack +
      updatedSettings.settings.skills + updatedSettings.settings.certifications + updatedSettings.settings.courses;
    if (total === 100) {
      setInvalid(false);
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={isMinimumToggle}
              onChange={handleMinimumToggleChange}
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography className={classes.featuredJobs}>Suggest jobs only if the minimum requirements are met</Typography>
          </div>
        </Grid>
        <Grid item xs={12} style={{ padding: 24 }}>
          <Typography>Below values are considered as the weights for generate suggested jobs for job seekers. <br />Total wights should be 100%.</Typography>
        </Grid>
        {displaySettingOptions()}
      </Grid>
    </AccordionDetails>
  }

  const displaySettingOptions = () => {
    if (settings !== false) {
      return (
        <Grid item xs={12}>
          <ContinousSlider name={"Interested Areas"} value={settings.settings.interests} passValue={getSettingValues} />
          <ContinousSlider name={"Technology Stack"} value={settings.settings.techStack} passValue={getSettingValues} />
          <ContinousSlider name={"Project Technology Stack"} value={settings.settings.projectTechStack} passValue={getSettingValues} />
          <ContinousSlider name={"Skills"} value={settings.settings.skills} passValue={getSettingValues} />
          <ContinousSlider name={"Certificates"} value={settings.settings.certifications} passValue={getSettingValues} />
          <ContinousSlider name={"Courses"} value={settings.settings.courses} passValue={getSettingValues} />
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
          <Typography className={classes.heading}>Job Suggestions</Typography>
          <Typography className={classes.secondaryHeading}>
            Change the settings related to job suggestions
          </Typography>
        </AccordionSummary>
        {displayAccordionDetails()}
        {displayConfirmation()}
        <Divider />
        <AccordionActions style={{ minHeight: 65 }}>
          {invalid ? <Alert severity="error">Invalid settings - Weight total should be 100%!</Alert> : null}
          {editing ? <Button size="small" onClick={handleCancel}>Cancel</Button> : <> <Button size="small" color="secondary" onClick={handleDelete}>Reset to Default</Button></>}
          {editing && !invalid ? <Button size="small" color="primary" onClick={handleSave}>Save</Button> : null}
        </AccordionActions>
      </Accordion>
    </div>
  );
}
