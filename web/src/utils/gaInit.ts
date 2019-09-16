import ReactGA from 'react-ga';

const gaInit = () => {
  const { REACT_APP_GOOGLE_TRACKING_ID: gaId, NODE_ENV } = process.env;

  ReactGA.initialize(gaId || 'test', {
    testMode: NODE_ENV === 'development',
  });

  ReactGA.pageview(window.location.pathname + window.location.search);
};

export default gaInit;
