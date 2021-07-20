import { Grid} from '@material-ui/core'
import React from 'react'

function Space(props) {


    return (
        <Grid item xs={12}>
        <div style={{height:`${props.value}px`}}>
            
        </div>
        </Grid>
    )
}

export default Space
