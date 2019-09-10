import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/Reply';
import LinkedInIcon from '../icons/LinkedInIcon';
import GithubIcon from '../icons/GithubIcon';
import TwitterIcon from '../icons/TwitterIcon';
import CoffeeIcon from '../icons/CoffeeIcon';

import BackgroundImage from '../images/snow-me-small.jpg';
import ScheduleMeetingModal from './ScheduleMeetingModal';

const BCContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
  background-image: url(${BackgroundImage});
  background-size: cover;
`;

const FlipCardButton = styled(Button)`
 && {
    position: absolute;
    right: -34px;
    top: -6px;
    transform: rotate(45deg);
    height: 48px;
    width: 100px;
  }
`;

const ConnectButton = styled(Button)`
  svg {
    margin-right: 8px;
  }
`;

const HiddenImage = styled.img`
  display: none;
`;

const RotatedBackIcon = styled(BackIcon)`
  transform: rotateY(180deg) rotate(90deg);
  color: white;
`;

interface Props {
  flipCard: () => void;
}

const BusinessCardBack: React.FC<Props> = (props) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <BCContainer>
      <FlipCardButton onClick={props.flipCard}>
        <RotatedBackIcon />
      </FlipCardButton>
      <ConnectButton color="primary" variant="contained">
        <LinkedInIcon /> Connect on LinkedIn
      </ConnectButton>
      <ConnectButton color="primary" variant="contained">
        <GithubIcon /> See my Code
      </ConnectButton>
      <ConnectButton color="primary" variant="contained">
        <TwitterIcon /> Tweet at Me
      </ConnectButton>
      <ConnectButton color="primary" variant="contained" onClick={() => setModalOpen(true)}>
        <CoffeeIcon /> Meet with Me
      </ConnectButton>

      <ScheduleMeetingModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <HiddenImage src={BackgroundImage} />
    </BCContainer>
  );
};

export default BusinessCardBack;