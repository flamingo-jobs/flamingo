import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Typography,
  Button,
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
  keywordsTitle: {
    fontSize: "15px",
    textAlign: "left",
    marginBottom: theme.spacing(2),
    color: theme.palette.stateBlue,
  },
  keywordsContainer: {
    padding: theme.spacing(3),
  },
  buttonContainer: {
    paddingTop: theme.spacing(3),
  },
  chip: {
    color: theme.palette.white,
    background: theme.palette.stateBlue,
    marginLeft: "2px",
    marginRight: "2px",
  },
  submitButton: {
    background: theme.palette.stateBlue,
    "&:hover": {
      background: theme.palette.stateBlueHover,
    },
  },
}));

const Keywords = ({ keywords, handleKeywordsChange }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.card}>
      <FloatCard>
        <Container className={classes.keywordsContainer}>
          <Typography className={classes.keywordsTitle}>Keywords</Typography>

          <Autocomplete
            multiple
            id="keywords"
            options={keywords.map((keyword) => keyword.name)}
            defaultValue={undefined}
            freeSolo
            onChange={(event, values) => handleKeywordsChange(values)}
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
                placeholder="Add Keyword..."
              />
            )}
          />
          <Grid container className={classes.buttonContainer}>
            <Grid item container xs={12} justify="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Container>
      </FloatCard>
    </Grid>
  );
};

export default Keywords;
