import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import DetailedAccordion from './DetailedAccordion'
import { Typography } from '@material-ui/core'
import BACKEND_URL from '../../Config';
import axios from 'axios'
import SnackBarAlert from '../../components/SnackBarAlert'
import FloatCard from '../../components/FloatCard';
import Loading from '../../components/Loading';
const useStyles = makeStyles((theme) => ({

}));

function TechnologiesStackEdit(props) {
    const classes = useStyles();
    const [technologyStack, setTechnologyStack] = useState([]);
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
        axios.get(`${BACKEND_URL}/technologies`).then(res => {
            if (res.data.success) {
                setTechnologies(res.data.existingData)
            } else {
                setTechnologies([])
            }
        })

        let technologyStackData;
        axios.get(`${BACKEND_URL}/employers/${props.employerId}`)
            .then(res => {
                if (res.data.success) {
                    if (res.data.employer.technologyStack.length > 0) {
                        technologyStackData = res.data.employer.technologyStack;
                        if (Object.keys(res.data.employer.technologyStack[0]).length === 0) {
                            res.data.employer.technologyStack.splice(0, 1)
                            i++;
                        } else if (technologyStackData[0].technologyStack == "" && technologyStackData[0].institute == "" && technologyStackData[0].from == "" && technologyStackData[0].to == "") {
                            res.data.employer.technologyStack.splice(0, 1)
                            i++;
                        }
                    }
                    setTechnologyStack(technologyStackData)
                }
            })
    }


    const displayTechnologies = () => {
        if (technologies.length) {
            return technologies.map(technology => (
                <DetailedAccordion showEdit={props.showEdit} login={props.login} employerId={props.employerId} key={technology._id} info={technology} techno={technologyStack} onRefresh={handleRefresh} onSuccessUpdate={handleUpdatesuccess} onFailedUpdate={handleUpdateFailed} />
            ))
        } else {
            return (
                <Grid item xs={12}>
                    <Loading />
                </Grid>
            )
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

export default TechnologiesStackEdit
