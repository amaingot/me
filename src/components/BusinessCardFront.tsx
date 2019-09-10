import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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
`;

interface Props {
  flipCard: () => void;
}

const BusinessCardFront: React.FC<Props> = (props) => {

  return (
    <BCContainer>
      <div>
        <Typography variant="h4">Alex Maingot</Typography>
        <Typography variant="subtitle2">Software Developer, <Link href="https://scalefactor.com/" target="_blank">ScaleFactor</Link></Typography>
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