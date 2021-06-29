import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Modal,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import LottieAnimation from "./lottieAnimation";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: "20px !important",
    },
    padding: "20px !important",
    margin: "0px",
  },
  text: {
    fontSize: "18px",
    color: theme.palette.black,
  },
  closeButton: {
    "&:hover": {
      backgroundColor: "#fff",
    },
    padding: "0px",
  },
  closeIcon: {
    color: "#888",
    "&:hover": {
      color: "#555",
    },
  },
  successMsgContainer: {
    marginBottom: "24px",
  },
}));

const FeedbackModal = ({ open, handleClose, animation, loop, msg }) => {
  const classes = useStyles();

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Grid container>
              <Grid
                item
                container
                xs={12}
                justify="flex-end"
                alignItems="center"
              >
                <IconButton
                  onClick={handleClose}
                  className={classes.closeButton}
                >
                  <CloseIcon className={classes.closeIcon} />
                </IconButton>
              </Grid>

              <Grid
                item
                container
                xs={12}
                alignItems="center"
                className={classes.successMsgContainer}
              >
                <Grid item xs={6}>
                  <LottieAnimation
                    lottie={animation}
                    width={200}
                    height={200}
                    loop={loop}
                  ></LottieAnimation>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.text}>{msg}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default FeedbackModal;
