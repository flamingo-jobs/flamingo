import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
    },
    margin: {
        height: theme.spacing(3),
    },
}));

const marks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 50,
        label: '50%',
    },
    {
        value: 100,
        label: '100%',
    },
];

export default function ContinousSlider(props) {
    const classes = useStyles();

    const [value, setValue] = useState(props.value);

    function valuetext(value) {
        setValue(value);
    }

    useEffect(() => {
        props.passValue(props.name, value)
    }, [value])

    return (
        <Grid item contianer spacing={2} direction="row" style={{display: 'flex', padding: 24}}>
            <Grid item xs={12} md={6} lg={5}>
                <Typography>{props.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
                <Slider
                    defaultValue={props.value}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-always"
                    marks={marks}
                    valueLabelDisplay="on"
                />
            </Grid>
        </Grid>
    );
}