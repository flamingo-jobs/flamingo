import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  makeStyles,
  useTheme,
  Avatar,
  Typography,
  Chip,
} from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../../../components/FloatCard";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import BACKEND_URL from "../../../../Config";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "block",
    alignItems: "center",
    margin: 10,
    marginTop: 16,
  },
  headerLogo: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    marginBottom: 15,
  },
  label: {
    alignSelf: "left",
    marginRight: 15,
    backgroundColor: theme.palette.tagYellow,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  tagIcon: {
    color: theme.palette.tagIcon,
  },
  favorite: {
    display: "block",
    color: theme.palette.pinkyRed,
    minWidth: 36,
  },
  body: {
    margin: 10,
  },
  title: {
    fontWeight: 500,
  },
  logoItem: {
    marginLeft: 30,
    marginTop: 10,
    float: "center",
    marginBottom: 10,
  },
  logo: {
    marginTop: 10,

    borderRadius: 12,
    width: 125,
    height: 125,
  },
  companyName: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    marginBottom: 20,
    float: "center",
  },
  ratingContainer: {
    marginTop: -30,
  },
  rating: {
    marginLeft: -10,
    marginTop: 5,
  },
  noRating: {
    marginTop: -20,
  },
  reviews: {
    alignItems: "center",
    textAlign: "-webkit-center",
  },
  verifiedBadge: {
    width: "20px",
    height: "20px",
  },
}));

const CompanySummaryCard = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    logo: " ",
    reviews: [],
  });
  const [verified, setVerified] = useState(false);

  const name = state.name;
  const logo = state.logo;
  const reviews = state.reviews;

  useEffect(() => {
    getVerificationStatus();
    axios.get(`${BACKEND_URL}/employers/${props.employerId}`).then((res) => {
      console.log(res.data.employer);
      if (res.data.success) {
        setState({
          name: res.data.employer.name,
          logo: res.data.employer.logo,
          reviews: res.data.employer.reviews,
        });
      }
    });
  }, []);

  const getAverageRating = () => {
    var totalRating = 0;

    reviews.forEach((review) => {
      totalRating += review.rating;
    });

    var averageRating = totalRating / reviews.length;

    return [averageRating, reviews.length];
  };

  const loadLogo = () => {
    try {
      return `${BACKEND_URL}/companyImage/${logo}`;
    } catch (err) {
      return `${BACKEND_URL}/companyImage/default_company_logo.png`;
    }
  };

  const getVerificationStatus = () => {
    const loginId = sessionStorage.getItem("loginId");
    axios
      .get(`${BACKEND_URL}/employer/verificationStatus/${loginId}`)
      .then((res) => {
        if (res.data.success) {
          if (res.data.verificationStatus === "verified") setVerified(true);
        }
      })
      .catch((err) => {
        if (err) {
          setVerified(false);
        }
      });
  };

  return (
    <FloatCard>
      <div className={classes.header}>
        <div className={classes.headerLogo}>
          <Avatar className={classes.logo} src={loadLogo()} variant="square" />
        </div>
        <div className={classes.headerInfo}>
          <Typography variant="h5" className={classes.title}>
            {name}{" "}
            {verified ? (
              <VerifiedUserIcon
                color="primary"
                className={classes.verifiedBadge}
              />
            ) : (
              ""
            )}
          </Typography>
        </div>
        <div className={classes.reviews}>
          <Typography style={{ marginTop: 8 }}>
            {getAverageRating()[0]}/5 ratings
          </Typography>
          <Rating
            name="read-only"
            style={{ marginTop: 8 }}
            value={getAverageRating()[0]}
            readOnly
          />
        </div>
      </div>
    </FloatCard>
  );
};

export default CompanySummaryCard;
