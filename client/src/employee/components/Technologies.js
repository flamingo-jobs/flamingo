import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import DetailedAccordion from './DetailedAccordion'
import { Typography } from '@material-ui/core'
import BACKEND_URL from '../../Config';
import axios from 'axios'
import SnackBarAlert from '../../components/SnackBarAlert'

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

function Technologies() {
    const classes = useStyles();

    const [technologies, setTechnologies] = useState([]);
    const [refershRequired, setRefreshRequired] = useState(false);

    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);

    const [alertShow, setAlertShow] = React.useState(false);
    const [alertData, setAlertData] = React.useState({severity: "", msg: ""});

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
        if (updateSuccess == true) {
            setAlertData({severity: "success", msg: "Changes saved successfully!"});
            handleAlert();
        }
        setUpdateSuccess(false);
    }, [updateSuccess]);

    useEffect(() => {
        if (updateFailed == true) {
            setAlertData({severity: "error", msg: "Failed to save changes!"});
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
                setTechnologies(res.data.existingTechnologies)
            } else {
                setTechnologies([])
            }
        })
    }

    const displayTechnologies = () => {
        if (technologies) {
            return technologies.map(technology => (
                <DetailedAccordion key={technology._id} info={technology} onRefresh={handleRefresh} onSuccessUpdate={handleUpdatesuccess} onFailedUpdate={handleUpdateFailed} />
            ))
        } else {
            return (
                <Typography>No featured Jobs</Typography>
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
        <Grid item container xs={12} spacing={3} direction="column"
            justify="space-between"
            alignItems="flex-start">
            <Grid item xs={12} style={{ minWidth: '100%' }}>
                <Paper elevation={0} className={classes.paperCont}>
                    <div style={{ padding: 20, width: '100%', textAlign: 'left' }}>
                        {displayTechnologies()}
                    </div>
                </Paper>
            </Grid>
            {displayAlert()}
        </Grid >
    )
}

export default Technologies