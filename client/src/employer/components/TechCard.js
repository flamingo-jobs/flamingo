import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { purple } from "@material-ui/core/colors";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    backgroundColor: theme.palette.greenyLightSky,
  },
  title: {
    fontSize: 14,
  },
  chip: {
    backgroundColor: theme.palette.blueJeans,
    color: theme.palette.white,
    marginRight: 5,
    marginBottom: 5,
  },
  addButton: {
    marginTop: -5,
    marginLeft: 40,
    color: theme.palette.blueJeans,
    "&:hover": {
      color: theme.palette.blueJeansHover,
    },
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

export default function TechCard(props) {
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

  // const [state, setState] = React.useState({
  //   React: false,
  //   jQuery: false,
  //   Angular: false,
  //   Springboot: false,
  //   Express: false,
  // });
  const [subSubArray, update] = React.useState(new Set());
  const addSubTechnologyStack = () => {
    console.log(subSubArray);

    setOpen(false);
  };

  useEffect(() => {
    console.log(props.name)
    console.log(props.list);
  }, []);
  const handleChange = (event) => {
    if (!event.target.checked)
      update(
        (oldArray) =>
          new Set([...oldArray].filter((x) => x !== event.target.name))
      );
    else update((oldArray) => new Set([...subSubArray, event.target.name]));
    // setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container xs={12} direction="column" spacing={1}>
          <Grid item container sm={12} direction="row" spacing={1}>
            {/* TECHNOLOGY CATEGORY NAME */}

            <Grid item sm={10}>
              <Typography className={classes.title} gutterBottom>
                {props.name}
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
                <EditIcon />
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
                    {Object.entries(props.list[props.name]).map(([object, i]) => (
                      <FormControlLabel
                        control={
                          <PurpleCheckbox
                            // checked={state.frontend}
                            onChange={handleChange}
                            name={i}
                            className={classes.checkbox}
                          />
                        }
                        label={i}
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
                    onClick={addSubTechnologyStack}
                    className={classes.dialogbuttons}
                  >
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>

          </Grid>

          <Grid item sm={12}>
            {Array.from(subSubArray).map((object, i) => (
              <Chip
                label={object}
                variant="outlined"
                className={classes.chip}
              />
            ))}
            
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
