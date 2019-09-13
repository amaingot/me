import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/Reply';

import LinkedInIcon from '../icons/LinkedInIcon';
import GithubIcon from '../icons/GithubIcon';
import TwitterIcon from '../icons/TwitterIcon';
import CoffeeIcon from '../icons/CoffeeIcon';

import BackgroundImage from '../images/snow-me-small.jpg';
import ScheduleMeetingCard from './ScheduleMeetingCard';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    overflow: 'hidden',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
  },
  flipCardButton: {
    position: 'absolute',
    right: '-34px',
    top: '-6px',
    transform: 'rotate(45deg)',
    height: '48px',
    width: '100px',
  },
  icon: {
    marginRight: '8px',
  },
  hiddenImage: {
    display: 'none',
  },
  roatatedBlackButton: {
    transform: 'rotateY(180deg) rotate(90deg)',
    color: 'white',
  },
});

interface Props {
  flipCard: () => void;
}

const BusinessCardBack: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [showSchedule, setShowSchedule] = React.useState(false);

  const flipCard = () => {
    setShowSchedule(false);
    props.flipCard();
  };

  return (
    <div className={classes.container}>
      <Button className={classes.flipCardButton} onClick={flipCard}>
        <BackIcon className={classes.roatatedBlackButton} />
      </Button>
      <Button href="https://www.linkedin.com/in/alexmaingot" color="primary" variant="contained">
        <LinkedInIcon className={classes.icon} /> Connect on LinkedIn
      </Button>
      <Button href="https://github.com/amaingot" color="primary" variant="contained">
        <GithubIcon className={classes.icon} /> See my Code
      </Button>
      <Button href="https://twitter.com/alexmaingot" color="primary" variant="contained">
        <TwitterIcon className={classes.icon} /> Tweet at Me
      </Button>
      <Button color={showSchedule ? 'secondary' : 'primary'} variant="contained" onClick={() => setShowSchedule(!showSchedule)}>
        <CoffeeIcon className={classes.icon} />{showSchedule && "Or Don't "}Meet with Me
      </Button>
      <img className={classes.hiddenImage} src={BackgroundImage} alt="hidden" />
      <ScheduleMeetingCard show={showSchedule} />
    </div>
  );
};

export default BusinessCardBack;