import { makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FloatCard from '../../components/FloatCard'
import theme from '../../Theme'
import CategoryList from './CategoryList'
import OrganizationList from './OrganizationList'
import TitileList from './TitleList'
import TypeList from './TypeList'
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import TechnologyList from '../../people/components/TechnologyList'

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
    }
}))

function JobFilters(props) {

    const classes = useStyles();


    const [type, setType] = useState(0);
    // const [title, setTitle] = useState(0);
    const [category, setCategory] = useState(0);
    const [organization, setOrganization] = useState(0);
    const [technologyStack, setTechnologyStack] = useState(0);

    useEffect(() => {
        combineFilters();
    }, [type, category, organization, technologyStack]);

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

        if (type != 0) {
            filterObjects = { ...filterObjects, type };
        }

        if (technologyStack != 0) {
            filterObjects = { ...filterObjects, $and : technologyStack };
        }

        if (category != 0) {
            filterObjects = { ...filterObjects, category };
        }

        if (organization != 0) {
            filterObjects = { ...filterObjects, "organization.name": organization };
        }
        props.onChange(filterObjects);
    }


    return (
        <FloatCard >
            <div className={classes.titleDiv} >
                <Typography className={classes.title}><FilterListRoundedIcon className={classes.icon}/> Filter by</Typography>
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
            <div className={classes.organizations}>
                <OrganizationList onChange={updateOrganization} />
            </div>

        </FloatCard>
    )
}

export default JobFilters
