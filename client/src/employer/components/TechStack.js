import React from 'react'
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import FloatCard from './FloatCard';
import Grid from '@material-ui/core/Grid';
import TechCard from './TechCard';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
        color: theme.palette.white,
    },
    techStackWording: {
        marginBottom: 10,
    },
    addButton:{
        marginLeft:-20,
        // marginTop:-5,
        // backgroundColor: theme.palette.turquoise,
    },
    removeButton:{
        marginLeft:-20,
        // marginTop:-5,
        // backgroundColor: theme.palette.turquoise,
    },

}))

function TechStack() {

    const classes = useStyles();


    return (

        <div className={classes.root}>

            {/* <FloatCard backColor={'#72EFDD'}> */}
            

            <FloatCard>
                <Grid container xs={12} direction="column" spacing={1}>

                    <Grid item container sm={12} direction="row" spacing={1} >

                        <Grid item sm={10}>
                            <Typography variant="h6" className={classes.title}>Technology Stack</Typography>

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

                    <Grid item sm={12}>
                        <TechCard />
                    </Grid>
                    <Grid item sm={12}>
                        <TechCard />
                    </Grid>
                    <Grid item sm={12}>
                        <TechCard />
                    </Grid>
                    <Grid item sm={12}>
                        <TechCard />
                    </Grid>

                </Grid>

            </FloatCard>
            
        </div>
    )
}

export default TechStack
