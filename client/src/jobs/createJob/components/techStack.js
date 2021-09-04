import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { StateBlueTextField } from "./customTextField";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    // border: "1px solid red",
  },
  techStackTitle: {
    fontSize: "15px",
    textAlign: "left",
    color: theme.palette.stateBlue,
  },
  mainContainer: {
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      padding: 16,
      paddingLeft: 5,
      paddingRight: 0,
    }
  },
  techStackContainer: {
    padding: theme.spacing(3),
  },
  chip: {
    color: theme.palette.white,
    background: theme.palette.stateBlue,
    marginLeft: "2px",
    marginRight: "2px",
  },
}));

const TechStack = ({ techStackState, technologies, handleTechStack, errors }) => {
  const classes = useStyles();

  const options = technologies
    .map((technology) => technology.stack)
    .map((stackElement) => {
      for (const item in stackElement) {
        return stackElement[item].map((finalTechnology) => finalTechnology);
      }
    })
    .flat(1);

  return (
    <Grid item xs={12} className={classes.card}>
        <Grid item container spacing={4} className={classes.mainContainer}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="techStack"
              options={options}
              defaultValue={techStackState}
              freeSolo
              onChange={(event, values) => handleTechStack(values)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    className={classes.chip}
                    deleteIcon={<CancelIcon className={classes.chipRemove} />}
                  />
                ))
              }
              renderInput={(params) => (
                <StateBlueTextField
                  {...params}
                  variant="outlined"
                  placeholder="Add a new technology..."
                  size="small"
                  error={errors.hasOwnProperty("techStack")}
                  helperText={errors["techStack"]}
                />
              )}
            />
            </Grid>
        </Grid>
    </Grid>
      );
};

      export default TechStack;
