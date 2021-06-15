import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FloatCard from '../../components/FloatCard';
import cardImage from '../images/profilePic.jpg';
import theme from '../../Theme';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import BACKEND_URL from '../../Config';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  media: {
    height: '150px',
    width: '150px',
    margin: 'auto',
    borderRadius: 30,
    marginTop: 15,
  },
  defaultButton: {
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    marginLeft: 20,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
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
  changePicture: {
      width: '0px',
  },
  socialMediaButton: {
    color: theme.palette.tuftsBlue,
    width: '35px',
    fontSize: '30px',
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
}));



function IntroSection() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({name:'bbb', intro:'ccc'});
  const name = state.name;
  const intro = state.intro;


  useEffect(()=>{
    axios.get(`${BACKEND_URL}/jobseeker/60c5f2e555244d11c8012480`)
    .then(res => {
      if(res.data.success){
        setState({
          name: res.data.jobseeker.name,
          intro: res.data.jobseeker.intro
        })
      }
    })
  },[])

  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

  function onChangeName(e){
    setState(prevState => {
      return {...prevState, name: e.target.value}
    })
  }

  function onChangeIntro(e){
    setState(prevState => {
      return {...prevState, intro: e.target.value}
    })
  }

  function onSubmit(e){
    e.preventDefault();
    const jobseeker = {
      name: name,
      intro: intro
    }

    axios.put(`${BACKEND_URL}/jobseeker/update/60c5f2e555244d11c8012480`,jobseeker)
    .then(res => console.log(jobseeker));
    handleClose();
  }

    return (
      <FloatCard>
        <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}} onClick={handleOpen}>
            <EditIcon className={classes.editIcon} style={{color: theme.palette.tuftsBlue,}} />
        </Button>
  
        {/* edit popup content */}
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
                      Add Education
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
                  <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="Name"
                    value= {name}
                    variant="outlined"
                    size="small"
                    onChange= {onChangeName}
                  />
                  <TextField
                    className={classes.field}
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={5}
                    variant="outlined"
                    value= {intro}
                    onChange= {onChangeIntro}
                  />
                  <Button type="submit" style={{ width:'100%',marginTop:'5%',backgroundColor:theme.palette.stateBlue,color:'white'}}>Apply Changes</Button>
              </form>
            </div>
          </Fade>
        </Modal>
        <Typography component="div">
        <CardMedia
              className={classes.media}
              image={cardImage}
              alt="profile image"
              zIndex="background"
          />
        </Typography>
          <CardContent>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.stateBlue,}}>
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'justify',}}>
              {intro}
            </Typography>
          </CardContent>
  
        <CardActions>
        <Grid container>
          <Grid item xs style={{ textAlign: 'left' }}>
            <GitHubIcon className={classes.socialMediaButton} style={{fontSize:'27px',}} />
            <LinkedInIcon className={classes.socialMediaButton} />
            <EmailIcon className={classes.socialMediaButton} />
            <FacebookIcon className={classes.socialMediaButton} />
          </Grid>
          <Grid item style={{ textAlign: 'right' }}>
              <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',}}>Upload CV</Button>
          </Grid>
        </Grid>
          
          
        </CardActions>
      </FloatCard>
    );
  }

  

export default IntroSection
