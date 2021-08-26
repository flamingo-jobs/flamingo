import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import {
  Grid,
  Container,
  Typography,
  IconButton,
} from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import { StateBlueTextField } from "./customTextField";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  tasksContainer: {
    padding: theme.spacing(3),
  },
  tasksTitle: {
    fontSize: "15px",
    textAlign: "left",
    color: theme.palette.stateBlue,
  },
  mainContainer: {
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  },
  buttonGridItem:{
    display: "flex",
    flexDirection :"column",
    justifyContent: "center",
  },
  removeIcon: {
    color: theme.palette.stateBlue,
  },
  addIcon: {
    color: theme.palette.stateBlue,
  },
  addRemoveButton:{
    padding: "12px",
    [theme.breakpoints.down("sm")]: {
      padding: "5px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "2px",
    }
  },
}));

const TasksForm = ({
  tasksFields,
  handleTaskChange,
  handleTaskRemove,
  handleTaskAdd,
  errors,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.card}>
        <Grid item container spacing={4} className={classes.mainContainer}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {tasksFields.map((field, index) => (
                <Grid item container key={index}>
                  <Grid item xs={9}>
                    <StateBlueTextField
                      name="task"
                      label="Responsibility"
                      variant="outlined"
                      value={field}
                      fullWidth
                      multiline
                      size="small"
                      onChange={(event) => handleTaskChange(event, index)}
                      error={errors.tasks[index].length !== 0}
                      helperText={errors.tasks[index].length !== 0 && errors.tasks[index]}
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.buttonGridItem}>
                    <div>
                      <IconButton
                        className={classes.addRemoveButton}
                        disabled={tasksFields.length === 1}
                        onClick={() => handleTaskRemove(index)}
                      >
                        <RemoveIcon
                          className={classes.removeIcon}
                          style={{
                            color: tasksFields.length === 1 ? "#bbb" : null,
                          }}
                        />
                      </IconButton>
                      <IconButton 
                        className={classes.addRemoveButton} 
                        onClick={handleTaskAdd}
                      >
                        <AddIcon className={classes.addIcon} />
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
    </Grid>
  );
};

export default TasksForm;
