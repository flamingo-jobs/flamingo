import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    backgroundColor: theme.palette.white,
    margin: theme.spacing(1),
  },
}))

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>

        <CardContent>
            <Grid container direction="column" spacing={1} alignItems="center">
                <Grid item sm={12}>
                    
                    <Typography variant="body2">
                        <Box fontStyle="italic">
                            "I've been an IFS employee for nearly a year and have had a very positive experience thus far. The company has a clear strategy and vision for its own future and the futures of the industries it serves, and it is well positioned to take advantage of the explosive growth opportunities in markets like Field Service."
                        </Box>
                    </Typography>  
                </Grid>

                <Grid item sm={12} className={classes.rating}>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                </Grid>
                 
            </Grid>

            
        </CardContent>
    </Card>
  );
}
