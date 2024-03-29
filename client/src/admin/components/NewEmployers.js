import React, {useState, useEffect} from 'react'
import { Grid, Typography } from '@material-ui/core'
import FloatCard from '../../components/FloatCard'
import CircularProgressWithLabel from './CicularProgressWithLabel'
import axios from "axios";
import BACKEND_URL from "../../Config";


function NewEmployers() {
    const [userCount, setUserCount] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        retrieveUserCount();
    }, []);
    
    const retrieveUserCount = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/analytics/getNewUsers/employer`);
            if (response.data.success) {
                setUserCount(response.data.newEmployers);
                setPercentage(response.data.percentage);
            }
        } catch (err) {
            // console.log(err);
        }
    };
    return (
        <FloatCard>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2">{userCount}</Typography>
                    <Typography>New Employers</Typography>
                </Grid>
            </Grid>
        </FloatCard>
    )
}

export default NewEmployers
