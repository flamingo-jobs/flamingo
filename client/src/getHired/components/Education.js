import { React } from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FloatCard from "../../components/FloatCard";
import backgroundImage from "../images/background.jfif";
import SideDrawer from "../../components/SideDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    backgroundSize: "cover",
  },
  container: {
    width: "100%",
    margin: "0 auto",
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: "100vh",
  },
  overlay: {
    backgroundColor: "rgba(213, 239, 247, 0.605)",
    minHeight: "100vh",
  },
  background: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundSize: "cover",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    backgroundColor: theme.palette.lightSkyBlue,
    color: theme.palette.stateBlue,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 20,
    display: "contents",
  },
  next: {
    boxShadow: "none",
    color: theme.palette.white,
    backgroundColor: theme.palette.skyBlueCrayola,
    borderRadius: 25,
    marginTop: "50px",
    "&:hover": {
      backgroundColor: theme.palette.skyBlueCrayolaHover,
      color: "white",
      boxShadow: "none",
    },
  },
  previous: {
    boxShadow: "none",
    color: theme.palette.white,
    backgroundColor: theme.palette.ashBlue,
    borderRadius: 25,
    marginTop: "50px",
    "&:hover": {
      backgroundColor: theme.palette.ashBlueHover,
      color: "white",
      boxShadow: "none",
    },
  },
  media: {
    height: "80vh",
  },
  textField: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    "& fieldset": {
      borderColor: theme.palette.tuftsBlue,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.pinkyRed + " !important",
    },
  },
  title: {
    marginBottom: 5,
  },
  animation: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  return: {
    alignSelf: "self-start",
  },
  jobDetailsContainer: {
    textAlign: "left",
    marginBottom: theme.spacing(4),
  },

  sideDrawer: {
    position: "fixed",
    minWidth: "17.9%",
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("xl")]: {
      minWidth: "16.66667%",
    },
  },
  sideDrawerGrid: {
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  mainGrid: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  topBarGrid: {
    paddingTop: "22px !important",
    marginBottom: "auto",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
  },
  screen: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

export const Education = ({
  navigation,
  university,
  handleSchoolInputChange,
  handleSchoolAddClick,
  handleSchoolRemoveClick,
  college,
  handleCollegeInputChange,
  handleCollegeAddClick,
  handleCollegeRemoveClick,
  course,
  handleCourseInputChange,
  handleCourseAddClick,
  handleCourseRemoveClick,
}) => {
  const classes = useStyles();

  return (
    // <div className={classes.background}>
    //   <div className={classes.overlay}>
    //     <Container className={classes.container}>
    //       <Grid
    //         container
    //         direction="row"
    //         spacing={3}
    //         className={classes.mainGrid}
    //         justify="space-between"
    //         alignItems="flex-start"
    //       >
    //         <Grid
    //           item
    //           xs={false}
    //           sm={4}
    //           md={3}
    //           lg={2}
    //           className={classes.sideDrawer}
    //         >
    //           <SideDrawer />
    //         </Grid>
    //         <Grid
    //           item
    //           xs={false}
    //           sm={4}
    //           md={3}
    //           lg={2}
    //           className={classes.sideDrawerGrid}
    //         ></Grid>
    //         <Grid
    //           item
    //           container
    //           xs={12}
    //           sm={8}
    //           md={9}
    //           lg={10}
    //           spacing={3}
    //           className={classes.topBarGrid}
    //           direction="column"
    //           justify="space-between"
    //         >
    // <Container className={classes.container}>
    //   <FloatCard>
    <Container>
      <Grid
        container
        spacing={4}
        justify="space-between"
        className={classes.gridCont}
      >
        <Grid item xs={12} md={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={'span'} className={classes.title}>
                <h4>Unversity Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {university.map((x, i) => {
                return (
                  <Grid container alignItems="center" spacing={3} style={{ marginBottom: 20 }} key={i}>
                    <Grid item xs={12} md={9} align="center" >
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={8} align="center">
                          <TextField size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="degree"
                            label="Degree"
                            value={x.degree}
                            onChange={(e) => handleSchoolInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="gpa"
                            label="GPA"
                            value={x.gpa}
                            onChange={(e) => handleSchoolInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="university"
                            label="University Name"
                            value={x.university}
                            onChange={(e) => handleSchoolInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="from"
                            label="From"
                            value={x.from}
                            onChange={(e) => handleSchoolInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="to"
                            label="To"
                            value={x.to}
                            onChange={(e) => handleSchoolInputChange(e, i)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
                      {university.length !== 1 && (
                        <IconButton
                          onClick={() => handleSchoolRemoveClick(i)}
                          color="secondary"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      )}
                      {university.length - 1 === i && (
                        <IconButton
                          onClick={handleSchoolAddClick}
                          color="primary"
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>

        {/* Course Details */}
        <Grid item xs={12} lg={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={'span'} className={classes.title}>
                <h4>Course Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {course.map((x, i) => {
                return (
                  <Grid container alignItems="center" spacing={3} style={{ marginBottom: 20 }} key={i}>
                    <Grid item xs={12} md={9} align="center" >
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} align="center">
                          <TextField size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="course"
                            label="Course Name"
                            value={x.course}
                            onChange={(e) => handleCourseInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="institute"
                            label="Institute"
                            value={x.institute}
                            onChange={(e) => handleCourseInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="from"
                            label="From"
                            value={x.from}
                            onChange={(e) => handleCourseInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="to"
                            label="To"
                            value={x.to}
                            onChange={(e) => handleCourseInputChange(e, i)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
                      {course.length !== 1 && (
                        <IconButton
                          onClick={() => handleCourseRemoveClick(i)}
                          color="secondary"
                          aria-label="Add new Course"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      )}
                      {course.length - 1 === i && (
                        <IconButton
                          onClick={handleCourseAddClick}
                          color="primary"
                          aria-label="Remobe course"
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
   
  {/* <Container className={classes.jobDetailsContainer}>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="flex-end"
                        >
                          <Grid item sm={6} md={6} align="center">
                            <Grid
                              container
                              alignItems="center"
                              justify="flex-end"
                              spacing={2}
                            >
                              <Grid item align="center">
                                <Button
                                  fullWidth
                                  variant="outlined"
                                  className={classes.previous}
                                  onClick={() => navigation.previous()}
                                >
                                  Previous
                                </Button>
                              </Grid>{" "}
                              <Grid item align="center">
                                <Button
                                  fullWidth
                                  variant="contained"
                                  className={classes.next}
                                  onClick={() => navigation.next()}
                                >
                                  Next
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Container> */}

    {/* //         </Grid>
    //       </Grid>
    //     </Container>
    //   </div>
    // </div> */}
    </Container>
  );
};
