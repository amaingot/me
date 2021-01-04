import React, { MouseEventHandler } from 'react';
import ReactGA from 'react-ga';
import { makeStyles } from '../utils/Theme';
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

  React.useEffect(() => {
    const img = new Image();
    img.src = BackgroundImage;
  }, []);

  const socialClick = (url: string, name: string): MouseEventHandler => (e) => {
    ReactGA.event({
      category: 'Social',
      action: `Clicked ${name} Button`,
    });
    window.open(url, '_blank');
  };

  // const meetingClick: MouseEventHandler = () => {
  //   ReactGA.event({
  //     category: 'Meeting',
  //     action: `${showSchedule ? 'Closed' : 'Opened'} Meeting Card`,
  //   });
  //   setShowSchedule(v => !v);
  // };

  return (
    <div className={classes.container}>
      <Button className={classes.flipCardButton} onClick={flipCard}>
        <BackIcon className={classes.roatatedBlackButton} />
      </Button>
      <Button onClick={socialClick('https://www.linkedin.com/in/alexmaingot', 'LinkedIn')} color="primary" variant="contained">
        <LinkedInIcon className={classes.icon} /> Connect on LinkedIn
      </Button>
      <Button onClick={socialClick('https://github.com/amaingot', 'Github')} color="primary" variant="contained">
        <GithubIcon className={classes.icon} /> See my Code
      </Button>
      <Button onClick={socialClick('https://twitter.com/alexmaingot', 'Twitter')} color="primary" variant="contained">
        <TwitterIcon className={classes.icon} /> Tweet at Me
      </Button>
      {/* <Button color={showSchedule ? 'secondary' : 'primary'} variant="contained" onClick={meetingClick}>
        <CoffeeIcon className={classes.icon} />{showSchedule && "Or Don't "}Meet with Me
      </Button> */}
      <ScheduleMeetingCard show={showSchedule} />
    </div>
  );
};

export default BusinessCardBack;