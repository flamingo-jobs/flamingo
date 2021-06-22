import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
    purple: '#7400B8',
    frenchViolet: '#6930C3',
    stateBlue: '#5657B3',
    tuftsBlue: '#497DBA',
    blueJeans: '#4B9DCF',
    vividSkyBlue: '#43A9C8',
    skyBlueCrayola: '#45C2D4',
    mediumTurquoise: '#50D4D4',
    turquoise: '#66D5C8',
    aquamarine: '#4EF3DC',
    lightSkyBlue: '#d7f1fc',
    greenyLightSky: '#e0faff',
    tagYellow: '#fcf9d7',
    tagIcon: '#969478',
    pinkyRed: '#E366B3',
    white: '#fff',
    black: '#424547',
    ashBlue: '#54788a',
    flamingo: '#e7bab5',
    gold: '#FFD700'
  }
});

export default theme;