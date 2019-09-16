import React from 'react';
import axios from 'axios';
import moment, { Moment } from 'moment-timezone';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { DatePicker, Day } from '@material-ui/pickers';

import { AvalibilityResponse, TimeSlot } from '../types/APIResponses';
import getApiHost from '../utils/getApiHost';

const useStyles = makeStyles({
  button: {
    marginTop: '1rem',
  }
});

const Durations = {
  '15m': "15 minutes",
  '30m': '30 minutes',
  '1hr': '1 hour',
};

type DurationTypes = keyof typeof Durations;

interface Props {
  onSubmit: (time: Moment, duration: string) => void;
  onFinishedFirstLoad: () => void;
  onError: () => void;
}

const MeetingTimeForm: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [slotData, setSlotData] = React.useState<AvalibilityResponse>();

  const [selectedDuration, setDuration] = React.useState<DurationTypes>('15m');
  const [currentMonth, setCurrentMonth] = React.useState<Moment>(moment());
  const [selectedDate, setSelectedDate] = React.useState<Moment>(moment().add(1, 'day'));
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);

  const [availableSpots, setAvailableSpots] = React.useState<TimeSlot[]>([]);

  React.useEffect(() => {
    const dayOptions = (slotData ? slotData.days || [] : []).find(d => d.date === (selectedDate && selectedDate.format('YYYY-MM-DD')));
    const spots = dayOptions ? dayOptions.spots : [];
    setAvailableSpots(spots || []);
  }, [slotData, selectedDate]);

  const handleDateChange = (date: Moment | null) => {
    if (date !== null) {
      setSelectedDate(date);
      setSelectedSlot(null);
    }
  };

  const onMonthChange = async (date: Moment | null) => {
    if (date) {
      if (date.isBefore(moment())) {
        setCurrentMonth(moment());
        await loadData(moment(), selectedDuration);
      } else {
        setCurrentMonth(date);
        await loadData(date.date(1), selectedDuration);
      }
    }
  };

  const onDurationChange = (e: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    setDuration(e.target.value as DurationTypes);
    setSelectedSlot(null);
    loadData(currentMonth.date(1), e.target.value as string);
  };

  const loadData = (date: Moment, dur: string) =>
    axios.get<AvalibilityResponse>(`${getApiHost()}/meeting/${dur}/availability`, {
      params: {
        tz: moment.tz.guess(),
        date: date.format('YYYY-MM-DD'),
      }
    })
      .then(resp => {
        if (resp.status >= 400) props.onError();
        setSlotData(resp.data);
        return resp.data;
      });

  const submit = () => {
    if (selectedSlot && moment(selectedSlot).isValid()) {
      props.onSubmit(moment(selectedSlot), selectedDuration);
    }
  }

  React.useEffect(() => {
    loadData(moment(), '15m')
      .then(({ days }) => {
        if (!days) return;
        const earliestAvailableDay = days.find(d => d.status === 'available');
        if (earliestAvailableDay) {
          setSelectedDate(moment(earliestAvailableDay.date));
        }
      })
      .then(props.onFinishedFirstLoad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={submit}>
      <FormControl fullWidth>
        <InputLabel htmlFor="selectedDuration">Duration</InputLabel>
        <Select
          value={selectedDuration}
          onChange={onDurationChange}
          inputProps={{
            name: 'selectedDuration',
            id: 'selectedDuration',
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
          autoOk
          variant="inline"
          format="MM-DD-YY"
          margin="normal"
          label="Date"
          disabled={slotData === undefined}
          value={selectedDate}
          onChange={handleDateChange}
          onMonthChange={onMonthChange}
          shouldDisableDate={(day) => {
            if (!slotData || !slotData.days || !slotData.days.length) return false;
            const dayData = slotData.days.find(d => d.date === day!.format('YYYY-MM-DD'));
            const unavailable = dayData === undefined || dayData.status === 'unavailable';
            const isInPast = !!day && day.isBefore(moment());

            return unavailable || isInPast;
          }}
          renderDay={(day, selectedDate) => {
            let disabled = !!day && day.isBefore(moment());
            const isSelected = (selectedDate && day && selectedDate.isSame(day)) || false;

            if (slotData && slotData.days && slotData.days.length) {
              const dayData = slotData.days.find(d => d.date === day!.format('YYYY-MM-DD'));
              disabled = (dayData === undefined || dayData.status === 'unavailable') ? true : disabled;
            }

            return <Day selected={isSelected} disabled={disabled}>{day!.format('D')}</Day>;
          }}
        />
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel htmlFor="time">Time</InputLabel>
        <Select
          value={selectedSlot || ""}
          onChange={e => setSelectedSlot(e.target.value as string)}
          inputProps={{
            name: 'selectedSlot',
            id: 'selectedSlot',
          }}
        >
          {availableSpots.map(s =>
            <MenuItem
              key={s.start_time}
              value={s.start_time}
            >
              {moment(s.start_time).format('h:mm')} {s.meridiem}
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <Button
        className={classes.button}
        type="submit"
        disabled={!selectedSlot}
        variant="contained"
        color="primary"
        fullWidth
      >
        Select Time
      </Button>
    </form>
  );
};

export default MeetingTimeForm;