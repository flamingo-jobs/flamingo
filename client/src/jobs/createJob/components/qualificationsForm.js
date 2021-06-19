import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import {
  Grid,
  Container,
  Typography,
  IconButton,
  TextField,
} from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import { StateBlueTextField } from "../styles/customTextField";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  qualificationsContainer: {
    padding: theme.spacing(3),
  },
  qualificationsTitle: {
    fontSize: "15px",
    textAlign: "left",
    marginBottom: theme.spacing(2),
  },
  removeIcon: {
    color: theme.palette.stateBlue,
  },
  addIcon: {
    color: theme.palette.stateBlue,
  },
}));

const QualificationForm = ({
  qualificationsFields,
  handleQualificationChange,
  handleQualificationRemove,
  handleQualificationAdd,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.card}>
      <FloatCard>
        <Container className={classes.qualificationsContainer}>
          <Typography className={classes.qualificationsTitle}>
            Qualifications and Requirements
          </Typography>
          <Grid container spacing={2}>
            {qualificationsFields.map((field, index) => (
              <Grid item container key={index}>
                <Grid item xs={10}>
                  <StateBlueTextField
                    name="qualification"
                    label="Qualification"
                    variant="outlined"
                    value={field.qualification}
                    fullWidth
                    multiline
                    onChange={(event) =>
                      handleQualificationChange(event, index)
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    disabled={qualificationsFields.length === 1}
                    onClick={() => handleQualificationRemove(index)}
                  >
                    <RemoveIcon className={classes.removeIcon} />
                  </IconButton>
                  <IconButton onClick={handleQualificationAdd}>
                    <AddIcon className={classes.addIcon}/>
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FloatCard>
    </Grid>
  );
};

export default QualificationForm;
