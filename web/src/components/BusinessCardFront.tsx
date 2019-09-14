import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import headshot from '../images/headshot-small.jpg';

const BCContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-image: url(${headshot});
  background-position: right bottom;
  background-size: auto 80%;
  background-repeat: no-repeat;

  @media screen and (max-width: 40rem) {
    background-size: 80% auto;
    padding: 2rem;
  }

  @media screen and (max-height: 20rem) {
    background-size: auto 80%;
    padding: 1rem;
  }
`;

interface Props {
  flipCard: () => void;
}

const BusinessCardFront: React.FC<Props> = (props) => {

  return (
    <BCContainer>
      <div>
        <Typography variant="h4">Alex Maingot</Typography>
        <Typography variant="subtitle2">Software Engineer</Typography>
        <Typography variant="subtitle1">Austin, Texas</Typography>
      </div>
      <div>
        <Button onClick={props.flipCard} color="primary" variant="contained">
          Connect
        </Button>
      </div>
    </BCContainer>
  );
};

export default BusinessCardFront;