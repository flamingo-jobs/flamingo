import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import BACKEND_URL from '../../Config';
import axios from 'axios'
import SnackBarAlert from '../../components/SnackBarAlert'
import FloatCard from '../../components/FloatCard';
import TechDisplay from './TechDisplay';
import Loading from '../../components/Loading';
import NoInfo from '../../components/NoInfo';
import NotEnoughData from '../../components/NotEnoughData';
const useStyles = makeStyles((theme) => ({

}));

function Technologies(props) {
    const classes = useStyles();
    const [technologyStack, setTechnologyStack] = useState("empty");
    const [tech, setTech] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [refershRequired, setRefreshRequired] = useState(false);

    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);

    const [alertShow, setAlertShow] = React.useState(false);
    const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

    let i = 0;
    let loginId;


    useEffect(() => {
        retrieveTechnoliges();
    }, [])

    const handleUpdatesuccess = () => {
        setUpdateSuccess(true);
    }

    const handleUpdateFailed = () => {
        setUpdateFailed(true);
    }

    useEffect(() => {
        if (updateSuccess === true) {
            setAlertData({ severity: "success", msg: "Changes saved successfully!" });
            handleAlert();
        }
        setUpdateSuccess(false);
    }, [updateSuccess]);

    useEffect(() => {
        if (updateFailed === true) {
            setAlertData({ severity: "error", msg: "Failed to save changes!" });
            handleAlert();
        }
        setUpdateFailed(false);
    }, [updateFailed]);

    const handleRefresh = () => {
        setRefreshRequired(true);
    }

    const retrieveTechnoliges = () => {
        let technologyStackData;
        axios.get(`${BACKEND_URL}/employers/${props.employerId}`)
            .then(res => {
                if (res.data.success) {
                    setTechnologyStack(res.data.employer.technologyStack)
                }
            })
    }


    const displayTechnologies = () => {
        if (technologyStack === "empty") {
            return (<Grid item xs={12}>
                <Loading />
            </Grid>
            )
        } else if (technologyStack.length === 0) {
            return (
                <Grid item xs={12}>
                    <NotEnoughData />
                </Grid>
            )
        } else {
            return technologyStack.map(technology => {
                return (
                    <Grid item xs={12}>
                        <TechDisplay info={technology} />
                    </Grid>
                )
            })
        }
    }

    const displayAlert = () => {
        return <SnackBarAlert open={alertShow} onClose={handleAlertClose} severity={alertData.severity} msg={alertData.msg} />
    }

    const handleAlert = () => {
        setAlertShow(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertShow(false);
    };

    return (
        <FloatCard>
            <Grid container spacing={3} direction="column"
                justify="space-between">
                <Grid item xs={12}>
                    <Typography variant="h6" className={classes.title}>
                        Company Technology Stack
                    </Typography>
                </Grid>
                
                <Grid item xs={12}>
                    {displayTechnologies()}

                </Grid >
            </Grid>
            {displayAlert()}
        </FloatCard>
    )
}

export default Technologies
