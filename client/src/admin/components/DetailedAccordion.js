import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  inputRoot: {
    color: theme.palette.black,
    fontSize: 14,
    backgroundColor: 'transparent',
    border: 'none',
    minWidth: 250,
    transition: 'background-color 200ms cubic-bezier(1, 1, 1, 0.1) 0ms',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:hover:before': {
      border: 'none',
    },
    '&:before': {
      display: 'none'
    },
    '&:after': {
      border: 'none',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    background: 'transparent'
  },
  keywordInput: {
    border: 'none',
    '&hover': {
      border: 'none'
    }
  },
  keywordChip: {
    backgroundColor: theme.palette.lightSkyBlue,
    margin: 3,
    marginRight: 5
  },
}));

export default function DetailedAccordion(props) {
  const classes = useStyles();
  const [keywords, setKeyword] = React.useState(props.info.stack);

  const addKeywords = (keywords) => {
    setKeyword(keywords);
  }

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{props.info.name}</Typography>
          </div>
          <div className={classes.column}>
            
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Grid container spacing={1}>
            { props.info.stack.frontEnd ? 
            <>
            <Grid item lg={6}>
            <Typography className={classes.secondaryHeading}>Front-end</Typography>
              <Autocomplete
                multiple
                id="tags-filled1"
                options={[]}
                defaultValue={props.info.stack.frontEnd}
                freeSolo
                disableClearable
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} id="outlined-basic1" variant="standard" placeholder="Click to add" classes={{ root: classes.keywordInput }} />
                )}
                onChange={(event, value) => addKeywords(value)}
                classes={{
                  inputRoot: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </Grid>
            <Grid item lg={6}>
            <Typography className={classes.secondaryHeading}>Back-end</Typography>
              <Autocomplete
                multiple
                id="tags-filled2"
                options={[]}
                defaultValue={props.info.stack.backEnd}
                freeSolo
                disableClearable
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} id="outlined-basic2" variant="standard" placeholder="Click to add" classes={{ root: classes.keywordInput }} />
                )}
                onChange={(event, value) => addKeywords(value)}
                classes={{
                  inputRoot: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </Grid> </>: <Grid item lg={12}>
            <Typography className={classes.secondaryHeading}>Technologies</Typography>
              <Autocomplete
                multiple
                id="tags-filled1"
                options={[]}
                defaultValue={props.info.stack.list}
                freeSolo
                disableClearable
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} id="outlined-basic1" variant="standard" placeholder="Click to add" classes={{ root: classes.keywordInput }} />
                )}
                onChange={(event, value) => addKeywords(value)}
                classes={{
                  inputRoot: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </Grid> }

            
          </Grid>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
