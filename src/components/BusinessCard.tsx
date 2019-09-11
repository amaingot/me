import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import BusinessCardFront from './BusinessCardFront';
import BusinessCardBack from './BusinessCardBack';

const CardContainer = styled.div`
  width: 40rem;
  height: 23rem;
  position: relative;
  background-color: transparent;
  perspective: 1000px;

  @media screen and (max-width: 40rem) {
    width: 100vw;
    height: 100vh;
  }
`;

const FlippingCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  &.showBack {
    transform: rotateY(180deg);
  }
`;

const CardSide = styled(Paper)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: white;
  opacity: 1;
  overflow: hidden;

  .showBack > &.front {
    transition: opacity 0.4s;
    transition-delay: 0.4s;
    opacity: 0;
  }

  &.back {
    transform: rotateY(180deg);
  }
`;


const BusinessCard: React.FC = () => {
  const [showBack, setShowBack] = React.useState(false);

  const flipCard = () => setShowBack(!showBack);

  return (
    <CardContainer>
      <FlippingCard className={showBack ? "showBack" : ""}>
        <CardSide className="front" elevation={24}>
          <BusinessCardFront flipCard={flipCard} />
        </CardSide>
        <CardSide className="back" elevation={24}>
          <BusinessCardBack flipCard={flipCard} />
        </CardSide>
      </FlippingCard>
    </CardContainer>
  );
};

export default BusinessCard;