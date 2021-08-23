import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FloatCard from '../../components/FloatCard';
import Lottie from "react-lottie";
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
import BillingImage from "../lotties/billingImage";
import { Link } from "react-router-dom";

import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    border: `1px solid #5E60CE`,
    borderRadius: 10,
    margin: "30px 10px 30px 10px",
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
    float: "left",
    marginLeft: "15%",
  },
  icon: {
    color: theme.palette.darkGreen,
  },
  featuresContainer: {
    marginBottom: "70%",
  },
  annual: {
    color: theme.palette.stateBlue,
    marginTop: -15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
    },
    float: "center",
  },
  firstDivider: {
    marginTop: "12%",
  },
  topCard: {
    minWidth: "100%",
    borderRadius: 12,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
    overflow: "unset",
    margin: "0px 10px 20px 5px",
  },
  topCardContent: {
    padding: 10,
    justifyContent: "center",
    display: "grid",
    justifyItems: "center",
  },
  topCardText: {
    alignSelf: "center",
    padding: "20px !important",
  },
  topCardTitle: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    marginBottom: 20,
  },
  topCardTextBody: {
    color: theme.palette.black,
    marginBottom: 20,
  },
  lottie: {
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
}));

export default function BillingPackageCard() {
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: BillingImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Card className={classes.topCard}>
        <CardContent className={classes.topCardContent}>
          <Grid
            container
            direction="row"
            spacing={3}
            justify="space-between"
            alignItems="center"
            style={{ maxWidth: "100%" }}
          >
            <Grid item xs={11} md={9} className={classes.topCardText}>
              <Typography variant="h4" className={classes.topCardTitle}>
                With Flamingo, you can advance your recruitment process like
                never before!
              </Typography>

              <Typography variant="body1" className={classes.topCardTextBody}>
                <Box fontWeight={500} fontSize={20} m={1}>
                  Flamingo goes few steps further from a typical job portal and
                  brings a novel recruitment experience for the Sri Lankan IT
                  industry by making use of cutting edge technology. Upgrade
                  your account today to experience advanced features!
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={11} md={3}>
              <Lottie
                className={classes.lottie}
                options={defaultOptions}
                height={"inherit"}
                width={"inherit"}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container xs={12} spacing={3} direction="row">
        {/* Basic Package  */}
        <Grid item container xs={4}>
          <FloatCard className={classes.root}>
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
              <Divider variant="middle" className={classes.firstDivider} />
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
              <Typography variant="contained" className={classes.Tytpography}>
                You are currently on this plan
              </Typography>
            </div>
            <br />
          </FloatCard>
        </Grid>

        {/* Standard Package */}
        <Grid item container xs={4}>
          <FloatCard className={classes.root}>
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
                label="Post upto 25 jobs"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Receive upto 100 resumes"
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
              <Link to="/employer/payment/standard">
                <Button variant="contained" className={classes.button}>
                  Get Started
                </Button>
              </Link>
            </div>
            <br />
          </FloatCard>
        </Grid>

        {/* Premium Package */}
        <Grid item container xs={4}>
          <FloatCard className={classes.root}>
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
                label="Post any number of jobs"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Receive any number of resumes"
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
            <Link to="/employer/payment/premium">
              <Button variant="contained" className={classes.button}>
                Get Started
              </Button></Link>
            </div>
            <br />
          </FloatCard>
        </Grid>
      </Grid>
    </div>
  );
}
