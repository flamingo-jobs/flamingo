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
    stateBlue: '#5E60CE',
    tuftsBlue: '#5390D9',
    blueJeans: '#4EA8DE',
    vividSkyBlue: '#48BFE3',
    skyBlueCrayola: '#56CFE1',
    mediumTurquoise: '#64DFDF',
    turquoise: '#72EFDD',
    aquamarine: '#80FFDB',
    lightSkyBlue: '#d7f1fc',
    greenyLightSky: '#e0faff',
    tagYellow: '#fcf9d7',
    tagIcon: '#969478',
    pinkyRed: '#ff6ecc',
    white: '#fff',
    black: '#424547',
    ashBlue: '#54788a',
    flamingo: '#e7bab5'
  }
});

export default theme;