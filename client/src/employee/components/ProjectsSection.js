import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FloatCard from '../../components/FloatCard';
import cardImage from '../images/profilePic.jpg';
import theme from '../../Theme';
import EditIcon from '@material-ui/icons/Edit';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import Grid from '@material-ui/core/Grid';
import EduItem from './EduItem';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import WorkIcon from '@material-ui/icons/Work';
import CodeIcon from '@material-ui/icons/Code';

const useStyles = makeStyles({
  defaultButton: {
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    marginLeft: 20,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.mediumTurquoise,
      color: 'white',
    }
  },
});

function ProjectsSection() {
  const classes = useStyles();

  return (
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <LaptopChromebookIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Projects
            </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}}>
                <GitHubIcon style={{color: theme.palette.tuftsBlue,marginRight:'15px'}} />
                <EditIcon style={{color: theme.palette.tuftsBlue,}} />
            </Button>
        </Grid>
        
      </Grid>
      <Grid container spacing={3} style={{backgroundColor:'#b3ccff'}}>
            <Grid item xs={12}>
              <VerticalTimeline layout='1-column-left'>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: 'white', color: theme.palette.stateBlue }}
                  contentArrowStyle={{ borderRight: '7px solid  #fff' }}
                  date="2021 - Present"
                  iconStyle={{ background: theme.palette.stateBlue, color: '#fff' }}
                  icon={<CodeIcon />}
                  style={{marginTop:'-20px'}}
                >
                  <h3 className="vertical-timeline-element-title" style={{color:'#666'}}>Employeement Recommendation Portal</h3>
                  <h4 className="vertical-timeline-element-subtitle" style={{color:'#666'}}>(MERN, Python)</h4>
                  <p>
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: 'white', color: theme.palette.stateBlue }}
                  contentArrowStyle={{ borderRight: '7px solid  #fff' }}
                  date="2021 - Present"
                  iconStyle={{ background: theme.palette.stateBlue, color: '#fff' }}
                  icon={<CodeIcon />}
                  style={{marginTop:'-20px'}}
                >
                  <h3 className="vertical-timeline-element-title" style={{color:'#666'}}>Employeement Recommendation Portal</h3>
                  <h4 className="vertical-timeline-element-subtitle" style={{color:'#666'}}>(MERN, Python)</h4>
                  <p>
                    Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: 'white', color: theme.palette.stateBlue }}
                  contentArrowStyle={{ borderRight: '7px solid  #fff' }}
                  date="2021 - Present"
                  iconStyle={{ background: theme.palette.stateBlue, color: '#fff' }}
                  icon={<CodeIcon />}
                  style={{marginTop:'-20px'}}
                >
                  <h3 className="vertical-timeline-element-title" style={{color:'#666'}}>Employeement Recommendation Portal</h3>
                  <h4 className="vertical-timeline-element-subtitle" style={{color:'#666'}}>(MERN, Python)</h4>
                  <p>
                    Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: 'white', color: theme.palette.stateBlue }}
                  contentArrowStyle={{ borderRight: '7px solid  #fff' }}
                  date="2021 - Present"
                  iconStyle={{ background: theme.palette.stateBlue, color: '#fff', }}
                  icon={<CodeIcon />}
                  style={{marginTop:'-20px'}}
                >
                  <h3 className="vertical-timeline-element-title" style={{color:'#666'}}>Employeement Recommendation Portal</h3>
                  <h4 className="vertical-timeline-element-subtitle" style={{color:'#666'}}>(MERN, Python)</h4>
                  <p>
                    Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                  </p>
                </VerticalTimelineElement>
              </VerticalTimeline>
            </Grid>
        </Grid>
    </FloatCard>
  );
}

export default ProjectsSection
