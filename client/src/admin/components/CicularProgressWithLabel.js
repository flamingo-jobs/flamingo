import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex" style={{ margin: 16 }}>
      <CircularProgress variant="determinate" value={props.value} thickness={5} size={120} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" style={{fontSize: 20, fontWeight: 500}} component="div" color="textSecondary">{`${props.value.toFixed(2)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function CircularStatic(props) {

  return <CircularProgressWithLabel value={props.value} />;
}
