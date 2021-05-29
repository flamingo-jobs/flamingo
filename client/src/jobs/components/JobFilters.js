import { makeStyles } from '@material-ui/core'
import React from 'react'
import FloatCard from '../../components/FloatCard'
import theme from '../../Theme'
import CategoryList from './CategoryList'

const useStyles = makeStyles(() => ({

}))

function JobFilters() {

    const classes = useStyles();

    return (
        <FloatCard >
            <div className={classes.categories}>
<CategoryList />
            </div>
            <div className={classes.titles}>

            </div>
            <div className={classes.organizations}>
                
            </div>
        </FloatCard>
    )
}

export default JobFilters
