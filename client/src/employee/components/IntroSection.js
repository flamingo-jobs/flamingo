import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import PhoneIcon from '@material-ui/icons/Phone';
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FloatCard from '../../components/FloatCard';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL, { FILE_URL } from '../../Config';
import theme from '../../Theme';
import defaultImage from '../images/defaultProfilePic.jpg';
import uploadFileToBlob, { isStorageConfigured } from '../../utils/azureFileUpload';
import { useDispatch } from "react-redux";
import { setProfilePicReload } from "../../redux/actions";
import Loading from "../../components/Loading";
import Compressor from 'compressorjs';

const storageConfigured = isStorageConfigured();


const useStyles = makeStyles((theme) => ({
  paperCont: {
    backgroundColor: 'MintCream',
    padding: '15px',
    marginLeft: '-10px',
    marginRight: '-10px',
    borderRadius: 10,
  },
  media: {
    height: '150px',
    width: '150px',
    margin: 'auto',
    borderRadius: 30,
    marginTop: 15,
    "&:hover": {
      boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.5)",
      cursor: "pointer"
    }
  },
  mediaPreview: {
    height: '150px',
    width: '150px',
    margin: 'auto',
    borderRadius: 30,
    marginTop: 15
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
  overlayIcon: {
    fontSize: "35px",
    color: "white",
    marginTop: "60px",
    marginLeft: "60px",
    position: "absolute"
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

  },
  field: {
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
  uploadBtnWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    width: "200px",
    marginLeft: "60px",
    marginRight: "60px",
    color: theme.palette.stateBlue,
    borderColor: theme.palette.stateBlue,
    "&:hover": {
      borderColor: theme.palette.stateBlue,
    },
  },
  placeholder: {
    height: 30,
  },
}));



