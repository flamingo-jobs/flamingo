import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import DetailedAccordion from './DetailedAccordion'
import { Typography } from '@material-ui/core'
import BACKEND_URL from '../../Config';
import axios from 'axios'
import SnackBarAlert from '../../components/SnackBarAlert'
import Loading from '../../components/Loading';

const useStyles = makeStyles((theme) => ({
    paperCont: {
      backgroundColor: 'MintCream',
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 25,
      borderRadius: 10,
      "&:hover": {
          defaultButton: {
              display: 'block'
          }
        }
    },
  }));

function Technologies(props) {
    const classes = useStyles();
    const [technologyStack, setTechnologyStack] = useState([]);
    const [tech, setTech] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [refershRequired, setRefreshRequired] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);

    const [alertShow, setAlertShow] = React.useState(false);
    const [alertData, setAlertData] = React.useState({severity: "", msg: ""});

    let i=0;
    let loginId;
    let login = false;
    const jwt = require("jsonwebtoken");
    const token = sessionStorage.getItem("userToken");
    const header = jwt.decode(token, { complete: true });
    if(token === null){
        loginId=props.jobseekerID;
    }else if (header.payload.userRole === "jobseeker") {
        login = true;
        loginId=sessionStorage.getItem("loginId");
    } else {
        loginId=props.jobseekerID;
    }

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
            setAlertData({severity: "success", msg: "Changes saved successfully!"});
            handleAlert();
        }
        setUpdateSuccess(false);
    }, [updateSuccess]);

    useEffect(() => {
        if (updateFailed === true) {
            setAlertData({severity: "error", msg: "Failed to save changes!"});
            handleAlert();
        }
        setUpdateFailed(false);
    }, [updateFailed]);

    const handleRefresh = () => {
        setRefreshRequired(true);
    }

    const retrieveTechnoliges = () => {
        setLoadingData(true);
        axios.get(`${BACKEND_URL}/technologies`).then(res => {
            if (res.data.success) {
                setTechnologies(res.data.existingData)
            } else {
                setTechnologies([])
            }
        })

        // console.log("inside fetchData"+loginId)
        let technologyStackData;
        axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
        .then(res => {
            if(res.data.success){
            if(res.data.jobseeker.technologyStack.length > 0){
                technologyStackData = res.data.jobseeker.technologyStack;
                if(Object.keys(res.data.jobseeker.technologyStack[0]).length === 0){
                    res.data.jobseeker.technologyStack.splice(0,1)
                    i++;
                }else if(technologyStackData[0].technologyStack == "" && technologyStackData[0].institute == "" && technologyStackData[0].from == "" && technologyStackData[0].to == ""){
                    res.data.jobseeker.technologyStack.splice(0,1)
                    i++;
                }
            }
            setTechnologyStack(technologyStackData)
            setLoadingData(false);
            // console.log(res.data.jobseeker.technologyStack)

            }
        })
    }


    const displayTechnologies = () => {
        if(loadingData) {
            return <Loading />
        } else if (technologies) {
            return technologies.map(technology => (
                <DetailedAccordion jobseeker={loginId} key={technology._id} info={technology} techno={technologyStack} onRefresh={handleRefresh} onSuccessUpdate={handleUpdatesuccess} onFailedUpdate={handleUpdateFailed} />
            ))
        } else {
            return (
                <Typography>No technologies to display</Typography>
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
        <>
        <Paper elevation={0} className={classes.paperCont}>
            <div style={{ padding: 20, width: '100%', textAlign: 'left' }}>
                {displayTechnologies()}
            </div>
        </Paper>
        {displayAlert()}
        </>
    )
}

export default Technologies
