import { makeStyles, Switch, Typography } from '@material-ui/core'
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded'
import React, { useEffect, useState } from 'react'
import FloatCard from '../../components/FloatCard'
import TechnologyList from '../../people/components/TechnologyList'
import theme from '../../Theme'
import CategoryList from './CategoryList'
import TypeList from './TypeList'

const useStyles = makeStyles(() => ({
    titleDiv: {
        textAlign: "left",
        backgroundColor: theme.palette.lightSkyBlue,
        padding: 8,
        paddingLeft: 16,
        borderRadius: 8,

    },
    title: {
        alignItems: "center",
        display: "flex",
        color: theme.palette.stateBlue,
        fontWeight: 700
    },
    icon: {
        marginRight: 8
    },
    featuredCheck: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8
    },
    featuredJobs: {
        color: theme.palette.stateBlue,
        fontWeight: 600
    }
}))

function JobFiltersForEmployer(props) {

    const queryParams = new URLSearchParams(window.location.search);
    const featured = queryParams.get('featured');
    const org = queryParams.get('org');


    const classes = useStyles();


    const [type, setType] = useState(0);
    // const [title, setTitle] = useState(0);
    const [category, setCategory] = useState(0);
    const [organization, setOrganization] = useState(org ? { $in: [org] } : 0);
    const [technologyStack, setTechnologyStack] = useState(0);

    const [isFeatured, setIsFeatured] = React.useState(featured ? true : false);

    const handleFeaturedChange = (event) => {
        if (featured && !event.target.checked) {
            let stateObj = { id: "100" };
            window.history.replaceState(stateObj,
                "Page 3", "/jobs");
        }
        setIsFeatured(event.target.checked);
    };

    useEffect(() => {
        combineFilters();
    }, [type, category, organization, technologyStack, isFeatured]);

    const updateType = (filterData) => {
        setType(filterData);
    }

    // const updateTitle = (filterData) => {
    //     setTitle(filterData);
    // }

    const updateCategory = (filterData) => {
        setCategory(filterData);
    }

    const updateOrganization = (filterData) => {
        setOrganization(filterData);
    }

    const updateTechnologyStack = (filterData) => {
        setTechnologyStack(filterData);
    }

    const combineFilters = () => {
        let filterObjects = {};

        if (type !== 0) {
            filterObjects = { ...filterObjects, type };
        }

        if (technologyStack !== 0) {
            filterObjects = { ...filterObjects, $and: technologyStack };
        }

        if (category !== 0) {
            filterObjects = { ...filterObjects, category };
        }

        if (organization !== 0) {
            filterObjects = { ...filterObjects, "organization.name": organization };
        }

        if (isFeatured === true) {
            filterObjects = { ...filterObjects, isFeatured };
        }
        props.onChange(filterObjects);
    }


    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <FloatCard >
                    <div className={classes.featuredCheck}>
                        <Typography className={classes.featuredJobs}>Featured Jobs</Typography>
                        <Switch
                            checked={isFeatured}
                            onChange={handleFeaturedChange}
                            name="featuredCheck"
                            color="primary"
                        />
                    </div>
                </FloatCard>
            </div>
            <FloatCard >
                <div className={classes.titleDiv} >
                    <Typography className={classes.title}><FilterListRoundedIcon className={classes.icon} /> Filter by</Typography>
                </div>
                <div className={classes.types}>
                    <TypeList onChange={updateType} />
                </div>
                <div className={classes.categories}>
                    <CategoryList onChange={updateCategory} />
                </div>
                <div className={classes.titles}>
                    <TechnologyList onChange={updateTechnologyStack} />
                </div>

            </FloatCard>
        </>
    )
}

export default JobFiltersForEmployer
