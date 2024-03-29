import { fade, Grid, makeStyles } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import FloatCard from '../../components/FloatCard';
import theme from '../../Theme';

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
        color: theme.palette.white
    },
    inputRoot: {
        color: theme.palette.white,
        backgroundColor: 'transparent',
        border: 'none',
        minWidth: 250,
        transition: 'background-color 200ms cubic-bezier(1, 1, 1, 0.1) 0ms',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&:hover:before': {
            border: 'none',
        },
        '&:before': {
            display: 'none'
        },
        '&:after': {
            border: 'none',
        },
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
        background: 'transparent'
    },
    keywordInput: {
        border: 'none',
        '&hover': {
            border: 'none'
        }
    },
    keywordChip: {
        backgroundColor: theme.palette.white,
        margin: 3,
        marginRight: 5
    },
    btn: {
        backgroundColor: theme.palette.white,
        color: theme.palette.vividSkyBlue,
        margin: 5,
        fontWeight: 800,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
            backgroundColor: theme.palette.vividSkyBlueHover,
            color: 'white',
        }
    },
}))

function JobSearchBar(props) {

    const classes = useStyles();

    const [commonKeywords, setCommonKeywords] = useState([]);

    // useEffect(() => {
    //     retrieveOrganizations();
    // }, [])

    const [keywords, setKeyword] = useState([]);
    const [locations, setLocations] = useState([]);

    const addKeywords = (keywords) => {
        setKeyword(keywords);
    }

    const addLocations = (locations) => {
        setLocations(locations);
    }

    useEffect(() => {
        passFilters();

    }, [keywords, locations]);

    const passFilters = () => {
        let filterObjects = {};
        if (keywords.length !== 0) {
            let regexExp = keywords.join('|');
            filterObjects = { ...filterObjects, $or: [
                { title: { $regex: regexExp, $options: "i" } },
                { description: { $regex: regexExp, $options: "i" } },
                { tasksAndResponsibilities: { $regex: regexExp, $options: "i" } },
                { qualifications: { $regex: regexExp, $options: "i" } },
                { keywords: { $regex: regexExp, $options: "i" } },
            ] };
        }

        if (locations.length !== 0) {
            let locationRegex = locations.join("|");
            filterObjects = { ...filterObjects, "location" : {$regex : locationRegex, $options : "i"}};
        }
        props.onChange(filterObjects);
    }

    // const retrieveOrganizations = () => {
    //     axios.get(`${BACKEND_URL}/employers`).then(res => {
    //         if (res.data.success) {
    //             setCommonKeywords(res.data.existingData)
    //         } else {
    //             setCommonKeywords([])
    //         }
    //     })
    // }

    return (
        <FloatCard backColor={theme.palette.blueJeans}>
            <div className={classes.root}>

                <Grid container spacing={3} direction="row">
                    <Grid item container xs={12} md={6} lg={6} spacing={1} direction="row" alignItems="center">
                        <Grid item sm={1}>
                            <div className={classes.searchIcon}>
                                <SearchIcon /></div>
                        </Grid>
                        <Grid item sm={11}>
                            <Autocomplete
                                multiple
                                limitTags={2}
                                id="tags-filled"
                                options={commonKeywords.map((option) => option.name)}
                                defaultValue={undefined}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} id="outlined-basic" variant="standard" placeholder="Keywords" classes={{ root: classes.keywordInput }} />
                                )}
                                onChange={(event, value) => addKeywords(value)}
                                classes={{
                                    inputRoot: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={6} lg={6} spacing={1} direction="row" alignItems="center">
                        <Grid item sm={1}>
                            <div className={classes.searchIcon}>
                                <LocationOnRoundedIcon /></div>
                        </Grid>
                        <Grid item sm={11}>
                            <Autocomplete
                                multiple
                                limitTags={1}
                                id="locationFilter"
                                options={commonKeywords.map((option) => option.locations).flat(1).filter((value, index, self) => { return self.indexOf(value) === index})}
                                defaultValue={undefined}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} id="outlined-basic" variant="standard" placeholder="Location" classes={{ root: classes.keywordInput }} />
                                )}
                                onChange={(event, value) => addLocations(value)}
                                classes={{
                                    inputRoot: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12} lg={2}>
                        <Button className={classes.btn}>
                            Search
                        </Button>
                    </Grid> */}
                </Grid>
            </div>
        </FloatCard>
    )
}

export default JobSearchBar
