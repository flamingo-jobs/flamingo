import { Button, Grid, makeStyles, Typography, fade } from '@material-ui/core'
import React from 'react'
import FloatCard from '../../components/FloatCard'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import theme from '../../Theme';
import ListDownPopup from './ListDownPopup';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    search: {
        display: 'flex',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: fade(theme.palette.white, 0.1),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.white
      },
      inputRoot: {
        color: theme.palette.white,
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
}))

function JobSearchBar() {

    const classes = useStyles();

    return (
        <FloatCard backColor={theme.palette.blueJeans}>
            <div className={classes.root}>

                <Grid container spacing={3} direction="row">
                    <Grid item sm={3}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />

                            </div>
                            <InputBase
                                placeholder="Keyword…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            
                        </div>
                    </Grid>
                    <Grid item sm={3}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <LocationOnRoundedIcon />

                            </div>
                            <InputBase
                                placeholder="Location…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </Grid>
                    <Grid item sm={3}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <WorkRoundedIcon />

                            </div>
                            <ListDownPopup />
                            
                        </div>
                    </Grid>
                    <Grid item sm={3}>
                        <Button variant="contained" color="default">
                          Find Job
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </FloatCard>
    )
}

export default JobSearchBar
