import React from 'react';
import ReactGA from 'react-ga';
import moment, { Moment } from 'moment-timezone';
import axios from 'axios';

import { makeStyles } from '../utils/Theme';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Zoom from '@material-ui/core/Zoom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { ScheduleResponse } from '../types/APIResponses';
import getApiHost from '../utils/getApiHost';
import MeetingTimeForm from './MeetingTimeForm';
import MeetingContactForm from './MeetingContactForm';
import OopsImage from '../images/oops-large.gif';

const useStyles = makeStyles<{ show: boolean; loading: boolean; error: boolean; success: boolean; }>(theme => ({
  card: {
    position: 'absolute',
    width: '40%',
    height: '90%',
    overflow: 'scroll',
    top: '5%',
    padding: '1rem',
    transition: 'right 300ms ease-in-out',
    right: ({ show }) => show ? '5%' : '-50%',
  },
  submitButton: {
    marginTop: '1rem',
  },
  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    display: ({ loading, error, success }) => success || loading || error ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '2.5rem',
  },
  loadingContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayImage: {
    width: '70%',
    borderRadius: '0.2rem',
    boxShadow: theme.shadows[3],
  },
  overlayContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '1rem',
  },
  successCheck: {
    color: '#09af00',
    width: '3rem',
    height: '3rem',
  }
}));

interface Props {
  show: boolean;
}

const ScheduleMeetingCard: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<boolean>(false);
  const [successReponse, setSuccessResponse] = React.useState<ScheduleResponse>();
  const [duration, setDuration] = React.useState('15m');
  const [timeSelected, setTimeSelected] = React.useState<Moment>();

  const classes = useStyles({ ...props, loading, error, success: !!successReponse });

  const handleTimeSelected = (time: Moment, duration: string) => {
    ReactGA.event({
      category: 'Meeting',
      action: 'Selected a Meeting Time'
    });

    setTimeSelected(time);
    setDuration(duration);
  }

  const scheduleMeeting = (email: string, name: string) => {
    setLoading(true);

    const requestData = {
      tz: moment.tz.guess(),
      slot: timeSelected,
      name,
      email,
    };

    axios.post<ScheduleResponse>(`${getApiHost()}/meeting/${duration}/schedule`, requestData)
      .then(resp => {
        ReactGA.event({
          category: 'Meeting',
          action: 'Scheduled a Meeting'
        });
        if (resp.status < 400) {
          setSuccessResponse(resp.data);
          setLoading(false);
        } else {
          window.Rollbar.error("Error scheduling meeting: Bad Response Code", {
            request: {
              data: requestData,
            },
            response: {
              status: resp.status,
              statusText: resp.statusText,
              data: resp.data,
              headers: resp.headers,
            }
          });
          setError(true);
        }
      })
      .catch((err) => {
        window.Rollbar.error("Error scheduling meeting: Fatal Error", err);
        setError(true);
      });
  };

  React.useEffect(() => {
    const img = new Image();
    img.src = OopsImage;
  }, []);

  return (
    <Paper className={classes.card}>
      <Typography gutterBottom variant="h5">Let's Meet!</Typography>
      {!error && !timeSelected && props.show &&
        <MeetingTimeForm onFinishedFirstLoad={() => setLoading(false)} onError={() => setError(true)} onSubmit={handleTimeSelected} />
      }

      {!error && !loading && timeSelected && !successReponse && (
        <MeetingContactForm onSubmit={scheduleMeeting} />
      )}

      <div className={classes.overlay}>
        {!error && loading && (
          <Zoom in={true}>
            <CircularProgress />
          </Zoom>
        )}
        {!!successReponse && (
          <Zoom in={true}>
            <div className={classes.overlayContent}>
              <CheckCircleIcon className={classes.successCheck} />
              <Typography variant="h5" display="block">Scheduled!</Typography>
              <Typography variant="subtitle2" display="block" align="center">
                Talk to you soon!
              </Typography>
            </div>
          </Zoom>
        )}
        {error && (
          <Zoom in={error}>
            <div className={classes.overlayContent}>
              <img className={classes.overlayImage} src={OopsImage} alt="Oops! Our bad!" />
              <Typography variant="h6" display="block">Uh oh!</Typography>
              <Typography variant="subtitle2" display="block" align="center">
                Things didn't got as planned! Could you <Link href="/">try again</Link>?
              </Typography>
            </div>
          </Zoom>
        )}
      </div>
    </Paper>
  );
};

export default ScheduleMeetingCard;