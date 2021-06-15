import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    backgroundColor: theme.palette.tagYellow,
  },
  title: {
    fontSize: 14,
  },
  chip:{
    backgroundColor: theme.palette.turquoise,
    marginRight:5,
    marginBottom:5,
  },
  addButton:{
    marginTop:-5,
    marginLeft:-5,
    backgroundColor: theme.palette.turquoise,
  },
  removeButton:{
    marginTop:-5,
    backgroundColor: theme.palette.turquoise,

  },
 
}))

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
        <CardContent>
            <Grid container xs={12} direction="column" spacing={1}>

                <Grid item container sm={12} direction="row" spacing={1} >

                    <Grid item sm={10}>
                        <Typography className={classes.title} gutterBottom>
                            Software Development  
                        </Typography>

                    </Grid>

                    <Grid item sm={1}>
                        <IconButton variant="outlined" size="small" aria-label="add" className={classes.addButton}>
                            <AddIcon />
                        </IconButton>
                    </Grid>

                    <Grid item sm={1}>
                        <IconButton variant="outlined" size="small" aria-label="remove" className={classes.removeButton}>
                            <RemoveIcon />
                        </IconButton>
                    </Grid>

                </Grid>

               

                <Grid item sm={12} >
                    <Chip label="React" variant="outlined" className={classes.chip}/>
                    <Chip label="Express" variant="outlined" className={classes.chip}/>
                    <Chip label="Angular" variant="outlined"className={classes.chip} />
                    <Chip label="Vue.js" variant="outlined"className={classes.chip} />
                    <Chip label="jQuery" variant="outlined" className={classes.chip}/>
                    <Chip label="Springboot" variant="outlined"className={classes.chip} />
                    <Chip label="Java" variant="outlined" className={classes.chip}/>
                    <Chip label="Basic" variant="outlined" className={classes.chip}/>
                </Grid>

            </Grid>

            
        </CardContent>
    </Card>
  );
}
