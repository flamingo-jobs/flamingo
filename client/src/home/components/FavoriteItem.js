import { Avatar, Grid, makeStyles, ListItem, ListItemText, ListItemAvatar, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 5,
    },
    item: {
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 12

    },
    title: {
        textAlign: "left",
        margin: 0,
        fontSize: 18,
        fontWeight: "bold"
    },
    icon: {
    },
    logo: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    }
}))

function FavoriteItem(props) {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container direction="row">
                <ListItem button className={classes.item} key={props.key}>
                    <ListItemAvatar className={classes.logo}><Avatar src={props.logo} /></ListItemAvatar>
                    <Typography className={classes.title}>{props.name}</Typography>
                </ListItem>
            </Grid>
        </div>
    )
}

export default FavoriteItem
