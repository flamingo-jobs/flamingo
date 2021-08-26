import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FloatCard from '../../components/FloatCard';
import theme from '../../Theme';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Grid from '@material-ui/core/Grid';
import Technologies from './Technologies';

const useStyles = makeStyles({
  defaultButton: {
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    marginLeft: 20,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: 'white',
    }
  },
  paper: {
    backgroundColor: 'MintCream',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
    borderRadius: 10,
  },
});

function TechnologySection(props) {
  const classes = useStyles();

  return (
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <MenuBookIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Technology Stack
            </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
            {/* <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}}>
                <EditIcon style={{color: theme.palette.tuftsBlue,}} />
            </Button> */}
        </Grid>
        
      </Grid>

      <Technologies jobseekerID={props.jobseekerID} />

    </FloatCard>
  );
}

export default TechnologySection
