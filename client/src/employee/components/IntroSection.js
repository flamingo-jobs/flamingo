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
import FacebookIcon from '@material-ui/icons/Facebook';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CloseIcon from '@material-ui/icons/Close';
import BACKEND_URL from '../../Config';
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles((theme) => ({
  paperCont: {
    backgroundColor: 'MintCream',
    padding: '15px',
    marginLeft:'-10px',
    marginRight:'-10px',
    borderRadius: 10,
  },
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
      backgroundColor: theme.palette.tuftsBlueHover,
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
    margin: "10px 0px 20px 0px",
    display: "flex",
    fontSize: "16px",
    "& label": {
      color: "#777",
      fontSize: '16px',
    }
  },
  avatar: {
    backgroundColor: theme.palette.lightSkyBlue,
    color: theme.palette.stateBlue,
  },
}));



function IntroSection(props) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    tagline: "",
    intro: "",
    street: "",
    city: "",
    zipCode: "",
    mobile: "",
    landLine: "",
    email: ""
  });
  const [isPublic, setIsPublic] = useState(true);

  let loginId;
  let login = false;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if(token === null){
    loginId=props.jobseekerID;
  }else if (header.payload.userRole === "jobseeker") {
    login = true;
    loginId=sessionStorage.getItem("loginId");
  } else {
    loginId=props.jobseekerID;
  }


  useEffect(()=>{
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
    .then(res => {
      if(res.data.success){
        let nameArr = res.data.jobseeker.name.split(" ")
        setState({
          firstName: nameArr[0],
          lastName: nameArr[1],
          tagline: res.data.jobseeker.tagline,
          intro: res.data.jobseeker.intro,
          street: res.data.jobseeker.address.street,
          city: res.data.jobseeker.address.city,
          zipCode: res.data.jobseeker.address.zipCode,
          mobile: res.data.jobseeker.contact.mobile,
          landLine: res.data.jobseeker.contact.phone,
          email: res.data.jobseeker.contact.email
        })
        setIsPublic(res.data.jobseeker.isPublic)
      }
    })
  },[])

  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

  function onChangeIsPublic(e){
    setIsPublic(e.target.checked)
  }

  function onChangeFirstName(e){
    setState(prevState => {
      return {...prevState, firstName: e.target.value}
    })
  }

  function onChangeLastName(e){
    setState(prevState => {
      return {...prevState, lastName: e.target.value}
    })
  }

  function onChangeIntro(e){
    setState(prevState => {
      return {...prevState, intro: e.target.value}
    })
  }

  function onChangeMobile(e){
    setState(prevState => {
      return {...prevState, mobile: e.target.value}
    })
  }

  function onChangeLandLine(e){
    setState(prevState => {
      return {...prevState, landLine: e.target.value}
    })
  }

  function onChangeEmail(e){
    setState(prevState => {
      return {...prevState, email: e.target.value}
    })
  }

  function onChangeStreet(e){
    setState(prevState => {
      return {...prevState, street: e.target.value}
    })
  }

  function onChangeCity(e){
    setState(prevState => {
      return {...prevState, city: e.target.value}
    })
  }

  function onChangeZipCode(e){
    setState(prevState => {
      return {...prevState, zipCode: e.target.value}
    })
  }

  function onSubmit(e){
    e.preventDefault();
    const jobseeker = {
      name: state.firstName+" "+state.lastName,
      gender: state.gender,
      tagline: state.tagline,
      intro: state.intro,
      address: {
        street: state.street,
        city: state.city,
        zipCode: state.zipcode,
      },
      contact: {
        email: state.email,
        phone: state.landLine,
        mobile: state.mobile,
      },
    }

    axios.put(`${BACKEND_URL}/jobseeker/update/${loginId}`,jobseeker)
    .then(res => console.log(jobseeker));
    handleClose();
  }

    return (
      <FloatCard>
        {/* <FormControlLabel
        style={{ float: 'left',marginLeft: '10px',color:theme.palette.tuftsBlue}}
          value="end"
          control={<Switch color="primary" />}
          label="Public"
          labelPlacement="start"
          checked={isPublic}
          onChange={onChangeIsPublic}
        /> */}
        { login ? <>
        <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}} onClick={handleOpen}>
            <EditIcon className={classes.editIcon} style={{color: theme.palette.tuftsBlue,}} />
        </Button>
        </> : null }
  
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
                      Edit Profile
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
                  <Grid container direction="row" style={{marginTop:'-18px'}}>
                    <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    size="small"
                    value={state.firstName}
                    onChange={onChangeFirstName}
                    style={{width:'45%',marginRight:'10%'}}
                    />
                    <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    value={state.lastName}
                    onChange={onChangeLastName}
                    style={{width:'45%'}}
                    />
                  </Grid>
                  <TextField
                    className={classes.field}
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={5}
                    variant="outlined"
                    value= {state.intro}
                    onChange= {onChangeIntro}
                  />
                  <Grid container direction="row" style={{marginTop:'35px'}}>
                  <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'18px',fontStyle:'italic',width:'100%',marginBottom:'10px'}}>
                    Contact Details
                  </Typography>
                    <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="Mobile"
                    variant="outlined"
                    size="small"
                    value={state.mobile}
                    onChange={onChangeMobile}
                    style={{width:'45%',marginRight:'10%'}}
                    />
                    {/* <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="Land Line"
                    variant="outlined"
                    size="small"
                    value={state.landLine}
                    onChange={onChangeLandLine}
                    style={{width:'45%'}}
                    /> */}
                  </Grid>
                  <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="Email"
                    type="text"
                    variant="outlined"
                    size="small"
                    value={state.email}
                    onChange={onChangeEmail}
                  />
                  <Grid container direction="row">
                    <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="Street Name"
                    variant="outlined"
                    size="small"
                    value={state.street}
                    onChange={onChangeStreet}
                    style={{width:'45%',marginRight:'10%'}}
                    />
                    <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    size="small"
                    value={state.city}
                    onChange={onChangeCity}
                    style={{width:'45%'}}
                    />
                  </Grid>
                  {/* <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="Zip Code"
                    variant="outlined"
                    size="small"
                    value={state.zipCode}
                    onChange={onChangeZipCode}
                    style={{width:'35%'}}
                    /> */}
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
            <Typography gutterBottom variant="h5" style={{color: theme.palette.stateBlue,fontWeight:'bold',marginTop:"-5px"}}>
              {state.firstName+" "+state.lastName}
            </Typography>
            <Typography gutterBottom style={{color: theme.palette.stateBlue,marginTop:'-8px'}}>
              {state.tagline}
            </Typography>
            <Grid container xs={12}>
          <Grid item xs={12} style={{ textAlign: 'center',margin:"0px 0px 0px 0px" }}>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'center',}}>
              <IconButton style={{paddingLeft:"0px"}}>
                <PhoneIcon style={{color: '#666',}} />
              </IconButton>
              {state.mobile}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center',marginTop:"-20px" }}>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'center',}}>
              <IconButton style={{paddingLeft:"0px"}}>
                <LocationOnIcon style={{color: '#666',}} />
              </IconButton>
              {state.street+", "+state.city}
            </Typography>
          </Grid>
        </Grid>
        <Paper elevation={0} className={classes.paperCont} style={{backgroundColor: "#ececf9"}}>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'left',}}>
              {state.intro}
            </Typography>
        </Paper>
        </CardContent>
  
        <CardActions style={{marginBottom:"-10px"}}>
        <Grid container>
          <Grid item xs style={{ textAlign: 'center',margin:"-15px 0px 0px 0px" }}>
              <a href={`mailto:${state.email}`}>
                <IconButton>
                  <Avatar className={classes.avatar}>
                    <MailRoundedIcon />
                  </Avatar>
                </IconButton>
              </a>
              <IconButton>
                <Avatar className={classes.avatar}>
                  <FacebookIcon />
                </Avatar>
              </IconButton>
              <IconButton>
                <Avatar className={classes.avatar}>
                  <LinkedInIcon />
                </Avatar>
              </IconButton>
              <IconButton>
                <Avatar className={classes.avatar}>
                  <GitHubIcon />
                </Avatar>
              </IconButton>
          </Grid>
        </Grid>
          
          
        </CardActions>
      </FloatCard>
    );
  }

  

export default IntroSection
