import React from 'react';
import { Moment } from 'moment-timezone';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { CalendlyScheduleResponse } from '../types/CalendlyResponses';
import getApiHost from '../utils/getApiHost';
import { CircularProgress, Theme } from '@material-ui/core';
import MeetingTimeForm from './MeetingTimeForm';
import axios from 'axios';
import MeetingContactForm from './MeetingContactForm';

const useStyles = makeStyles<Theme, { show: boolean; }>({
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
});

interface Props {
  show: boolean;
}

const ScheduleMeetingCard: React.FC<Props> = (props) => {
  const classes = useStyles(props);

  const [loading, setLoading] = React.useState(true);
  const [duration, setDuration] = React.useState('15m');
  const [timeSelected, setTimeSelected] = React.useState<Moment | undefined>();

  const handleTimeSelected = (time: Moment, duration: string) => {
    setTimeSelected(time);
    setDuration(duration);
  }

  const scheduleMeeting = (email: string, name: string) => {
    setLoading(true);

    const data = {
      slot: timeSelected,
      name,
      email,
    };

    axios.post<CalendlyScheduleResponse>(`${getApiHost()}/meeting/${duration}/schedule`, data)
      .then(resp => {
        if (resp.status === 200) {

        }
      });
  };

  return (
    <Paper className={classes.card}>
      <Typography gutterBottom variant="h5">Let's Meet!</Typography>
      {!timeSelected && props.show &&
        <MeetingTimeForm onFinishedFirstLoad={() => setLoading(false)} onSubmit={handleTimeSelected} />
      }

      {!loading && timeSelected && (
        <MeetingContactForm onSubmit={scheduleMeeting} />
      )}

      {loading && (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      )}
    </Paper>
  );
};

export default ScheduleMeetingCard;