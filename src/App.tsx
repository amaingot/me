import React from 'react';
import styled from 'styled-components';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import CSSBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import blueGrey from '@material-ui/core/colors/blueGrey';

import LogoIcon from './icons/LogoIcon';
import BusinessCard from './components/BusinessCard';

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${blueGrey['50']};
  position: relative;
`;

const StyledLogo = styled(LogoIcon)`
  color: white;
  position: absolute;
  left: 2rem;
  top: 2rem;
  height: 4rem !important;
  width: 4rem !important;
`;

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
  return (
    <React.Fragment>
      <CSSBaseline />
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <AppWrapper>
          <StyledLogo color="currentColor" />
          <BusinessCard />
        </AppWrapper>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
