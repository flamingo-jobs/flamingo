import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FloatCard from '../../components/FloatCard';
import theme from '../../Theme';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import Grid from '@material-ui/core/Grid';
import BACKEND_URL from '../../Config';
import AddIcon from '@material-ui/icons/Add';
import SnackBarAlert from "../../components/SnackBarAlert";
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
    padding: '5% 15% 5% 15%'
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
    marginTop:"-8px",
  },
  placeholderDate: {
    color: "#777",
    fontSize: '14px',
    marginTop:"12px",
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
  },
});

function Skills(props) {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [state, setState] = useState({course: null, institute: null, startYear: null, startMonth: null, endYear: null, endMonth: null});
  const names =["Angular","jQuery","Java","React",'Vue.js','Strategic Planning','Public Speaking','Analytical Thinking','Object Oriented Programming','Leadership','Web Development','Cloud Computing'];
  const [chipData, setChipData] = useState(names);
  const [newData, setNewData] = useState(null);
  const [show, setShow] = useState(false);

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });
  let i=0;
  let loginId;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if (header.payload.userRole === "jobseeker") {
    loginId=sessionStorage.getItem("loginId");
  } else {
    loginId=props.jobseekerID;
  }



  function fetchData(){
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
    .then(res => {
      if(res.data.success){
        if(res.data.jobseeker.skills.length > 0){
          setSkills(res.data.jobseeker.skills)
          removeDuplicates()
          showCombo()
        }       
      }
    })
    setFetchedData(0);
  }

  function removeDuplicates(){
    for (let index = 0; index < skills.length; index++) {
      for (let j = 0; j < chipData.length; j++) {
        if(chipData[j] === skills[index]){
          chipData.splice(j, 1);
          break;
        }
        
      }
      
    }
  }


  useEffect(()=>{
    fetchData();
  },[fetchedData])

  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

  function showOpen(){
    setShow(true);
  }

  function showClose(){
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
  

  //---------------------------- text field onChange events
  function onChangeCourse(e){
    setState(prevState => {
      return {...prevState, course: e.target.value}
    })
  }

  function onChangeInstitute(e){
    setState(prevState => {
      return {...prevState, institute: e.target.value}
    })
  }

  function onChangestartYear(e){
    setState(prevState => {
      return {...prevState, startYear: e.target.value}
    })
  }

  function onChangestartMonth(e){
    setState(prevState => {
      return {...prevState, startMonth: e.target.value}
    })
  }

  function onChangeEndYear(e){
    setState(prevState => {
      return {...prevState, endYear: e.target.value}
    })
  }


  function onSubmit(e){
    e.preventDefault();

    var l = skills.length;
    for (let index = 0; index < newData.length; index++) {
      skills[l++]=newData[index];   
    }

    const skillset = {
      skills: skills,
    }


    axios.put(`${BACKEND_URL}/jobseeker/updateSkills/${loginId}`,skillset)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Skills added successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Skills could not be added!",
        });
        handleAlert();
      }
    });
    setFetchedData(1);
    handleClose();
  }

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  
  const showCombo = () => {
      if(show){
        return (
          <React.Fragment>
          <Autocomplete
          style={{width:"100%",margin:"10px 120px 20px 120px"}}
            multiple
            id="tags-standard"
            options={chipData}
            getOptionLabel={(option) => option}
            onChange={(event, value) => {
              removeDuplicates();
              setNewData(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select new skills"
                placeholder="+ new"
              />
            )}
          />
          <Grid item xs={12}>
            <Button className={classes.defaultButton} onClick={onSubmit} style={{float:"right",marginRight:"115px"}}>Save</Button>
            <Button onClick={showClose} style={{float:"right",marginRight:"15px"}}>Cancel</Button>
            
          </Grid>
          </React.Fragment>
        );
      }
    
  }

  return (
    <>
    {displayAlert()}
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <EmojiEventsIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Skills
            </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}} onClick={showOpen}>
                <AddIcon style={{color: theme.palette.tuftsBlue,}} className={classes.editIcon} />
            </Button>
        </Grid>       
      </Grid>
      <Grid container spacing={3}>
      {showCombo()}
      
        <Grid item xs={12} alignItems="center" justify="center">
            <Paper elevation={0} component="ul" className={classes.paperChips}>
                {
                skills.map((data) => {
                    let icon;
                    return (
                    <li key={i++}>
                        <Chip
                        icon={icon}
                        label={data}
                        onDelete={handleDelete(data)}
                        className={classes.chip}
                        />
                    </li>
                    );
                })}
            </Paper>
        </Grid>
      </Grid>
    </FloatCard>
    </>
  );
}

export default Skills
