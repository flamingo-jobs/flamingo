import React, {useState} from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import Lottie from 'react-lottie';
import FloatCard from '../../components/FloatCard';
import theme from '../../Theme';
import Hiring from '../lotties/hiring.json';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card: {

    },
    btn: {
        backgroundColor: theme.palette.white,
        color: theme.palette.vividSkyBlue,
        margin: 10,
        fontWeight: 800,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
            backgroundColor: theme.palette.vividSkyBlueHover,
            color: 'white',
        }
    },
    heading: {
        color: theme.palette.white,
        fontWeight: 500,
        marginBottom: 5,
        marginTop: 5
    },
    description: {
        marginBottom: 10,
        color: theme.palette.white,
    },
    text: {
        padding: 10
    }
}))
function PostJobSection() {

    const classes = useStyles();
    const isSignedIn = sessionStorage.getItem("userToken") ? true : false;
    const jwt = require("jsonwebtoken");
    const token = sessionStorage.getItem("userToken");
    const [role, setRole] = useState(
        jwt.decode(token, { complete: true })
            ? jwt.decode(token, { complete: true }).payload.userRole
            : null
    );

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Hiring,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div >
            <FloatCard backColor={theme.palette.vividSkyBlue}>
                
            <div className={classes.text}>
                <Typography variant="h5" className={classes.heading}>Hiring will never be the same again.</Typography>
                
                <Typography className={classes.description}>We are an end-to-end recruitment platform that helps businesses like yourself, find the right candidates as smoothly as possible.</Typography>
                <Lottie
                        options={defaultOptions}
                        height={250}
                        width={250}
                    />
                <Typography variant="h6" className={classes.heading}>Want to find the best candidate?</Typography>

                {isSignedIn && role === "employer" &&
                    <Link to={`/employer/jobs`}>
                        <Button className={classes.btn}>Start Hiring</Button>
                    </Link>
                }
                {!isSignedIn && 
                    <Link to={`/signin`}>
                        <Button className={classes.btn}>Start Hiring</Button>
                    </Link>
                }
                
            </div>
            </FloatCard>
        </div>
    )
}

export default PostJobSection
