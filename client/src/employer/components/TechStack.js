import React, { useEffect } from "react";
import {
  Button,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import FloatCard from '../../components/FloatCard';
import Grid from "@material-ui/core/Grid";
import TechCategory from "./TechCategory";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { purple } from "@material-ui/core/colors";
import EditIcon from '@material-ui/icons/Edit';

const jwt = require("jsonwebtoken");
let haveAccess = false;

if (sessionStorage.getItem("userToken")) {
  var accessTokens = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.accessTokens;
  if (accessTokens.includes("all") || accessTokens.includes("company")) {
    haveAccess = true;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    color: theme.palette.white,
  },
  techStackWording: {
    marginBottom: 10,
  },
  addButton: {
    marginLeft: 2,
  },
  dialogbuttons: {
    color: theme.palette.purple,
  },
  topBar: {
    marginBottom: -30,
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const PurpleCheckbox = withStyles({
  root: {
    color: purple[400],
    "&$checked": {
      color: purple[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function TechStack(props) {
  const classes = useStyles();

  const bull = <span className={classes.bullet}>•</span>;
  const [open, setOpen] = React.useState(false);
  const [technologies, setTechnologies] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/technologies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.existingData);

        data.existingData.forEach((element) => {
          console.log(element)
          // setTechnologies([...technologies, element]);
        
          technologies.push(element)
        });
        console.log(technologies);
      })
      .catch((error) => console.log(error.message));
  }, []);

  //Event handlers for add new technologies dialog box

  const handleClickOpen = () => {
    setOpen(true);
  };
  const getStack =(name)=>{
    console.log(name)
    var a=technologies.find(data=>data.name===name)['stack']
    console.log(a)
    return a
  }

  const handleClose = () => {
    setOpen(false);
  };

  // const [state, setState] = React.useState({
  //   softwareDevelopment: false,
  //   devOps: false,
  //   qualityAssurance: false,
  //   dataScience: false,
  //   uiUx: false,
  // });
  const [theArray, update] = React.useState(new Set());

  const addTechnologyStack = () => {
    console.log(theArray);

    setOpen(false);
  };

  const handleChange = (event) => {
    
    if (!event.target.checked)
      update(
        (oldArray) =>
          new Set([...oldArray].filter((x) => x !== event.target.name))
      );
    else update((oldArray) => new Set([...theArray, event.target.name]));

    // setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <Grid container xs={12} direction="column" spacing={1}>
        <Grid item sm={12} className={classes.topBar}>
          {/* Floatcard for the top bar */}

          <FloatCard>
            <Grid item container sm={12} direction="row" spacing={1}>
              <Grid item sm={10}>
                <Typography variant="h6" className={classes.title}>
                  Technology Stack
                </Typography>
              </Grid>

              {/* Add new technology category */}

              <Grid item sm={1}>
                {/* button to open the dialog box to add new tech categories */}

                {props.userRole === "employer" && haveAccess && 
                  <IconButton
                    variant="outlined"
                    size="small"
                    aria-label="add"
                    className={classes.addButton}
                    onClick={handleClickOpen}
                  >
                    <EditIcon />
                  </IconButton>
                }

                {/* dialog box to add new tech categories */}

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="add-techcategory-form-title"
                >
                  <DialogTitle id="add-techcategory-form-title">
                    Add Categories
                  </DialogTitle>

                  <DialogContent>
                    {/* <DialogContentText>
                                            <Typography> Software Development </Typography>
                                        </DialogContentText> */}

                    <FormGroup row>
                      {Array.from(technologies).map((object, i) => (
                        <FormControlLabel
                          control={
                            <PurpleCheckbox
                              // checked={object.checked}
                              onChange={handleChange}
                              name={object.name}
                              className={classes.checkbox}
                            />
                          }
                          label={object.name}
                        />
                      ))}

                     
                    </FormGroup>
                  </DialogContent>

                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      className={classes.dialogbuttons}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={addTechnologyStack}
                      className={classes.dialogbuttons}
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>

            </Grid>
          </FloatCard>
        </Grid>

        <Grid item sm={12}>
          <Grid container xs={12} direction="column" spacing={1}>
            
            {Array.from(theArray).map((object, i) => (
              
              <Grid item sm={12}>
                <TechCategory 
                  name={object} 
                  list={getStack(object)} 
                  userRole={props.userRole}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const myTechs = [{ city: "A" }, { city: "B" }, { city: "C" }];

const allTecs = [
  { city: "Colombo" },
  { city: "Gampaha" },
  { city: "Kandy" },
  { city: "Mumbai" },
  { city: "Delhi" },
  { city: "Bangalore" },
  { city: "Male" },
  { city: "New York" },
  { city: "Uppsala" },
  { city: "Göteborg" },
  { city: "Linköping" },
  { city: "A" },
  { city: "B" },
  { city: "C" },
];

export default TechStack;
