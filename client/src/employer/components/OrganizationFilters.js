import { makeStyles , Typography} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FloatCard from '../../components/FloatCard'
import theme from '../../Theme'
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';

import CategoryList from '../../jobs/components/CategoryList'
import TechnologyList from '../../people/components/TechnologyList';

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

function OrganizationFilters(props) {

    const classes = useStyles();

    const [categories, setCategories] = useState(0);
    const [technologyStack, setTechnologyStack] = useState(0);

    useEffect(() => {
        combineFilters();
    }, [categories, technologyStack]);

    const updateCategories = (filterData) => {
        setCategories(filterData);
    }

    const updateTechnologyStack = (filterData) => {
        setTechnologyStack(filterData);
    }

    const combineFilters = () => {
        let filterObjects = {};

        if (categories != 0) {
            filterObjects = { ...filterObjects, categories };
        }

        if (technologyStack != 0) {
            filterObjects = { ...filterObjects, $and : technologyStack };
        }

        props.onChange(filterObjects);
    }


    return (
        <FloatCard >
            <div className={classes.titleDiv} >
                <Typography className={classes.title}><FilterListRoundedIcon className={classes.icon}/> Filter by</Typography>
            </div>
            <div className={classes.categories}>
                <CategoryList onChange={updateCategories} />
            </div>
            <div className={classes.organizations}>
                <TechnologyList onChange={updateTechnologyStack} />
            </div>

        </FloatCard>
    )
}

export default OrganizationFilters
