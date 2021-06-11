import { makeStyles } from '@material-ui/core'
import React from 'react'
import FloatCard from '../../components/FloatCard'
import theme from '../../Theme'
import CategoryList from './CategoryList'
import OrganizationList from './OrganizationList'
import TitileList from './TitleList'
import TypeList from './TypeList'

const useStyles = makeStyles(() => ({

}))

function JobFilters() {

    const classes = useStyles();

    return (
        <FloatCard >
            <div className={classes.types}>
                <TypeList />
            </div>
            <div className={classes.categories}>
                <CategoryList />
            </div>
            <div className={classes.titles}>
                <TitileList />
            </div>
            <div className={classes.organizations}>
                <OrganizationList />
            </div>
            
        </FloatCard>
    )
}

export default JobFilters
