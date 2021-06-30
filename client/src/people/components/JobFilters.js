import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FloatCard from '../../components/FloatCard'
import theme from '../../Theme'
import CategoryList from './CategoryList'
import OrganizationList from './OrganizationList'
import TitileList from './TitleList'
import TypeList from './TypeList'

const useStyles = makeStyles(() => ({

}))

function JobFilters(props) {

    const classes = useStyles();


    const [type, setType] = useState(0);
    // const [title, setTitle] = useState(0);
    const [category, setCategory] = useState(0);
    const [organization, setOrganization] = useState(0);

    useEffect(() => {
        combineFilters();
    }, [type, category, organization]);

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

    const combineFilters = () => {
        let filterObjects = {};

        if (type != 0) {
            filterObjects = { ...filterObjects, type };
        }

        // if (title != 0) {
        //     filterObjects = { ...filterObjects, title };
        // }

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
            <div className={classes.types}>
                <TypeList onChange={updateType} />
            </div>
            <div className={classes.categories}>
                <CategoryList onChange={updateCategory} />
            </div>
            {/* <div className={classes.titles}>
                <TitileList onChange={updateTitle} />
            </div> */}
            <div className={classes.organizations}>
                <OrganizationList onChange={updateOrganization} />
            </div>

        </FloatCard>
    )
}

export default JobFilters
