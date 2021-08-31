import { makeStyles, Typography } from '@material-ui/core'
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded'
import React, { useEffect, useState } from 'react'
import FloatCard from '../../components/FloatCard'
import CertificationList from './CertificationList'
import EducationList from './EducationList'
import ExperienceList from './ExperienceList'
import InterestList from './InterestList'
import OrganizationList from './OrganizationList'
import TechnologyList from './TechnologyList'

const useStyles = makeStyles((theme) => ({
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
    const [interests, setCategory] = useState(0);
    const [education, setEducation] = useState(0);
    const [experience, setExperience] = useState(0);
    const [organization, setOrganization] = useState(0);
    const [technologyStack, setTechnologyStack] = useState(0);
    const [certifications, setCertifications] = useState(0);

    useEffect(() => {
        combineFilters();

    }, [type, interests, organization, technologyStack, education, certifications, experience]);

    const updateType = (filterData) => {
        setType(filterData);
    }

    // const updateTitle = (filterData) => {
    //     setTitle(filterData);
    // }

    const updateCategory = (filterData) => {
        setCategory(filterData);
    }

    const updateEducation = (filterData) => {
        setEducation(filterData);
    }

    const updateExperience = (filterData) => {
        setExperience(filterData);
    }

    const updateOrganization = (filterData) => {
        setOrganization(filterData);
    }

    const updateTechnologyData = (filterData) => {
        setTechnologyStack(filterData);
    }

    const updateCertificationData = (filterData) => {
        console.log(filterData)
        setCertifications(filterData);
    }


    const combineFilters = () => {
        let filterObjects = {};
        if (education !== 0) {
            filterObjects = { ...filterObjects, "education.type": education };
        }

        if (experience !== 0) {
            filterObjects = { ...filterObjects, "noYearsOfExp": experience };
        }

        if (certifications !== 0) {
            filterObjects = { ...filterObjects, "certificate.title": certifications };
        }

        if (technologyStack !== 0) {
            filterObjects = { ...filterObjects, $or: technologyStack };
        }

        if (interests !== 0) {
            filterObjects = { ...filterObjects, interests };
        }

        if (organization !== 0) {
            filterObjects = { ...filterObjects, "work.place": organization };
        }

        
        props.onChange(filterObjects);
    }


    return (
        <FloatCard >
            <div className={classes.titleDiv} >
                <Typography className={classes.title}><FilterListRoundedIcon className={classes.icon} /> Filter by</Typography>
            </div>
            <div className={classes.categories}>
                <EducationList onChange={updateEducation} />
            </div>
            <div className={classes.categories}>
                <ExperienceList onChange={updateExperience} />
            </div>
            <div className={classes.categories}>
                <InterestList onChange={updateCategory} />
            </div>
            <div className={classes.categories}>
                <TechnologyList onChange={updateTechnologyData} />
            </div>

            <div className={classes.categories}>
                <CertificationList onChange={updateCertificationData} />
            </div>
            {/* <div className={classes.titles}>
                <TitileList onChange={updateTitle} />
            </div> */}
            {/* <div className={classes.organizations}>
                <OrganizationList onChange={updateOrganization} />
            </div> */}

        </FloatCard>
    )
}

export default JobFilters
