import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    backgroundColor: 'rgba(213, 239, 247, 0)',
    height: '25px'
  },
});

export default function Space(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

    </div>
  );
}