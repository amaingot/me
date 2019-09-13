import React from 'react';
import { Moment } from 'moment-timezone';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import getApiHost from '../utils/getApiHost';
import { CircularProgress, Theme } from '@material-ui/core';
import MeetingTimeForm from './MeetingTimeForm';
import axios from 'axios';

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
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [duration, setDuration] = React.useState('15m');

  const [timeSelected, setTimeSelected] = React.useState<Moment | undefined>();

  const handleTimeSelected = (time: Moment, duration: string) => {
    setTimeSelected(time);
    setDuration(duration);
  }

  const scheduleMeeting = () => {
    const data = {
      slot: timeSelected,
      name: name,
      email: email,
    };
    console.log(data);

    axios.post(`${getApiHost()}/meeting/${duration}/schedule`, data);
  };

  return (
    <Paper className={classes.card}>
      <Typography gutterBottom variant="h5">Schedule a Meeting</Typography>
      {!timeSelected && props.show &&
        <MeetingTimeForm onFinishedFirstLoad={() => setLoading(false)} onSubmit={handleTimeSelected} />
      }

      {timeSelected && (
        <React.Fragment>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="dense"
          />
          <Button
            className={classes.submitButton}
            onClick={scheduleMeeting}
            variant="contained"
            color="primary"
            fullWidth
          >
            Schedule
          </Button>

        </React.Fragment>
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