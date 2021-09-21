import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FloatCard from '../../components/FloatCard';
import Loading from '../../components/Loading';
import MiniLoading from '../../components/MiniLoading';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from '../../Config';
import theme from '../../Theme';

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
    margin: "10px 0px 20px 0px",
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
  paperChips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    backgroundColor: 'MintCream',
    padding: "20px 10px 20px 10px",
    marginBottom: 25,
    borderRadius: 10,
    marginTop: 0,
    "&:hover": {
      defaultButton: {
        display: 'block'
      }
    }
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.lightSkyBlue,
  },
});

function Skills(props) {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [names, setNames] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [chipData, setChipData] = useState(names);
  const [newData, setNewData] = useState(null);
  const [show, setShow] = useState(false);

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });
  let i = 0;
  let loginId=props.jobseekerID;
  let login = props.login;


  function fetchData() {
    setLoadingData(true);
    setNames([]);
    axios.get(`${BACKEND_URL}/skills`).then(res => {
      if (res.data.success) {
        res.data.existingData.forEach(element => {
          names.push(element.name);
        });
      } else {
          setNames([])
      }
    })

    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
      .then(res => {
        if (res.data.success) {
          if (res.data.jobseeker.skills.length > 0) {
            if (res.data.jobseeker.skills[0] === "") {
              res.data.jobseeker.skills.splice(0, 1)
              i++;
            }
            setSkills(res.data.jobseeker.skills);
          }
          setLoadingData(false);

        }
      })
    setFetchedData(0);
  }

  function removeDuplicates() {
    for (let index = 0; index < skills.length; index++) {
      for (let j = 0; j < chipData.length; j++) {
        if (chipData[j] === skills[index]) {
          chipData.splice(j, 1);
          break;
        }
      }
    }
    showCombo()
  }


  useEffect(() => {
    fetchData();
  }, [fetchedData])

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function showOpen() {
    setShow(true);
  }

  function showClose() {
    setShow(false);
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

  function onSubmit(e) {
    e.preventDefault();

    var l = skills.length;
    for (let index = 0; index < newData?.length; index++) {
      skills[l++] = newData[index];
    }

    const skillset = {
      skills: skills,
    }


    axios.put(`${BACKEND_URL}/jobseeker/updateSkills/${loginId}`, skillset)
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Skills added successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Skills could not be added!",
          });
          handleAlert();
        }
      });
    setFetchedData(1);
    showClose();
    handleClose();
  }

  const handleDelete = (chipToDelete) => () => {
    setChipData([])
    skills.splice(chipToDelete, 1)
    axios.put(`${BACKEND_URL}/jobseeker/removeSkill/${loginId}`, skills)
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Skill deleted successfully!",
          });
          handleAlert();
          fetchData();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Skill could not be deleted!",
          });
        }
      });
      setShow(false);
      showCombo();
      handleAlert();
      removeDuplicates();
      handleClose();
      setFetchedData(1)
  };

  const showCombo = () => {
    if (show) {
      return (
        <>
          <Autocomplete
            style={{ width: "100%", margin: "10px 10% 20px 10%" }}
            multiple
            id="tags-outlined"
            filterSelectedOptions
            options={chipData}
            getOptionLabel={(option) => option}
            onChange={(event, value) => {
              setNewData(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select new skills"
                placeholder="+ new"
              />
            )}
          />
          <Grid item xs={12}>
            <Button color="primary" onClick={onSubmit} style={{ float: "right", marginRight: "10%" }}>Save</Button>
            <Button onClick={showClose} style={{ float: "right", marginRight: "15px" }}>Cancel</Button>
          </Grid>
        </>
      );
    } else {
      return <></>;
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
              Skills
            </Typography>
          </Grid>
          <Grid item style={{ textAlign: 'right' }}>
            {login ? <>
              <Button className={classes.defaultButton} style={{ float: 'right', marginRight: '0px', backgroundColor: 'white' }} onClick={showOpen}>
                <EditIcon style={{ color: theme.palette.tuftsBlue, }} className={classes.editIcon} />
              </Button>
            </> : null}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {removeDuplicates()}
          {showCombo()}

          <Grid item xs={12}>
            {loadingData ? <MiniLoading /> :
              <Paper elevation={0} component="ul" className={classes.paperChips}>
                {
                  skills.map((data) => {
                    let icon;
                    return show ? (
                      <li key={i++}>
                        <Chip
                          icon={icon}
                          label={data}
                          onDelete={handleDelete(i)}
                          className={classes.chip}
                        />
                      </li>
                    ) :
                      (<li key={i++}>
                        <Chip
                          icon={icon}
                          label={data}
                          className={classes.chip}
                        />
                      </li>);
                  })}
              </Paper>}
          </Grid>
        </Grid>
      </FloatCard>
    </>
  );
}

export default Skills
