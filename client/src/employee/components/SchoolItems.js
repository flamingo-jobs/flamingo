import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FloatCard from '../../components/FloatCard';
import theme from '../../Theme';
import SchoolIcon from '@material-ui/icons/School';
import Grid from '@material-ui/core/Grid';
import EduItem from './EduItem';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import BACKEND_URL from '../../Config';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles({
  media: {
    height: '150px',
    width: '150px',
    margin: 'auto',
    borderRadius: 30,
    marginTop: 15,
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
  }
});

function UniItems() {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [schoolFields, setSchoolFields] = useState(null);
  const [school, setSchool] = useState({school: null, startDate: null, endDate: null, description: null});
  const [level, setLevel] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [eduCount, setEduCount] = useState(null);
  let i=0;

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }


  function fetchData(){
    axios.get(`${BACKEND_URL}/jobseeker/60c5f2e555244d11c8012480`)
    .then(res => {
      if(res.data.success){
        if(Object.keys(res.data.jobseeker.school[0]).length === 0){
            res.data.jobseeker.school.splice(0,1)
            i++;
        }
        setUniversityFields(res.data.jobseeker.school)
      }
    })
    setFetchedData(0)
  }

  useEffect(()=>{
    setSchool({
        school: null,
        startDate: null,
        endDate: null,
        description: null
      })
    fetchData()
  },[fetchedData])

  function deleteUniversity(index){
    universityFields.splice(index,1);
    axios.delete(`${BACKEND_URL}/jobseeker/removeSchool/60c5f2e555244d11c8012480`,schoolFields)
    .then(res => console.log("deleted"));
    handleClose();
    setFetchedData(1)
  }

  const displaySchFields = () => {
    if (universityFields) {
      if (universityFields.length > 0) {
        return universityFields.map(edu => (
            <EduItem index={i++} level="School" startYear={edu.startDate} endYear={edu.endDate} school={edu.school} degree={edu.degree} fieldOfStudy={edu.fieldOfStudy} gpa={"GPA : "+edu.GPA} societiesAndActivities={edu.societiesAndActivities}  parentFunction={deleteUniversity} />
            ))
        }else{
            return (<Typography variant="body2" color="textSecondary" component="p">University details not added.</Typography>)
        }
    }else{
        return (<Typography variant="body2" color="textSecondary" component="p">University details not added.</Typography>)
    }
  }

  return (
    <FloatCard>
      <Grid container>
            <Grid item xs={12}>
              {displayUniFields()}
            </Grid>
        </Grid>
    </FloatCard>
  );
}

export default UniItems
