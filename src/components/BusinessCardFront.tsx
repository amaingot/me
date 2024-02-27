import React from "react";
import { BackgroundImage, Box, Button, Text, Title } from "@mantine/core";

import headshot from "../assets/headshot-small.jpg";

interface Props {
  flipCard: () => void;
}

const BusinessCardFront: React.FC<Props> = (props) => {
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundPosition: "right bottom",
        backgroundSize: "auto 80%",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${headshot})`,
      }}
    >
      <BackgroundImage src={headshot} />
      <div>
        <Title>Alex Maingot</Title>
        <Text>Engineering Leader</Text>
        <Text>Austin, Texas</Text>
      </div>
      <div>
        <Button onClick={props.flipCard} color="primary" variant="contained">
          Connect
        </Button>
      </div>
    </Box>
  );
};

export default BusinessCardFront;
