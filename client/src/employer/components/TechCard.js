import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
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
    // minWidth: 275,
    backgroundColor: theme.palette.greenyLightSky,
  },
  title: { 
    fontSize: 14,
  },
  chip: {
    backgroundColor: theme.palette.turquoise,
    marginRight: 5,
    marginBottom: 5,
  },
  addButton: {
    marginTop: -5,
    marginLeft: -5,
    backgroundColor: theme.palette.turquoise,
  },
  removeButton: {
    marginTop: -5,
    backgroundColor: theme.palette.turquoise,
  },
  dialogbuttons: {
    color: theme.palette.purple,
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

export default function TechCard() {
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
    React: false,
    jQuery: false,
    Angular: false,
    Springboot: false,
    Express: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container xs={12} direction="column" spacing={1}>
          <Grid item container sm={12} direction="row" spacing={1}>
            {/* TECHNOLOGY CATEGORY NAME */}

            <Grid item sm={10}>
              <Typography className={classes.title} gutterBottom>
                Frontend Development
              </Typography>
            </Grid>

            {/* ADD OR REMOVE NEW TECHNOLOGIES */}

            <Grid item sm={1}>
              {/* PLUS BUTTON TO ADD NEW TECHNOLOGIES */}

              <IconButton
                variant="outlined"
                size="small"
                aria-label="add-tech-form-title"
                className={classes.addButton}
                onClick={handleClickOpen}
              >
                <AddIcon />
              </IconButton>

              {/* DIALOG BOX TO ADD TECHNOLOGIES */}

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="add-tech-form-title"
              >
                <DialogTitle id="add-tech-form-title">
                  Add Technologies
                </DialogTitle>

                <DialogContent>
                  <DialogContentText>
                    <Typography> Frontend Development </Typography>
                  </DialogContentText>

                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <PurpleCheckbox
                          checked={state.React}
                          onChange={handleChange}
                          name="React"
                          className={classes.checkbox}
                        />
                      }
                      label="React"
                    />
                    <FormControlLabel
                      control={
                        <PurpleCheckbox
                          checked={state.jQuery}
                          onChange={handleChange}
                          name="jQuery"
                          className={classes.checkbox}
                        />
                      }
                      label="jQuery"
                    />
                    <FormControlLabel
                      control={
                        <PurpleCheckbox
                          checked={state.Angular}
                          onChange={handleChange}
                          name="Angular"
                          className={classes.checkbox}
                        />
                      }
                      label="Angular"
                    />
                    <FormControlLabel
                      control={
                        <PurpleCheckbox
                          checked={state.Springboot}
                          onChange={handleChange}
                          name="Springboot"
                          className={classes.checkbox}
                        />
                      }
                      label="Springboot"
                    />

                    <FormControlLabel
                      control={
                        <PurpleCheckbox
                          checked={state.checkedA}
                          onChange={handleChange}
                          name="Express"
                          className={classes.checkbox}
                        />
                      }
                      label="Express"
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

            <Grid item sm={1}>
              {/* MINUS ICON TO REMOVE EXISTING TECHNOLOGIES */}

              <IconButton
                variant="outlined"
                size="small"
                aria-label="remove"
                className={classes.removeButton}
              >
                <RemoveIcon />
              </IconButton>

              {/* DIALOG BOX TO REMOVE EXISTING TECHNOLOGIES */}

              {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                            <DialogTitle id="form-dialog-title">Remove Existing Technologies</DialogTitle>

                            <DialogContent>
                                <DialogContentText>
                                    <Typography> Software Development </Typography>
                                </DialogContentText>

                                <FormGroup row>

                                    <FormControlLabel
                                        control={<PurpleCheckbox checked={state.React} onChange={handleChange} name="React" className={classes.checkbox} />}
                                        label="React"
                                    />
                                    <FormControlLabel
                                        control={<PurpleCheckbox checked={state.jQuery} onChange={handleChange} name="jQuery" className={classes.checkbox} />}
                                        label="jQuery"
                                    />
                                    <FormControlLabel
                                        control={<PurpleCheckbox checked={state.Angular} onChange={handleChange} name="Angular" className={classes.checkbox} />}
                                        label="Angular"
                                    />
                                    <FormControlLabel
                                        control={<PurpleCheckbox checked={state.Springboot} onChange={handleChange} name="Springboot" className={classes.checkbox} />}
                                        label="Springboot"
                                    />

                                    <FormControlLabel
                                        control={<PurpleCheckbox checked={state.checkedA} onChange={handleChange} name="Express" className={classes.checkbox} />}
                                        label="Express"
                                    />
                                </FormGroup>

                            </DialogContent>

                            <DialogActions>
                                <Button onClick={handleClose} className={classes.dialogbuttons}>
                                    Cancel
                                </Button>
                                <Button onClick={handleClose} className={classes.dialogbuttons}>
                                    Remove
                                </Button>
                            </DialogActions>

                        </Dialog> */}
            </Grid>
          </Grid>

          <Grid item sm={12}>
            <Chip label="React" variant="outlined" className={classes.chip} />
            <Chip label="Express" variant="outlined" className={classes.chip} />
            <Chip label="Angular" variant="outlined" className={classes.chip} />
            <Chip label="Vue.js" variant="outlined" className={classes.chip} />
            <Chip label="jQuery" variant="outlined" className={classes.chip} />
            <Chip
              label="Springboot"
              variant="outlined"
              className={classes.chip}
            />
            <Chip label="Java" variant="outlined" className={classes.chip} />
            <Chip label="Basic" variant="outlined" className={classes.chip} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
