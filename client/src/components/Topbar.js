import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import "./styles/Custom.css";
import logo from "./images/logo.jpg";
import { Button, Avatar, Typography, ClickAwayListener } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavMenu from "./NavMenu";
import Backdrop from '@material-ui/core/Backdrop';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import NotificationsPopover from "./NotificationPopover";
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link, useHistory } from 'react-router-dom';
import BACKEND_URL, { FILE_URL } from "../Config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setFavoriteOrgCount, setNewNotifications, setProfilePicReload } from "../redux/actions";
import { setSavedJobCount, setApplicationCount } from "../redux/actions";
import Dialog from '@material-ui/core/Dialog';

const jwt = require("jsonwebtoken");
const token = sessionStorage.getItem("userToken");
const header = jwt.decode(token, { complete: true });

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 100,
    borderRadius: 12,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
  },
  content: {
    padding: 10,
    justifyContent: "center",
  },
  grow: {
    flexGrow: 1,
    background: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,

    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: fade(theme.palette.tuftsBlueHover, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.tuftsBlue,
  },
  searchButton: {
    color: theme.palette.tuftsBlue,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  inputRoot: {
    color: theme.palette.tuftsBlue,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    alignItems: 'center',
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  mobileSideMenuItems: {
    marginTop: 24,
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  logo: {
    height: 40,
    marginRight: 40,
  },
  signIn: {
    backgroundColor: theme.palette.white,
    color: theme.palette.tuftsBlue,
    marginLeft: 20,
    border: "2px solid" + theme.palette.tuftsBlue,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  signInMobile: {
    backgroundColor: theme.palette.white,
    color: theme.palette.tuftsBlue,
    marginLeft: 20,
    marginRight: 20,
    border: "2px solid" + theme.palette.tuftsBlue,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  getHired: {
    backgroundColor: theme.palette.pinkyRed,
    color: theme.palette.white,
    marginLeft: 20,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.mediumTurquoise,
      color: "white",
    },
  },
  startHiring: {
    height: 40,
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    marginLeft: 20,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  menu: { marginTop: 50 },
  mobileMenu: {
    marginTop: 60,

    '& .MuiMenu-paper': {
      minWidth: "70%",
      padding: 16,
      borderRadius: 12,
      boxShadow: 'rgba(83, 144, 217, 0.6) 0px 4px 12px',
      [theme.breakpoints.up("xs")]: {
        minWidth: "unset",
      }

    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  logoutIcon: {
    marginRight: 10
  },
  profilepic: {
    borderRadius: 12
  },
  profileMenu: {
    marginTop: 60,
    '& .MuiMenu-paper': {
      padding: 16,
      borderRadius: 12,
      boxShadow: 'rgba(83, 144, 217, 0.6) 0px 4px 12px',

    }
  },
  notificationMenu: {
    marginTop: 60,
    '& .MuiMenu-paper': {
      minWidth: 540,
      padding: 16,
      borderRadius: 12,
      boxShadow: 'rgba(83, 144, 217, 0.6) 0px 4px 12px',
      [theme.breakpoints.down("sm")]: {
        minWidth: 340,
      }
    },

  },
  logOut: {
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    height: 40,
    marginTop: 16,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  menuItem: {
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: theme.spacing(2),
    borderRadius: 12,
    "&:hover": {
      borderRadius: 12,
      backgroundColor: theme.palette.lightSkyBlueHover + '!important',
    },
  },
  menuIcon: {
    display: 'flex',
    color: theme.palette.stateBlue,
    marginRight: theme.spacing(2),
  },
  menuText: {
    color: theme.palette.black,
    fontWeight: 500
  },
  topBarIcon: {
    color: theme.palette.stateBlue,
    marginLeft: 8,
    marginRight: 8
  }
}));

export default function Topbar(props) {
  const classes = useStyles();
  const history = useHistory();

  // redux state
  const favoriteOrgCount = useSelector(state => state.favoriteOrgCounter);
  const savedJobCount = useSelector(state => state.savedJobCounter);
  const applicationCount = useSelector(state => state.applicationCounter);
  const newNotifications = useSelector(state => state.newNotifications);
  const profilePicReload = useSelector(state => state.profilePicReload);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);

  // const [favourites, setFavourites] = React.useState(null);
  // const [savedJobs, setSavedJobs] = React.useState(null);
  // const [appliedJobs, setAppliedJobs] = React.useState(null);
  const [notifications, setNotifications] = React.useState(null);

  const [searchString, setSearchString] = React.useState("");

  const [profilePic, setProfilePic] = React.useState(require(`./images/loadingImage.gif`).default);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);

  const loginId = sessionStorage.getItem("loginId");

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const loadBadgeData = () => {
    if (header?.payload.userRole === "jobseeker") {
      axios.get(`${BACKEND_URL}/jobseeker/${sessionStorage.getItem("loginId")}`).then(res => {
        if (res.data.success) {
          if (res.data.jobseeker.hasOwnProperty("notifications")) {
            dispatch(setNewNotifications(res.data.jobseeker.notifications.filter((item) => item.isUnRead === true).length));
          }
          if (res.data.jobseeker.hasOwnProperty("favoriteOrganizations")) {
            dispatch(setFavoriteOrgCount(res.data.jobseeker.favoriteOrganizations.length));
            // setFavourites(res.data.jobseeker.favoriteOrganizations.length);
          }
          if (res.data.jobseeker.hasOwnProperty("savedJobs")) {
            dispatch(setSavedJobCount(res.data.jobseeker.savedJobs.length));
            // setSavedJobs(res.data.jobseeker.savedJobs.length);
          }
          if (res.data.jobseeker.hasOwnProperty("applicationDetails")) {
            dispatch(setApplicationCount(res.data.jobseeker.applicationDetails.length));
            // setAppliedJobs(res.data.jobseeker.applicationDetails.length);
          }
        }
      });
    } else if (header?.payload.userRole === "employer") {
      axios.get(`${BACKEND_URL}/employers/${sessionStorage.getItem("loginId")}`).then(res => {
        if (res.data.success) {
          if (res.data.employer.hasOwnProperty("notifications")) {
            dispatch(setNewNotifications(res.data.employer.notifications.filter((item) => item.isUnRead === true).length));
          }
        }
      });
    }
  }

  useEffect(() => {
    loadBadgeData();

    if (token) { loadProfilePic(); }
  }, []);

  useEffect(() => {
    if (profilePicReload) {
      setProfilePic(require(`./images/loadingImage.gif`).default);
      loadProfilePic();
      dispatch(setProfilePicReload(false));
    }
  }, [profilePicReload])

  const loadProfilePic = async () => {
    let randomNo = Math.floor((Math.random() * 1000) + 111);
    try {
      if (header.payload.userRole === "employer") {
        await axios.get(`${FILE_URL}/employer-profile-pictures/${loginId}.png?dummy=${randomNo}`).then(res => {
          setProfilePic(`${FILE_URL}/employer-profile-pictures/${loginId}.png?dummy=${randomNo}`);
        }).catch(error => {
          setProfilePic(require(`../employer/images/default_company_logo.png`).default);
        })

      } else if (header.payload.userRole === "jobseeker") {

        await axios.get(`${FILE_URL}/jobseeker-profile-pictures/${loginId}.png?dummy=${randomNo}`).then(res => {
          setProfilePic(`${FILE_URL}/jobseeker-profile-pictures/${loginId}.png?dummy=${randomNo}`);
        }).catch(error => {
          setProfilePic(require(`../components/images/defaultProfilePic.jpg`).default);
        })

      } else if (header.payload.userRole === "admin") {
        setProfilePic(require(`../admin/images/profilepic.jpg`).default);
      }
    } catch (err) {
      setProfilePic(require(`../components/images/defaultProfilePic.jpg`).default);
    }
  }

  const profileLink = () => {

  }

  const notificationId = "primary-notification-menu";
  const renderNotification = (
    <Dialog onClose={handleNotificationClose} aria-labelledby="simple-dialog-title" open={Boolean(notificationAnchorEl)}>
      <Menu
        anchorEl={notificationAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={notificationId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isNotificationMenuOpen}
        onClose={handleNotificationClose}
        className={classes.notificationMenu}
      >
        <NotificationsPopover open={isNotificationMenuOpen} onClose={handleNotificationClose} count={newNotifications} loginId={loginId} userRole={token ? header.payload.userRole : null} />
      </Menu>

    </Dialog>

  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Dialog onClose={handleMenuClose} aria-labelledby="simple-dialog-title" open={Boolean(anchorEl)}>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        className={classes.profileMenu}

      >
        {token && header.payload.userRole == "jobseeker" ? <Link to={`/${header.payload.userRole}/profile`}>
          <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
            <div className={classes.menuIcon}>
              <PersonRoundedIcon />
            </div>
            <Typography className={classes.menuText} >Profile</Typography>
          </MenuItem>
        </Link> : null}

        {token && header.payload.userRole == "employer" ? <Link to={`/${header.payload.userRole}/company`}>
          <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
            <div className={classes.menuIcon}>
              <PersonRoundedIcon />
            </div>
            <Typography className={classes.menuText} >Profile</Typography>
          </MenuItem>
        </Link> : null}

        {token ?
          <Link to={`/${header.payload.userRole}/settings`}>
            <MenuItem className={classes.menuItem} onClick={() => { handleMenuClose(); history.push(`/${props.user}/settings`) }}>
              <div className={classes.menuIcon}>
                <SettingsRoundedIcon />
              </div>
              <Typography className={classes.menuText}>Settings</Typography>
            </MenuItem>
          </Link> : null}

        <Button
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            localStorage.setItem('logout', 'true');
            window.location = "/";
          }}
          className={classes.logOut}
        >
          <ExitToAppRoundedIcon className={classes.logoutIcon} />Log Out
        </Button>
      </Menu>
    </Dialog>
  );


  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Dialog onClose={handleMobileMenuClose} aria-labelledby="simple-dialog-title" open={Boolean(mobileMoreAnchorEl)}>

      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        className={classes.mobileMenu}
      >
        {!token && (
          <div>
            <Link to="/startHiring">
              <Button
                className={classes.startHiring}
              >
                Start Hiring
              </Button>
            </Link>
            <Link to="/signin">
              <Button
                className={classes.signInMobile}
              >
                Sign In
              </Button>
            </Link>
          </div>
        )}
        {token && (
          <div className={classes.sectionMobile}>
            {props.user === "jobseeker" &&
              <>
                <Link to="/jobseeker/savedJobs">
                  <IconButton aria-label="" className={classes.topBarIcon} onClick={handleMobileMenuClose}>
                    {/* <Badge badgeContent={savedJobCount} color="secondary"> */}
                    <BookmarksIcon />
                    {/* </Badge> */}
                  </IconButton>
                </Link>
                <Link to="/jobseeker/favoriteOrganizations">
                  <IconButton aria-label="" className={classes.topBarIcon} onClick={handleMobileMenuClose}>
                    {/* <Badge badgeContent={favoriteOrgCount} color="secondary"> */}
                    <FavoriteIcon />
                    {/* </Badge> */}
                  </IconButton>
                </Link>

                <Link to="/jobseeker/appliedJobs">
                  <IconButton aria-label="" className={classes.topBarIcon} onClick={handleMobileMenuClose}>
                    {/* <Badge badgeContent={applicationCount} color="secondary"> */}
                    <WorkRoundedIcon />
                    {/* </Badge> */}
                  </IconButton>
                </Link>
              </>
            }
            {props.user !== "admin" ?
              <IconButton aria-label="show 11 new notifications" className={classes.topBarIcon} onClick={handleNotificationOpen}>
                <Badge badgeContent={notifications} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> : null}
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >

              <Avatar className={classes.profilepic} src={profilePic} variant="square" />

            </IconButton>
          </div>
        )}
        <div className={classes.mobileSideMenuItems}>
          <NavMenu user={props.user} onClose={handleMobileMenuClose} />
        </div>
      </Menu>
    </Dialog>
  );
  const preventDefault = (event) => event.preventDefault();

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchString.trim().length !== 0) {
      // console.log("enter pressed", searchString);
      history.push({
        pathname: '/searchResults',
        searchString: searchString,
      });
    }
  }

  const displaySearchButton = () => {
    if (searchString.trim().length > 0) {
      return <Button className={classes.searchButton} onClick={handleSearchBtnClick}>Search</Button>
    }
  }

  const handleSearchBtnClick = () => {
    history.push({
      pathname: '/searchResults',
      searchString: searchString,
    });
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.grow}>
          <AppBar position="sticky">
            <Toolbar>
              <Link to="/" >
                <img src={logo} className={classes.logo} />
              </Link>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearchChange}
                  onKeyPress={(e) => handleSearchSubmit(e)}
                />
                {displaySearchButton()}
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                {token && (
                  <div>

                    {props.user === "jobseeker" &&
                      <>
                        <Link to="/jobseeker/savedJobs">
                          <IconButton aria-label="" className={classes.topBarIcon}>
                            {/* <Badge badgeContent={savedJobCount} color="secondary"> */}
                            <BookmarksIcon />
                            {/* </Badge> */}
                          </IconButton>
                        </Link>
                        <Link to="/jobseeker/favoriteOrganizations">
                          <IconButton aria-label="" className={classes.topBarIcon}>
                            {/* <Badge badgeContent={favoriteOrgCount} color="secondary"> */}
                            <FavoriteIcon />
                            {/* </Badge> */}
                          </IconButton>
                        </Link>

                        <Link to="/jobseeker/appliedJobs">
                          <IconButton aria-label="" className={classes.topBarIcon}>
                            {/* <Badge badgeContent={applicationCount} color="secondary"> */}
                            <WorkRoundedIcon />
                            {/* </Badge> */}
                          </IconButton>
                        </Link>
                      </>
                    }

                    {props.user !== "admin" ?
                      <IconButton
                        className={classes.topBarIcon}
                        onClick={handleNotificationOpen}
                      >
                        <Badge badgeContent={newNotifications !== "empty" ? newNotifications : null} color="secondary" >
                          <NotificationsIcon />
                        </Badge>
                      </IconButton> : null}
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="primary"
                    >
                      <Avatar className={classes.profilepic} src={profilePic} variant="square" />
                    </IconButton>

                  </div>
                )}
                {!token && (
                  <div>
                    <Link to="/startHiring">
                      <Button
                        className={classes.startHiring}
                      >
                        Start Hiring
                      </Button>
                    </Link>
                    <Link to="/signin">
                      <Button
                        className={classes.signIn}
                      >
                        Sign In
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MenuRoundedIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
          {renderNotification}
        </div>
      </CardContent>
    </Card>
  );
}
