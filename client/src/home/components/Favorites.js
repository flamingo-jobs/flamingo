import { Avatar, Badge, Divider, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import FavoriteItem from './FavoriteItem'
import wso2 from '../images/wso2.png'
import virtusa from '../images/virtusa.png'
import ifs from '../images/ifs.png'
import ninix from '../images/ninix.png'

const useStyles = makeStyles(() => ({
    root: {
        padding: 5,
        paddingTop: 10
    },
    title: {
        textAlign: "left",
        margin: 0,
        marginLeft: 10,
        fontSize: 20,
    },
    icon: {
        textAlign: "-webkit-right"
    },
    number: {
        width: 26,
        height: 26
    },
    divider: {
        marginTop: 15,
        marginBottom: 15
    }
}))

function Favorites() {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container direction="column">
                <Grid container direction="row">
                    <Grid item sm={9}>
                        <h2 className={classes.title}>Favourites</h2>
                    </Grid>
                    <Grid item sm={3} className={classes.icon}>
                        <Avatar className={classes.number}>5</Avatar>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <FavoriteItem button name="WSO2" logo={wso2} />
                <FavoriteItem name="99X" logo={ninix} />
                <FavoriteItem name="Virtusa" logo={virtusa} />
                <FavoriteItem name="IFS" logo={ifs} />
            </Grid>

        </div>
    )
}

export default Favorites
