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
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';

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
  const [fetchedData, setFetchedData] = useState('');
  const [open, setOpen] = useState(false);
  const [work, setWork] = useState(null);
  const [state, setState] = useState({place: null, description: null, position: null, from: null, to: null, taskAndResponsibility: null});

  function fetchData(){
    axios.get(`${BACKEND_URL}/jobseeker/60c5f2e555244d11c8012480`)
    .then(res => {
      if(res.data.success){
        setWork(res.data.jobseeker.work)
      }
    })
    setFetchedData(0)
  }

  useEffect(()=>{
    fetchData()
  },[fetchedData])

  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

  //---------------------------- text field onChange events
  function onChangePlace(e){
    setState(prevState => {
      return {...prevState, place: e.target.value}
    })
  }

  function onChangeDescription(e){
    setState(prevState => {
      return {...prevState, description: e.target.value}
    })
  }

  function onChangePosition(e){
    setState(prevState => {
      return {...prevState, position: e.target.value}
    })
  }

  function onChangeFrom(e){
    setState(prevState => {
      return {...prevState, from: e.target.value}
    })
  }

  function onChangeTo(e){
    setState(prevState => {
      return {...prevState, to: e.target.value}
    })
  }

  function onChangeTask(e){
    setState(prevState => {
      return {...prevState, taskAndResponsibility: e.target.value}
    })
  }

  function onSubmit(e){
    e.preventDefault();
    const newWork = {
        place: state.place,
        description: state.description,
        position: state.position,
        from: state.from,
        to: state.to,
        taskAndResponsibility: state.taskAndResponsibility,
    }

    axios.put(`${BACKEND_URL}/jobseeker/addWork/60c5f2e555244d11c8012480`,newWork)
    .then(res => console.log(newWork));
    setFetchedData(1);
    handleClose();
  }

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
                <AddIcon style={{color: theme.palette.tuftsBlue,}} className={classes.editIcon} onClick={handleOpen} />
            </Button>
        </Grid>

        {/*-------------- add new edu field popup content ------------------- */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div style={{paddingTop:'40px'}}>
                <Grid container xs={12} direction="row">
                  <Grid item xs={10}>
                    <Typography gutterBottom variant="h5" style={{textAlign:'center',paddingLeft:'50px',color:theme.palette.stateBlue}}>
                      Add Work Experience
                    </Typography>
                    <Divider variant="middle" style={{marginLeft:'100px'}} />
                  </Grid>
                  <Grid item xs={2}>
                    <Button className={classes.defaultButton} style={{ float: 'right',marginRight:'10px',marginTop:'-20px',backgroundColor:'white'}} onClick={handleClose}>
                      <CloseIcon className={classes.closeIcon} style={{color: '#666',}} />
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <form className={classes.form} onSubmit={onSubmit}>
                <div>
                <TextField
                  className={classes.field}
                    id="outlined-basic"
                    label="Position"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangePosition}
                  />
                  <TextField
                  className={classes.field}
                    id="outlined-basic"
                    label="Place"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangePlace}
                  />
                  <Grid container direction="row" style={{marginTop:'-18px'}}>
                    <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="From"
                    type="number"
                    variant="outlined"
                    size="small"
                    onChange={onChangeFrom}
                    style={{width:'30%',marginRight:'10%'}}
                    />
                    <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="To"
                    type="number"
                    variant="outlined"
                    size="small"
                    onChange={onChangeTo}
                    style={{width:'30%'}}
                    />
                  </Grid>
                  <TextField
                    className={classes.field}
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={5}
                    variant="outlined"
                    onChange= {onChangeDescription}
                  />
                  <TextField
                    className={classes.field}
                    id="outlined-multiline-static"
                    label="Tasks & Responsibilities"
                    multiline
                    rows={5}
                    variant="outlined"
                    onChange= {onChangeTask}
                  />
                  </div>
                  <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
              </form>
              
            </div>
          </Fade>
        </Modal>
        
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
