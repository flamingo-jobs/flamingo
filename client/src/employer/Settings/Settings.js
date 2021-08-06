import React, { useState } from "react";
import { useForm } from "react-hooks-helper";
import PropTypes from "prop-types";
import {
  makeStyles,
  Card,
  Grid,
  Typography,
  CardContent,
  Box,
  Tab,
  Tabs,
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Container,
  Checkbox,
} from "@material-ui/core";
import SnackBarAlert from "../../components/SnackBarAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    margin: "30px 10px 30px 10px",
    flexGrow: 1,
  },
  button: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
    },
    float: "center",
  },
  topCard: {
    minWidth: "100%",
    borderRadius: 12,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
    overflow: "unset",
    margin: "0px 10px 20px 5px",
    flexGrow: 1,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const Settings = () => {
  const classes = useStyles();

  const accessTokens = [
    {
      value: "jobs",
      description: "Handle Jobs",
    },
    {
      value: "resume",
      description: "Handle Resumes",
    },
    {
      value: "billing",
      description: "Billing",
    },
    {
      value: "company",
      description: "Edit Company Details",
    },
  ];
  const defaultData = { email: "", password: "", confirmPassword: "" };
  const [formData, setForm] = useForm(defaultData);
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState([]);

  const handleChecked = (value, itemId) => () => {
    const newChecked = [...checked];
    const itemObj = { index: itemId, name: value };
    const currentIndex = checked.findIndex((x) => x.index === itemId);

    if (currentIndex === -1) {
      newChecked.push(itemObj);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Alert stuff
  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });
  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };
  const handleAlert = () => {
    setAlertShow(true);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  const addNewUser = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const newUserData = {
        email: formData.email,
        password: formData.password,
        accessTokens: checked.map(x => x.name),
      };
      //goto next step
    } else {
      setAlertData({
        severity: "error",
        msg: `Please make sure passwords are matching`,
      });
      handleAlert();
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <Card className={classes.topCard}>
          <CardContent>
            {displayAlert()}
            <Grid container direction="row" style={{ maxWidth: "100%" }}>
              <Grid item xs={12}>
                <div className={classes.tabRoot}>
                  <Tabs
                    orientation="horizontal"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                  >
                    <Tab label="Add User" {...a11yProps(0)} />
                    <Tab label="Users" {...a11yProps(1)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <Grid
                      container
                      spacing={3}
                      justify="center"
                      alignItems="center"
                      className={classes.mainGrid}
                    >
                      <Grid item xs={12} align="center">
                        <Container>
                          <form className={classes.form} onSubmit={addNewUser}>
                            <Grid
                              container
                              spacing={2}
                              justify="space-between"
                              direction="row"
                              className={classes.gridCont}
                            >
                              <Grid item xs={12} md={6} lg={6}>
                                <Grid container alignItems="center" spacing={3}>
                                  <Grid item xs={11} align="left">
                                    <Grid item xs={11} align="left">
                                      <Typography className={classes.title}>
                                        Create temporary passwords for new
                                        users. They will be able to change their
                                        passwords after they login to the
                                        system.
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Grid
                                    item
                                    container
                                    alignItems="center"
                                    spacing={3}
                                  >
                                    <Grid item xs={12} md={11} align="left">
                                      <TextField
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        size="small"
                                        variant="outlined"
                                        value={formData.email}
                                        onChange={setForm}
                                        className={classes.shortTextField}
                                        required
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={11} align="left">
                                      <TextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        variant="outlined"
                                        value={formData.password}
                                        onChange={setForm}
                                        className={classes.shortTextField}
                                        required
                                        size="small"
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={11} align="left">
                                      <TextField
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        variant="outlined"
                                        value={formData.confirmPassword}
                                        onChange={setForm}
                                        className={classes.shortTextField}
                                        required
                                        size="small"
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={12} md={6} lg={5}>
                                <Grid container alignItems="center" spacing={3}>
                                  <Grid item xs={12} align="left">
                                    <Grid item xs={12} align="left">
                                      <Typography className={classes.title}>
                                        Set access restrictions
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12} align="left">
                                    <Grid item xs={12} align="left">
                                      <List component="nav">
                                        {accessTokens.map((x, i) => {
                                          return (
                                            <ListItem
                                              className={classes.listItem}
                                              key={i}
                                              role={undefined}
                                              dense
                                              button
                                              onClick={handleChecked(
                                                x.value,
                                                i
                                              )}
                                            >
                                              <ListItemIcon
                                                className={classes.itemCheckBox}
                                              >
                                                <Checkbox
                                                  edge="start"
                                                  checked={
                                                    checked.findIndex(
                                                      (x) => x.index === i
                                                    ) !== -1
                                                  }
                                                  tabIndex={-1}
                                                  disableRipple
                                                  className={classes.checkBox}
                                                  inputProps={{
                                                    "aria-labelledby": i,
                                                  }}
                                                />
                                              </ListItemIcon>
                                              <ListItemText
                                                id="i"
                                                primary={x.description}
                                              />
                                            </ListItem>
                                          );
                                        })}
                                      </List>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>

                              {/* Submit Buttons */}
                              <Grid item xs={12}>
                                <Grid
                                  item
                                  container
                                  xs={12}
                                  className={classes.footer}
                                  alignItems="left"
                                  justify="left"
                                  spacing={3}
                                >
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
                                        className={classes.button}
                                      >
                                        Add User
                                      </Button>
                                    </Grid>
                                    <Grid item>
                                      <Link to="/">
                                        <Button
                                          fullWidth
                                          variant="contained"
                                          className={classes.cancel}
                                        >
                                          Cancel
                                        </Button>
                                      </Link>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </form>
                        </Container>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Item Two
                  </TabPanel>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
