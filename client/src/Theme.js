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
    purpleHover: '#8A00DA',
    frenchViolet: '#6930C3',
    frenchVioletHover: '#803AEE',
    stateBlue: '#5E60CE',
    stateBlueHover: '#6C6EEC',
    tuftsBlue: '#5390D9',
    tuftsBlueHover: '#3D85DB',
    blueJeans: '#4EA8DE',
    blueJeansHover: '#2F9CDE',
    vividSkyBlue: '#48BFE3',
    vividSkyBlueHover: '#1FB7E5',
    skyBlueCrayola: '#56CFE1',
    skyBlueCrayolaHover: '#35CAE0',
    mediumTurquoise: '#64DFDF',
    mediumTurquoiseHover: '#44E0E0',
    turquoise: '#72EFDD',
    turquoiseHover: '#42EDD4',
    aquamarine: '#80FFDB',
    aquamarineHover: '#4DFECC',
    lightSkyBlue: '#d7f1fc',
    lightSkyBlueHover: '#E8F8FF',
    greenyLightSky: '#e0faff',
    greenyLightSkyHover: '#BFF3FD',
    tagYellow: '#fcf9d7',
    tagYellowHover: '#FEF8AF',
    tagIcon: '#969478',
    tagIconHover: '#969366',
    pinkyRed: '#E366B3',
    pinkyRedHover: '#E552AD',
    lightyPink: "#FFE9F7",
    lightyPinkHover: "#FEBCE6",
    white: '#FFFFFF',
    whiteHover: '#EDF9FF',
    black: '#424547',
    blackHover: '#3A4349',
    ashBlue: '#54788a',
    ashBlueHover: '#6A97AE',
    flamingo: '#e7bab5',
    flamingoHover: '#E49D95',
    gold: '#FFD700',
    goldHover: '#FEE768',
    red: "#cf1515"
  },
  typography: {
    fontSize: 14,
  },
});

export default theme;