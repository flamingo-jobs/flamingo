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
import FloatCard from "./FloatCard";
import TechCard from "./TechCard";

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
    marginLeft: 5, 
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

function TechCategory() {
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
    frontend: false,
    backend: false,
    mobile: false,
    middleware: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <FloatCard>
        <Grid item container sm={12} direction="row" spacing={1} >
          <Grid item sm={10}>
            <Typography variant="body1" className={classes.title}>
              Web Development
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
                Add Sub Categories
              </DialogTitle>

              <DialogContent>
                {/* <DialogContentText>
                    <Typography> Software Development </Typography>
                </DialogContentText> */}

                <FormGroup row>
                  <FormControlLabel
                    control={
                      <PurpleCheckbox
                        checked={state.frontend}
                        onChange={handleChange}
                        name="frontend"
                        className={classes.checkbox}
                      />
                    }
                    label="Front-end Development"
                  />
                  <FormControlLabel
                    control={
                      <PurpleCheckbox
                        checked={state.backend}
                        onChange={handleChange}
                        name="backend"
                        className={classes.checkbox}
                      />
                    }
                    label="Backend Development"
                  />
                 
                  <FormControlLabel
                    control={
                      <PurpleCheckbox
                        checked={state.mobile}
                        onChange={handleChange}
                        name="mobile"
                        className={classes.checkbox}
                      />
                    }
                    label="Mobile Development"
                  />

                  <FormControlLabel
                    control={
                      <PurpleCheckbox
                        checked={state.middleware}
                        onChange={handleChange}
                        name="middleware"
                        className={classes.checkbox}
                      />
                    }
                    label="Middleware Development"
                  />
                </FormGroup>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} className={classes.dialogbuttons}>
                  Cancel
                </Button>
                <Button onClick={handleClose} className={classes.dialogbuttons}>
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

        <Grid container xs={12} direction="column" spacing={1}>
          <Grid item sm={12}>
            <TechCard />
          </Grid>
          <Grid item sm={12}>
            <TechCard />
          </Grid>
        </Grid>
      </FloatCard>
    </div>
  );
}

export default TechCategory;
