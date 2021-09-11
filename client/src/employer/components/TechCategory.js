import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { purple } from "@material-ui/core/colors";
import FloatCard from '../../components/FloatCard';
import TechCard from "./TechCard";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    color: theme.palette.white,
  },
  techStackWording: {
    marginBottom: 10,
  },
  addButton: {
    marginTop: -5,
    marginLeft: 30,
    color: theme.palette.grey,
    "&:hover": {
      color: theme.palette.greyHover,
    },
  },
  dialogbuttons: {
    color: theme.palette.purple,
  },
  topBar: {
    marginBottom: -30,
  },
  title: {
    marginLeft: 5,
  },
  techCard:{
    marginBottom: -30,
  }
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

function TechCategory(props) {
  const classes = useStyles();

  const bull = <span className={classes.bullet}>•</span>;
  const [open, setOpen] = React.useState(false);
  const [subTechnologies, setSubTechnologies] = React.useState([]);

  // useEffect(() => {
  //   subTechnologies.push({name:props.name,list:props.list});
  //   // console.log(subTechnologies)
  //   // setSubTechnologies([...subTechnologies, props.list]);
  // }, []);

  //Event handlers for add new technologies dialog box

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  const [subArray, update] = React.useState(new Set());

  // const [state, setState] = React.useState({
  //   frontend: false,
  //   backend: false,
  //   mobile: false,
  //   middleware: false,
  // });

  const addSubTechnologyStack = () => {
    // console.log(subArray);

    setOpen(false);
  };

  const handleChange = (event) => {
    if (!event.target.checked)
      update(
        (oldArray) =>
          new Set([...oldArray].filter((x) => x !== event.target.name))
      );
    else update((oldArray) => new Set([...subArray, event.target.name]));
    // setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <FloatCard>
        <Grid item container sm={12} direction="row" spacing={1}>
          <Grid item sm={10}>
            <Typography variant="body1" className={classes.title}>
              {props.name}
            </Typography>
          </Grid>

          {/* Add new technology category */}

          <Grid item sm={1}>
            {/* button to open the dialog box to add new tech categories */}
            {props.userRole === "employer" && 
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
                Add Sub Categories
              </DialogTitle>

              <DialogContent>
                {/* <DialogContentText>
                    <Typography> Software Development </Typography>
                </DialogContentText> */}

                <FormGroup row>
                  {Object.entries(props.list).map(([object,i]) => (
                    <FormControlLabel
                      control={
                        <PurpleCheckbox
                          // checked={state.frontend}
                          onChange={handleChange}
                          name={object}
                          className={classes.checkbox}
                        />
                      }
                      label={object}
                    />
                  ))}

                </FormGroup>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} className={classes.dialogbuttons}>
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

        <Grid container direction="column" spacing={1}>
          {Array.from(subArray).map((object, i) => (
            <Grid item sm={12}>
              <TechCard
                name={object} 
                list={props.list} 
                className={classes.techCard}
                userRole={props.userRole}
              />
            </Grid>
          ))}
        </Grid>
      </FloatCard>
    </div>
  );
}

const mycities = [{ city: "A" }, { city: "B" }, { city: "C" }];

const cities = [
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

export default TechCategory;
