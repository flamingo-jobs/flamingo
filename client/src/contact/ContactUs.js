import { Button, Grid, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core'
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hooks-helper';
import Lottie from 'react-lottie';
import FloatCard from '../components/FloatCard';
import BACKEND_URL from '../Config';
import ContactImage from './lotties/contact-us.json';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: "stretch"
        },
    },
    lottie: {
        height: 150,
        [theme.breakpoints.down("xs")]: {
            width: 300,
        },
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        padding: 20,
        display: "contents",
    },
    submit: {
        boxShadow: "none",
        color: theme.palette.white,
        backgroundColor: theme.palette.skyBlueCrayola,
        borderRadius: 25,
        "&:hover": {
            backgroundColor: theme.palette.skyBlueCrayolaHover,
            color: "white",
            boxShadow: "none",
        },
    },
    cancel: {
        boxShadow: "none",
        color: theme.palette.black,
        backgroundColor: theme.palette.white,
        borderRadius: 25,
        "&:hover": {
            backgroundColor: theme.palette.white,
            color: "black",
            boxShadow: "none",
        },
    },
    textField: {
        [theme.breakpoints.up("md")]: {
            width: "100%",
        },
        "& fieldset": {
            borderColor: theme.palette.tuftsBlue,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.pinkyRed + " !important",
        },
    },
    title: {
        marginTop: 10,
        fontWeight: 500,
        marginBottom: 5,
    },
    formGrid: {
        padding: 24
    },
    actions: {
        marginTop: 20
    }
}))

function ContactUs() {

    const classes = useStyles();

    const defaultData = {
        name: "",
        email: "",
        message: "",
    };

    const [formData, setForm] = useForm(defaultData);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: ContactImage,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        const newMessagerData = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
        };
        // axios.post(`${BACKEND_URL}/api/signup`, newUserData).then((res) => {
        //     if (res.data.success) {
        //         const userId = jwt.decode(res.data.token, { complete: true }).payload
        //             .userId;
        //         sendEmail(userId);
        //     } else {
        //         setAlertData({
        //             severity: "error",
        //             msg: "Failed to send message!",
        //         });
        //         handleAlert();
        //     }
        // });
    }

    return (
        <Grid item container xs={12} spacing={3} direction="row"
            justify="space-between"
            alignItems="flex-start" className={classes.mainGrid}>
            <Grid item xs={12} className={classes.searchGrid}>
                <FloatCard >
                    <Grid item container spacing={3} direction="row">
                        <Grid item xs={12} lg={6}>
                            <Lottie
                                className={classes.lottie}
                                options={defaultOptions}
                                height={"inherit"}
                                width={"inherit"}
                            />
                        </Grid>
                        <Grid item xs={12} lg={5} style={{ padding: 24 }}>
                            <Typography style={{ textAlign: 'left', marginTop: 24, marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
                                Contact Us
                            </Typography>
                            <form onSubmit={sendMessage}>
                                <Grid
                                    item
                                    container
                                    alignItems="center"
                                    spacing={3}
                                >
                                    <Grid item xs={12} align="left">
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            name="name"
                                            type="text"
                                            size="small"
                                            variant="outlined"
                                            value={formData.name}
                                            onChange={setForm}
                                            className={classes.textField}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} align="left">
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            size="small"
                                            variant="outlined"
                                            value={formData.email}
                                            onChange={setForm}
                                            className={classes.textField}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} align="left">
                                        <TextField
                                            label="Mobile"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={setForm}
                                            variant="outlined"
                                            className={classes.textField}
                                            size="small"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        +94
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} align="left">
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            name="message"
                                            type="text"
                                            size="small"
                                            variant="outlined"
                                            value={formData.message}
                                            onChange={setForm}
                                            className={classes.textField}
                                            required
                                            multiline
                                            rows={3}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    md={6}
                                    className={classes.actions}
                                    spacing={2}
                                >
                                    <Grid item>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            className={classes.submit}
                                        >
                                            Send
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>

                </FloatCard>
            </Grid>
        </Grid>
    )
}

export default ContactUs
