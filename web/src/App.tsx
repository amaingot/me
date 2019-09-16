import React from 'react';

import CSSBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import blueGrey from '@material-ui/core/colors/blueGrey';
import MomentUtls from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import LogoIcon from './icons/LogoIcon';
import BusinessCard from './components/BusinessCard';
import { Theme } from './utils/Theme';
import { makeStyles } from './utils/Theme';

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

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CSSBaseline />
      <ThemeProvider theme={Theme}>
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
