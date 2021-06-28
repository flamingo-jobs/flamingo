import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import FloatCard from '../components/FloatCard'
import DetailedAccordion from './components/DetailedAccordion'
import { Typography } from '@material-ui/core'
import BACKEND_URL from '../Config'
import axios from 'axios'

function Technologies() {

    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        retrieveTechnoliges();
    }, [])

    const retrieveTechnoliges = () => {
        axios.get(`${BACKEND_URL}/technologies`).then(res => {
            if (res.data.success) {
                setTechnologies(res.data.existingTechnologies)
            } else {
                setTechnologies([])
            }
        })
    }

    const displayTechnologies = () => {
        if (technologies) {
            return technologies.map(technology => (
                <DetailedAccordion info={technology}/>
            ))
        } else {
            return (
                <Typography>No featured Jobs</Typography>
            )
        }
    }

    return (
        <Grid item container xs={12} spacing={3} direction="column"
            justify="space-between"
            alignItems="flex-start">
            <Grid item xs={12} style={{ minWidth: '100%' }}>
                <FloatCard >
                    <div style={{ padding: 20, width: '100%', textAlign: 'left' }}>
                        {displayTechnologies()}
                    </div>
                </FloatCard>
            </Grid>
        </Grid >
    )
}

export default Technologies
