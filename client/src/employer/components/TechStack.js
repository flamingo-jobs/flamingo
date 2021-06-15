import React from "react";
import {
  Avatar,
  Button,
  Chip,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import { FavoriteRounded } from "@material-ui/icons";
import FloatCard from "./FloatCard";
import Grid from "@material-ui/core/Grid";
import TechCategory from "./TechCategory";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { purple } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    color: theme.palette.white,
  },
  techStackWording: {
    marginBottom: 10,
  },
  addButton: {
    marginLeft: -20,
  },
  removeButton: {
    marginLeft: -20,
  },
  dialogbuttons: {
    color: theme.palette.purple,
  },
  topBar: {
    marginBottom: -30,
  },
  title:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

function TechStack() {
  const classes = useStyles();

  const bull = <span className={classes.bullet}>•</span>;
  const [open, setOpen] = React.useState(false);

  //Event handlers for add new technologies dialog box

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    softwareDevelopment: false,
    devOps: false,
    qualityAssurance: false,
    dataScience: false,
    uiUx: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <Grid container xs={12} direction="column" spacing={1}>
        <Grid item sm={12} className={classes.topBar}>
          {/* Floatcard for the top bar */}

          <FloatCard>
            <Grid item container sm={12} direction="row" spacing={1} >
              <Grid item sm={10} >
                <Typography variant="h6" className={classes.title}>
                  Technology Stack
                </Typography>
              </Grid>

              {/* Add new technology category */}

              <Grid item sm={1}>
                {/* button to open the dialog box to add new tech categories */}

                <IconButton
                  variant="outlined"
                  size="small"
                  aria-label="add"
                  className={classes.addButton}
                  onClick={handleClickOpen}
                >
                  <AddIcon />
                </IconButton>

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
                      <FormControlLabel
                        control={
                          <PurpleCheckbox
                            checked={state.softwareDevelopment}
                            onChange={handleChange}
                            name="softwareDevelopment"
                            className={classes.checkbox}
                          />
                        }
                        label="Software Development"
                      />
                      <FormControlLabel
                        control={
                          <PurpleCheckbox
                            checked={state.qualityAssurance}
                            onChange={handleChange}
                            name="qualityAssurance"
                            className={classes.checkbox}
                          />
                        }
                        label="Quality Assurance"
                      />
                      <FormControlLabel
                        control={
                          <PurpleCheckbox
                            checked={state.devOps}
                            onChange={handleChange}
                            name="devOps"
                            className={classes.checkbox}
                          />
                        }
                        label="DevOps"
                      />
                      <FormControlLabel
                        control={
                          <PurpleCheckbox
                            checked={state.uiUx}
                            onChange={handleChange}
                            name="uiUx"
                            className={classes.checkbox}
                          />
                        }
                        label="UI/UX"
                      />

                      <FormControlLabel
                        control={
                          <PurpleCheckbox
                            checked={state.dataScience}
                            onChange={handleChange}
                            name="dataScience"
                            className={classes.checkbox}
                          />
                        }
                        label="Data Science"
                      />
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
                      onClick={handleClose}
                      className={classes.dialogbuttons}
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>

              {/* Remove existing technology category */}

              <Grid item sm={1}>
                {/* button to open the dialog box to remove categories */}

                <IconButton
                  variant="outlined"
                  size="small"
                  aria-label="remove"
                  className={classes.removeButton}
                >
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          </FloatCard>
        </Grid>

        <Grid item sm={12}>
          <Grid container xs={12} direction="column" spacing={1}>
            <Grid item sm={12}>
              <TechCategory />
            </Grid>
            <Grid item sm={12}>
              <TechCategory />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default TechStack;
