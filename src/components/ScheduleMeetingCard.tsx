import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment, { Moment } from 'moment-timezone';
import MomentUtls from '@date-io/moment';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  Day,
} from '@material-ui/pickers';

import { CalendlyAvalibility, TimeSlot } from '../types/CalendlyResponses';
import { Button } from '@material-ui/core';

const StyledCard = styled(Paper)`
  position: absolute;
  width: 18rem;
  height: 18rem;
  overflow: scroll;
  top: 2.5rem;
  padding: 1rem;

  &.show {
    transition: right 300ms ease-in-out;
    right: 2rem;
  }

  &.hide {
    transition: right 300ms ease-in-out;
    right: -18rem;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem !important;
`;

const Durations = {
  '15m': "15 minutes",
  '30m': '30 minutes',
  '1hr': '1 hour',
};

type DurationTypes = keyof typeof Durations;

interface Props {
  show: boolean;
}

const ScheduleMeetingCard: React.FC<Props> = (props) => {
  const [slotData, setSlotData] = React.useState<CalendlyAvalibility>();

  const [duration, setDuration] = React.useState<DurationTypes>('15m');
  const [currentMonth, setCurrentMonth] = React.useState<Moment>(moment());
  const [selectedDate, setSelectedDate] = React.useState<Moment | null>(moment().add(1, 'day'));
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  const [availableSpots, setAvailableSpots] = React.useState<TimeSlot[]>([]);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const [timeSelected, setTimeSelected] = React.useState<boolean>(false);

  React.useEffect(() => {
    const dayOptions = (slotData ? slotData.days || [] : []).find(d => d.date === (selectedDate && selectedDate.format('YYYY-MM-DD')));
    const spots = dayOptions ? dayOptions.spots : [];
    setAvailableSpots(spots || []);
  }, [slotData, selectedDate]);

  const handleDateChange = (date: Moment | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const onMonthChange = async (date: Moment | null) => {
    if (date) {
      setCurrentMonth(date);
      await loadData(date.date(1), duration);
    }
  };

  const onDurationChange = (e: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    setDuration(e.target.value as DurationTypes);
    loadData(currentMonth.date(1), e.target.value as string);
  };

  const loadData = (currMonth: Moment, dur: string) =>
    axios.get<CalendlyAvalibility>(`https://api.hmm.dev/calendly/${dur}`, {
      withCredentials: false,
      params: {
        timezone: moment.tz.guess(),
        diagnostics: false,
        range_start: currMonth.format('YYYY-MM-DD'),
        range_end: currMonth.date(1).add(1, 'month').subtract(1, 'day').format('YYYY-MM-DD'),
      }
    }).then(resp => setSlotData(resp.data));

  React.useEffect(() => {
    loadData(currentMonth, duration);
  }, [])

  return (
    <StyledCard className={props.show ? "show" : "hide"}>
      <Typography gutterBottom variant="h5">Schedule a Meeting</Typography>
      {!timeSelected && (
        <React.Fragment>
          <MuiPickersUtilsProvider utils={MomentUtls}>
            <FormControl fullWidth>
              <InputLabel htmlFor="duration">Duration</InputLabel>
              <Select
                value={duration}
                onChange={onDurationChange}
                inputProps={{
                  name: 'duration',
                  id: 'duration',
                }}
              >
                <MenuItem value='15m'>15 minutes</MenuItem>
                <MenuItem value='30m'>30 minutes</MenuItem>
                <MenuItem value='1hr'>1 hour</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <DatePicker
                disableToolbar
                disablePast
                variant="inline"
                format="MM-DD-YY"
                margin="normal"
                label="Date"
                value={selectedDate}
                onChange={handleDateChange}
                onMonthChange={onMonthChange}
                renderDay={(day, selectedDate) => {
                  const dayData = slotData!.days.find(d => d.date === day!.format('YYYY-MM-DD'));
                  const unavailable = dayData === undefined || dayData.status === 'unavailable';
                  const isInPast = !!day && day.isBefore(moment());
                  const isSelected = selectedDate && day && selectedDate.isSame(day) || false;

                  return <Day selected={isSelected} disabled={unavailable || isInPast}>{day!.format('D')}</Day>;
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel error={availableSpots.length === 0} htmlFor="time">Time</InputLabel>
              <Select
                value={selectedTime || ""}
                disabled={availableSpots.length === 0}
                onChange={e => setSelectedTime(e.target.value as string)}
                inputProps={{
                  name: 'selectedTime',
                  id: 'selectedTime',
                }}
              >
                {availableSpots.map(s =>
                  <MenuItem key={s.start_time} value={s.start_time}>{moment(s.start_time).format('h:mm')} {s.meridiem}</MenuItem>
                )}
              </Select>
            </FormControl>
          </MuiPickersUtilsProvider>
          <SubmitButton onClick={() => setTimeSelected(true)} disabled={!selectedTime} variant="contained" color="primary" fullWidth>Select Time</SubmitButton>
        </React.Fragment>
      )}
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
          <SubmitButton onClick={() => setTimeSelected(true)} disabled={!selectedTime} variant="contained" color="primary" fullWidth>Schedule</SubmitButton>

        </React.Fragment>
      )}
    </StyledCard>
  );
};

export default ScheduleMeetingCard;