import React from 'react';

import { makeStyles } from '../utils/Theme';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  submitButton: {
    marginTop: '1rem',
  },
});

interface Props {
  onSubmit: (email: string, name: string) => void;
}

const MeetingContactForm: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<boolean>(false);

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      return;
    }

    props.onSubmit(email, name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="name"
        label="Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
        fullWidth
        autoFocus
        margin="dense"
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        required
        error={emailError}
        helperText={emailError && "Please enter a valid email"}
        onChange={handleEmailChange}
        fullWidth
        margin="dense"
      />
      <Button
        className={classes.submitButton}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Schedule
      </Button>
    </form>
  );
}

export default MeetingContactForm;