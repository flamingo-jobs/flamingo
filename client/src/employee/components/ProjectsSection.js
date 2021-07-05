import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FloatCard from '../../components/FloatCard';
import cardImage from '../images/profilePic.jpg';
import theme from '../../Theme';
import EditIcon from '@material-ui/icons/Edit';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import Grid from '@material-ui/core/Grid';
import ProjectItem from './ProjectItem';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import AddIcon from '@material-ui/icons/Add';
import Timeline from '@material-ui/lab/Timeline';
import Paper from '@material-ui/core/Paper';
import BACKEND_URL from '../../Config';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  defaultButton: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
      color: 'white',
    }
  },
  paper: {
    padding: '6px 16px',
    backgroundColor: '#D5F0F5',
    boxShadow: "0px 0px 0px 0px",
    borderRadius: 15,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  paperCont: {
    backgroundColor: 'MintCream',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
    borderRadius: 10,
    width:"100%",
    "&:hover": {
        defaultButton: {
            display: 'block'
        }
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
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: '600px',
    borderRadius: 10,
    paddingBottom: "30px"
  },
});

function ProjectsSection() {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [state, setState] = useState({name: null, link: null, description: null, from: null, to: null, usedTech: null});
  let i=0;

  function fetchData(){
    axios.get(`${BACKEND_URL}/jobseeker/60c5f2e555244d11c8012480`)
    .then(res => {
      if(res.data.success){
        if(res.data.jobseeker.project.length > 0){
          if(Object.keys(res.data.jobseeker.project[0]).length === 0){
            res.data.jobseeker.project.splice(0,1)
            i++;
          }
        }       
        setProject(res.data.jobseeker.project)
      }
    })
    setFetchedData(0)
  }

  function deleteData(index){
    project.splice(index,1)
    axios.put(`${BACKEND_URL}/jobseeker/removeProject/60c5f2e555244d11c8012480`,project)
    .then(res => console.log("aaa"));
    handleClose();
    setFetchedData(1)
  }

  useEffect(()=>{
    setState({name: null, link: null, description: null, from: null, to: null, usedTech: null});
    setProject(null);
    fetchData();
  },[fetchedData])

  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

  //---------------------------- text field onChange events
  function onChangeName(e){
    setState(prevState => {
      return {...prevState, name: e.target.value}
    })
  }

  function onChangeLink(e){
    setState(prevState => {
      return {...prevState, link: e.target.value}
    })
  }

  function onChangeDescription(e){
    setState(prevState => {
      return {...prevState, description: e.target.value}
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

  function onChangeUsedTech(e){
    setState(prevState => {
      return {...prevState, usedTech: e.target.value}
    })
  }

  function onSubmit(e){
    e.preventDefault();
    const newProject = {
        name: state.name,
        link: state.link,
        description: state.description,
        from: state.from,
        to: state.to,
        usedTech: state.usedTech
    }

    axios.put(`${BACKEND_URL}/jobseeker/addProject/60c5f2e555244d11c8012480`,newProject)
    .then(res => console.log(newProject));
    setFetchedData(1);
    handleClose();
  }
  
  const displayProjectFields = () => {
    if (project) {
      if (project.length > 0) {
      return project.map(pro => (
            <ProjectItem index={i++} name={pro.name} link={pro.link} description={pro.description} from={pro.from} to={pro.to} usedTech={pro.usedTech} parentFunction={deleteData} />
            ))
      }else{
        return (<Typography variant="body2" color="textSecondary" component="p">Project details not added.</Typography>)
      }
    }else{
      return (<Typography variant="body2" color="textSecondary" component="p">Project details not added.</Typography>)
    }
  }


  return (
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <LaptopChromebookIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Projects
            </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}} onClick={handleOpen}>
                <AddIcon style={{color: theme.palette.tuftsBlue,}} className={classes.editIcon} />
            </Button>
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}}>
                <GitHubIcon style={{color: theme.palette.tuftsBlue,marginRight:'15px'}} />
            </Button>
        </Grid>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          onChange={fetchData}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paperModal}>
              <div style={{paddingTop:'40px'}}>
                <Grid container xs={12} direction="row">
                  <Grid item xs={10}>
                    <Typography gutterBottom variant="h5" style={{textAlign:'center',paddingLeft:'50px',color:theme.palette.stateBlue}}>
                      Add Project
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
                    label="Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangeName}
                  />
                  <TextField
                  className={classes.field}
                    id="outlined-basic"
                    label="Link"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangeLink}
                  />
                  <TextField
                    className={classes.field}
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={5}
                    variant="outlined"
                    onChange= {onChangeDescription}
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
                    <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="Tech. Stack"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangeUsedTech}
                  />
                  </Grid>
                  </div>
                  <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
              </form>
              
            </div>
          </Fade>
        </Modal>
        
      </Grid>
      <Grid container spacing={3} style={{padding:'0px 15px 10px 15px'}}>
        <Paper elevation={0} className={classes.paperCont}>
          <Grid item xs={12}>
            <Timeline align="left">
              {displayProjectFields()}
            </Timeline>
          </Grid>
        </Paper>
      </Grid>
    </FloatCard>
  );
}

export default ProjectsSection
