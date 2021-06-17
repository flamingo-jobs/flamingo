import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FloatCard from '../../components/FloatCard';
import theme from '../../Theme';
import EditIcon from '@material-ui/icons/Edit';
import WorkIcon from '@material-ui/icons/Work';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import WorkExpItem from './WorkExpItem';
import BACKEND_URL from '../../Config';

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
      backgroundColor: '#0088cc',
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
  }
});

function WorkExperience() {
  const classes = useStyles();
  const [work, setWork] = useState(null);

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/jobseeker/60c5f2e555244d11c8012480`)
    .then(res => {
      if(res.data.success){
        setWork(res.data.jobseeker.work)
      }
    })
  },[])

  const displayWork = () => {
    if (work) {
      if (work.length > 0) {
      return work.map(wk => (
            <WorkExpItem place={wk.place} description={wk.description} position={wk.position} from={wk.from} to={wk.to} task={wk.taskAndResponsibility} />
            ))
      }else{
        return (<Typography variant="body2" color="textSecondary" component="p">Work experience details not added.</Typography>)
      }
    }else{
      return (<Typography variant="body2" color="textSecondary" component="p">Work experience details not added.</Typography>)
    }
  }

  return (
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <WorkIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Work Experience
            </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
        <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}}>
                <AddIcon style={{color: theme.palette.tuftsBlue,}} className={classes.editIcon} />
            </Button>
        </Grid>
        
      </Grid>
      <Grid container spacing={3}>
            <Grid item xs={12}>
              {displayWork()}
                {/* <WorkExpItem startYear="2019" endYear="2022" role="Intern Software Engineer" companyName="Company XYZ" description="This is a brief description on what work you have done and what responsibilities were given to you." />
                <WorkExpItem startYear="2019" endYear="2022" role="Volunteer" companyName="Programme Name" description="This is a brief description on what work you have done and what responsibilities were given to you." /> */}
            </Grid>
        </Grid>
    </FloatCard>
  );
}

export default WorkExperience
