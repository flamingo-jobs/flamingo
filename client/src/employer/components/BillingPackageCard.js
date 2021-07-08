import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FloatCard from "./FloatCard";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    border: `1px solid #5E60CE`,
    borderRadius: 10,
    // background: "linear-gradient(45deg, #64DFDF 30%, #FFFFFF 90%)",
  },
  title: {
    color: theme.palette.grey,
    marginBottom: 10,
  },
  price: {
    color: theme.palette.stateBlue,
    marginBottom: 20,
  },
  features: {
    backgroundColor: theme.palette.white,
  },
  icon: {
    color: theme.palette.darkGreen,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  annual:{
    color: theme.palette.stateBlue,
    marginTop:-15,
    marginBottom: 20,
  },
  button:{
    backgroundColor: theme.palette.stateBlue,
    color:theme.palette.white,
  },
}));

export default function BillingPackageCard() {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        xs={12}
        spacing={3}
        direction="row"
        // justify="space-between"
        // alignItems="flex-start"
      >
        {/* Basic Package  */}
        <Grid item container xs={4}>
          <Card className={classes.root}>
            <Typography variant="h4" gutterBottom>
              <Box
                fontWeight={400}
                fontSize={20}
                m={1}
                className={classes.title}
              >
                Basic
              </Box>

              <Box
                fontWeight={800}
                fontSize={30}
                m={1}
                className={classes.price}
              >
                FREE
              </Box>
              <Divider variant="middle" />
            </Typography>

            <div className={classes.featuresContainer}>
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Post upto 5 jobs"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Receive upto 25 resumes"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Applicant Tracking"
                className={classes.features}
              />
            </div>
            <div>
                <Button variant="contained" className={classes.button}>
                    Get Started
                </Button>
            </div>
            <br />
          </Card>
        </Grid>

        {/* Standard Package */}
        <Grid item container xs={4}>
          <Card className={classes.root}>
            <Typography variant="h4" gutterBottom>
              <Box
                fontWeight={400}
                fontSize={20}
                m={1}
                className={classes.title}
              >
                Standard
              </Box>

              <Box
                fontWeight={800}
                fontSize={30}
                m={1}
                className={classes.price}
              >
                LKR 1990/mo
              </Box>
              <Box
                fontWeight={400}
                fontSize={12}
                m={1}
                className={classes.annual}
              >
                LKR 1750/mo when billed annually
              </Box>
              <Divider variant="middle" />
            </Typography>

            <div className={classes.featuresContainer}>
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Post upto 5 jobs"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Receive upto 25 resumes"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Applicant Tracking"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Resume Shortlisting"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Personalized Recommendations"
                className={classes.features}
              />
            </div>
            <div>
                <Button variant="contained" className={classes.button}>
                    Get Started
                </Button>
            </div>
            <br />
          </Card>
        </Grid>

        {/* Premium Package */}
        <Grid item container xs={4}>
          <Card className={classes.root}>
            <Typography variant="h4" gutterBottom>
              <Box
                fontWeight={400}
                fontSize={20}
                m={1}
                className={classes.title}
              >
                Premium
              </Box>

              <Box
                fontWeight={800}
                fontSize={30}
                m={1}
                className={classes.price}
              >
                LKR 4990/mo
              </Box>
              <Box
                fontWeight={400}
                fontSize={12}
                m={1}
                className={classes.annual}
              >
                LKR 4500/mo when billed annually
              </Box>
              <Divider variant="middle" />
            </Typography>

            <div className={classes.featuresContainer}>
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Post upto 5 jobs"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Receive upto 25 resumes"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Applicant Tracking"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Resume Shortlisting"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Personalized Recommendations"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Advanced Analytics"
                className={classes.features}
              />
            </div>
            <div>
                <Button variant="contained" className={classes.button}>
                    Get Started
                </Button>
            </div>
            <br />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
