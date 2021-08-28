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
  qualificationsContainer: {
    padding: theme.spacing(3),
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
  qualificationsTitle: {
    fontSize: "15px",
    textAlign: "left",
    color: theme.palette.stateBlue,
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

const QualificationForm = ({
  qualificationsFields,
  handleQualificationChange,
  handleQualificationRemove,
  handleQualificationAdd,
  errors,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.card}>
        <Grid item container spacing={4} className={classes.mainContainer}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {qualificationsFields.map((field, index) => (
                <Grid item container key={index}>
                  <Grid item xs={9}>
                    <StateBlueTextField
                      name="qualification"
                      label="Qualification"
                      variant="outlined"
                      value={field}
                      fullWidth
                      multiline
                      size="small"
                      onChange={(event) =>
                        handleQualificationChange(event, index)
                      }
                      error={errors.requirements[index].length !== 0}
                      helperText={errors.requirements[index].length !== 0 && errors.requirements[index]}
                    />
                  </Grid>
                  <Grid item xs={3} className={classes.buttonGridItem}>
                    <div>
                      <IconButton
                        disabled={qualificationsFields.length === 1}
                        onClick={() => handleQualificationRemove(index)}
                        className={classes.addRemoveButton}
                      >
                        <RemoveIcon
                          className={classes.removeIcon}
                          style={{
                            color:
                              qualificationsFields.length === 1 ? "#bbb" : null,
                          }}
                        />
                      </IconButton>
                      <IconButton 
                        onClick={handleQualificationAdd}
                        className={classes.addRemoveButton}
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

export default QualificationForm;