function IntroSection(props) {

  const classes = useStyles();
  const [style, setStyle] = useState({ display: 'none' });
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef();
  const [loadingData, setLoadingData] = useState(true);
  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  const [openImageDialog, setOpenImageDialog] = React.useState(false);

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
    email: "",
    facebook: "",
    linkedin: "",
    github: "",
  });

  const [isPublic, setIsPublic] = useState(true);
  const [profilePic, setProfilePic] = useState("empty");
  const [profilePicPreview, setProfilePicPreview] = useState(defaultImage);
  const [mobileError, setMobileError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [savedPic, setSavedPic] = useState(require(`../../components/images/loadingImage.gif`).default);
  const dispatch = useDispatch();

  let loginId=props.jobseekerID;
  let login = props.login;

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

  const loadLogo = async () => {
    let randomNo = Math.floor((Math.random() * 1000) + 111);
    await axios.get(`${FILE_URL}/jobseeker-profile-pictures/${loginId}.png?dummy=${randomNo}`).then(res => {
      setSavedPic(`${FILE_URL}/jobseeker-profile-pictures/${loginId}.png?dummy=${randomNo}`);
      setProfilePicPreview(`${FILE_URL}/jobseeker-profile-pictures/${loginId}.png?dummy=${randomNo}`)
    }).catch(error => {
      setSavedPic(defaultImage);
    })
  }

  useEffect(() => {
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
      .then(res => {
        if (res.data.success) {
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
            email: res.data.jobseeker.contact.email,
            facebook: res.data.jobseeker.contact.facebook,
            linkedin: res.data.jobseeker.contact.linkedin,
            github: res.data.jobseeker.contact.github
          })
          setIsPublic(res.data.jobseeker.isPublic)
          setLoadingData(false);
          loadLogo()
        }
      })
  }, [])

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleOpenImageDialog = () => {
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  function onChangeIsPublic(e) {
    setIsPublic(e.target.checked)
  }

  const onChangeProfilePic = (e) => {
    setProfilePic("empty");
    setProfilePicPreview(defaultImage);

    if (!loading && e.target.files[0] !== null) {
      setLoading(true);
      setDisabled(true);
    }

    if (e.target.files[0]) {
      let nameSplit = e.target.files[0].name.split(".");
      // console.log("file extention", nameSplit[nameSplit.length - 1]);
      if (nameSplit[nameSplit.length - 1] !== "jpg" && nameSplit[nameSplit.length - 1] !== "png" && nameSplit[nameSplit.length - 1] !== "JPG" && nameSplit[nameSplit.length - 1] !== "PNG" && nameSplit[nameSplit.length - 1] !== "jiff" && nameSplit[nameSplit.length - 1] !== "JIFF") {
        // console.log("type invalid");
        setAlertData({
          severity: "error",
          msg: "Invalid file type, only jpg and png file types are allowed",
        });
        handleAlert();
      } else {
        var file = e.target.files[0];


        var blob = file.slice(0, file.size);
        var newFile = new File([blob], `${loginId}.png`, { type: 'image/png' });
        new Compressor(newFile, {
          quality: 0.4,
          width: 200,
          success: (compressedResult) => {
            setProfilePic(compressedResult);
            setProfilePicPreview(URL.createObjectURL(compressedResult));
          },
        });

      }
    }
    // setQuery('success')
    setLoading(false);
    setDisabled(false);
  };
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const onSubmitProfilePic = async (e) => {
    e.preventDefault();

    if (profilePic === "empty") {
      setAlertData({
        severity: "error",
        msg: "You should select an image first",
      });
      handleAlert();
      return;
    }

    setDisabled(true);

    const data = new FormData();
    data.append("userId", loginId);
    data.append("photo", profilePic);

    await uploadFileToBlob(profilePic, "jobseeker-profile-pictures")

    handleCloseImageDialog();
    setDisabled(false);
    setSavedPic(require(`../../components/images/loadingImage.gif`).default);
    dispatch(setProfilePicReload(true));
    loadLogo();

  }

  function onChangeFirstName(e) {
    setState(prevState => {
      return { ...prevState, firstName: e.target.value }
    })
  }

  function onChangeLastName(e) {
    setState(prevState => {
      return { ...prevState, lastName: e.target.value }
    })
  }

  function onChangeTagLine(e) {
    setState(prevState => {
      return { ...prevState, tagline: e.target.value }
    })
  }

  function onChangeIntro(e) {
    setState(prevState => {
      return { ...prevState, intro: e.target.value }
    })
  }

  function onChangeMobile(e) {
    setState(prevState => {
      return { ...prevState, mobile: e.target.value }
    })
    validateMobile(e);
  }

  function validateMobile(e) {
    const error = <span style={{ color: "red", paddingTop: "-30px", fontSize: "13px" }}>Invalid mobile number</span>;
    var regexp = /^\+[1-9]{1}[0-9]{3,14}$/;
    if (e.target.value !== "") {
      if (!regexp.test(e.target.value)) {
        setMobileError(error);
      } else {
        setMobileError(null);
      }
    } else {
      setMobileError(null);
    }
  }

  function onChangeEmail(e) {
    setState(prevState => {
      return { ...prevState, email: e.target.value }
    })
    validateEmail(e);
  }

  function validateEmail(e) {
    const error = <span style={{ color: "red", paddingTop: "-30px", fontSize: "13px" }}>Invalid email address</span>;
    var regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (e.target.value !== "") {
      if (!regexp.test(e.target.value)) {
        setEmailError(error);
      } else {
        setEmailError(null);
      }
    } else {
      setEmailError(null);
    }
  }

  function onChangeFacebook(e) {
    setState(prevState => {
      return { ...prevState, facebook: e.target.value }
    })
  }

  function onChangeLinkedin(e) {
    setState(prevState => {
      return { ...prevState, linkedin: e.target.value }
    })
  }

  function onChangeGithub(e) {
    setState(prevState => {
      return { ...prevState, github: e.target.value }
    })
  }

  function onChangeStreet(e) {
    setState(prevState => {
      return { ...prevState, street: e.target.value }
    })
  }

  function onChangeCity(e) {
    setState(prevState => {
      return { ...prevState, city: e.target.value }
    })
  }

  function onSubmit(e) {
    e.preventDefault();
    if (mobileError !== null || emailError !== null) {
      return;
    }
    const jobseeker = {
      name: state.firstName + " " + state.lastName,
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
        facebook: state.facebook,
        linkedin: state.linkedin,
        github: state.github,
      },
    }

    axios.put(`${BACKEND_URL}/jobseeker/update/${loginId}`, jobseeker)
      .then(res => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Updated successfully!",
          });
          handleAlert();
          axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
        } else {
          setAlertData({
            severity: "error",
            msg: "Details could not be updated!",
          });
          handleAlert();
        }
      });
    handleClose();
  }

  return (
    <>
      {displayAlert()}
      {loadingData ?
        <FloatCard>
          <Loading />
        </FloatCard> :
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
          {login ? <>
            <Button className={classes.defaultButton} style={{ float: 'right', marginRight: '0px', backgroundColor: 'white' }} onClick={handleOpen}>
              <EditIcon className={classes.editIcon} style={{ color: theme.palette.tuftsBlue, }} />
            </Button>
          </> : null}

          {/* ----- edit popup content */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography style={{ color: theme.palette.stateBlue, textAlign: 'left', fontSize: 18, fontWeight: 600 }}>
                Edit Basic Info
              </Typography>
            </DialogTitle>
            <DialogContent>
              <form className={classes.form}>
                <Grid container direction="row" spacing={3}>
                  {/* <Grid item xs={12}>
                    <Typography gutterBottom style={{ marginTop: 16, color: theme.palette.stateBlue, textAlign: 'left', fontSize: '18px', fontWeight: 600, width: '100%' }}>
                      Basic Details
                    </Typography>
                  </Grid> */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      size="small"
                      value={state.firstName}
                      onChange={onChangeFirstName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      size="small"
                      value={state.lastName}
                      onChange={onChangeLastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.field}
                      id="outlined-multiline-static"
                      label="Tagline"
                      multiline
                      rows={3}
                      variant="outlined"
                      value={state.tagline}
                      onChange={onChangeTagLine}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.field}
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      rows={5}
                      variant="outlined"
                      value={state.intro}
                      onChange={onChangeIntro}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Typography gutterBottom style={{ marginTop: 16, color: theme.palette.stateBlue, textAlign: 'left', fontSize: '18px', fontWeight: 600, width: '100%', }}>
                      Contact Details
                    </Typography>
                  </Grid> */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="Mobile"
                      type="text"
                      variant="outlined"
                      size="small"
                      value={state.mobile}
                      onChange={onChangeMobile}
                    />
                    {mobileError !== null ?
                      mobileError
                     : null}
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="Email"
                      type="email"
                      variant="outlined"
                      size="small"
                      value={state.email}
                      onChange={onChangeEmail}
                    />
                    {emailError !== null ?
                      emailError
                     : null}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="Street Name"
                      variant="outlined"
                      size="small"
                      value={state.street}
                      onChange={onChangeStreet}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      size="small"
                      value={state.city}
                      onChange={onChangeCity}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="Facebook"
                      type="text"
                      variant="outlined"
                      size="small"
                      value={state.facebook}
                      onChange={onChangeFacebook}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="Linkedin"
                      type="text"
                      variant="outlined"
                      size="small"
                      value={state.linkedin}
                      onChange={onChangeLinkedin}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.field}
                      id="outlined-basic"
                      label="Github"
                      type="text"
                      variant="outlined"
                      size="small"
                      value={state.github}
                      onChange={onChangeGithub}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: "#999" }}>
                Cancel
              </Button>
              <Button onClick={onSubmit} color="primary" autoFocus>
                Apply Changes
              </Button>
            </DialogActions>
          </Dialog>

          <Typography component="div">
            {login ? <>
              <CardMedia
                className={classes.media}
                image={savedPic}
                alt="profile image"
                zindex="background"
                onClick={handleOpenImageDialog}
                onMouseEnter={e => {
                  setStyle({ display: 'block' });
                }}
                onMouseLeave={e => {
                  setStyle({ display: 'none' })
                }}
              >
                <EditIcon className={classes.overlayIcon} style={style} />
              </CardMedia>
            </> :
              <CardMedia
                className={classes.mediaPreview}
                image={savedPic}
                alt="profile image"
                zindex="background"
              >
              </CardMedia>
            }
          </Typography>
          {/* Profile picture change dialog */}
          <Dialog open={openImageDialog} onClose={handleCloseImageDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{ textAlign: 'center', paddingLeft: '35px', color: theme.palette.stateBlue }}>Change Profile Picture</DialogTitle>
            <form onSubmit={onSubmitProfilePic} encType="multipart/form-data">
              <DialogContent style={{ paddingTop: "0px" }}>
                <Typography component="div">
                  <CardMedia
                    className={classes.mediaPreview}
                    image={profilePicPreview}
                    alt="profile image"
                    zindex="background"
                    style={{ marginTop: "0px", marginBottom: "20px" }}
                  />
                </Typography>
                <div className={classes.uploadBtnWrapper} style={{ color: "#fff", minWidth: 320 }}>
                  <input
                    autoFocus
                    margin="dense"
                    id="photo"
                    label="Photo"
                    type="file"
                    onChange={onChangeProfilePic}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="photo">
                    {!disabled ? <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      startIcon={<PublishIcon />}
                      className={classes.uploadButton}
                      disabled={disabled}
                    >
                      Upload Image
                    </Button> : <Avatar src={require(`../../components/images/loadingImage.gif`).default} />}
                    {/* {query === 'success' ? (
                        <CheckCircleIcon style={{color:"green"}} />
                      ) : (
                        <Fade
                          in={query === 'progress'}
                          style={{
                            transitionDelay: query === 'progress' ? '800ms' : '0ms',
                          }}
                          unmountOnExit
                        >
                          <CircularProgress />
                        </Fade>
                      )} */}
                  </label>

                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseImageDialog} style={{ color: "#999" }} disabled={disabled}>
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={disabled}>
                  Save
                </Button>
              </DialogActions>
            </form>


          </Dialog>

          <CardContent>
            <Typography gutterBottom variant="h5" style={{ color: theme.palette.stateBlue, fontWeight: 'bold', marginTop: "-5px" }}>
              {state.firstName + " " + state.lastName}
            </Typography>
            <Typography gutterBottom style={{ color: theme.palette.stateBlue, marginTop: '-8px' }}>
              {state.tagline}
            </Typography>
            <Grid container>
              <Grid item xs={12} style={{ textAlign: 'center', margin: "0px 0px 0px 0px" }}>
                {state.mobile ? <>
                <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'center', }}>
                  <IconButton style={{ paddingLeft: "0px" }}>
                    <PhoneIcon style={{ color: '#666', }} />
                  </IconButton>
                  {state.mobile}
                </Typography> </> : null}
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center', marginTop: "-10px" }}>
                <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'center', }}>
                {state.street || state.city ? <> 
                  <IconButton style={{ paddingLeft: "0px" }}>
                    <LocationOnIcon style={{ color: '#666', }} />
                  </IconButton>
                  {state.street && state.city ? state.street + ", " + state.city : state.city ? state.city : state.street} </> : null}
                </Typography> 
              </Grid>
            </Grid>
            {state.intro ? <>
            <Paper elevation={0} className={classes.paperCont} style={{ backgroundColor: "#ececf9" }}>
              <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'left', }}>
                {state.intro}
              </Typography>
            </Paper> </> : null }
          </CardContent>

          <CardActions style={{ marginBottom: "-10px" }}>
            <Grid container>
              <Grid item xs={12} style={{ textAlign: 'center', margin: "-15px 0px 0px 0px" }}>
                <a href={`mailto:${state.email}`}>
                  <IconButton>
                    <Avatar className={classes.avatar}>
                      <MailRoundedIcon />
                    </Avatar>
                  </IconButton>
                </a>
                <a href={state.facebook} target="_blank">
                  <IconButton>
                    <Avatar className={classes.avatar}>
                      <FacebookIcon />
                    </Avatar>
                  </IconButton>
                </a>
                <a href={state.linkedin} target="_blank">
                  <IconButton>
                    <Avatar className={classes.avatar}>
                      <LinkedInIcon />
                    </Avatar>
                  </IconButton>
                </a>
                <a href={state.github} target="_blank">
                  <IconButton>
                    <Avatar className={classes.avatar}>
                      <GitHubIcon />
                    </Avatar>
                  </IconButton>
                </a>
              </Grid>
            </Grid>


          </CardActions>
        </FloatCard>
      }
    </>
  );
}



export default IntroSection
