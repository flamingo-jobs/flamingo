import React from "react";
import {
  makeStyles,
} from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";

// Custom components
import FloatCard from "../../../components/FloatCard";
import { StateBlueTextField } from "../styles/customTextField";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    // border: "1px solid red",
  },
  techStackTitle: {
    fontSize: "15px",
    textAlign: "left",
    marginBottom: theme.spacing(2),
    color: theme.palette.stateBlue,
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

const TechStack = ({ techStack, handleTechStack }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.card}>
      <FloatCard>
        <Container className={classes.techStackContainer}>
          <Typography className={classes.techStackTitle}>
            Technology Stack
          </Typography>

          <Autocomplete
            multiple
            id="techStack"
            options={techStack.map((item) => item.name)}
            defaultValue={undefined}
            freeSolo
            onChange={(event, values) => handleTechStack(values)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  className={classes.chip}
                />
              ))
            }
            renderInput={(params) => (
              <StateBlueTextField
                {...params}
                variant="outlined"
                placeholder="Add a new technology..."
              />
            )}
          />
        </Container>
      </FloatCard>
    </Grid>
  );
};

export default TechStack;
