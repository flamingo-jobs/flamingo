import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FloatCard from '../../components/FloatCard'
import theme from '../../Theme'
import InterestList from './InterestList'
import OrganizationList from './OrganizationList'
import TechnologyList from './TechnologyList'
import TypeList from './TypeList'

const useStyles = makeStyles(() => ({

}))

function JobFilters(props) {

    const classes = useStyles();


    const [type, setType] = useState(0);
    // const [title, setTitle] = useState(0);
    const [interests, setCategory] = useState(0);
    const [organization, setOrganization] = useState(0);
    const [technologyStack, setTechnologyStack] = useState(0);


    useEffect(() => {
        combineFilters();

    }, [type, interests, organization, technologyStack]);

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

    const updateTechnologyData = (filterData) => {
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

        if (interests != 0) {
            filterObjects = { ...filterObjects, interests };
        }

        if (organization != 0) {
            filterObjects = { ...filterObjects, "organization.name": organization };
        }
        console.log("fuvk");
        props.onChange(filterObjects);
    }


    return (
        <FloatCard >
            <div className={classes.types}>
                <TypeList onChange={updateType} />
            </div>
            <div className={classes.categories}>
                <InterestList onChange={updateCategory} />
            </div>
            <div className={classes.categories}>
                <TechnologyList onChange={updateTechnologyData} />
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
