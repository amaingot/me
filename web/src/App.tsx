import React from 'react';
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import CSSBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import blueGrey from '@material-ui/core/colors/blueGrey';
import MomentUtls from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import LogoIcon from './icons/LogoIcon';
import BusinessCard from './components/BusinessCard';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `${blueGrey['50']}`,
    position: 'relative',
  },
  logo: {
    color: 'white',
    position: 'absolute',
    left: '2rem',
    top: '2rem',
    height: '4rem',
    width: '4rem',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#69f0ae',
    },
  },
  typography: {
    fontFamily: ['Source Code Pro', 'monospace'].join(','),
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CSSBaseline />
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <MuiPickersUtilsProvider utils={MomentUtls}>
          <div className={classes.wrapper}>
            <LogoIcon className={classes.logo} />
            <BusinessCard />
          </div>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
