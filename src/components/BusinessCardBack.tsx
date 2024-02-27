import React from "react";
import { ActionIcon, Box, Button, Group } from "@mantine/core";
import {
  IconArrowBack,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

import BackgroundImage from "../assets/snow-me-small.jpg";

interface Props {
  flipCard: () => void;
}

const BusinessCardBack: React.FC<Props> = (props) => {
  const flipCard = () => {
    props.flipCard();
  };

  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        padding: "3rem",
        display: "flex",
        flexDirection: "column-reverse",
        justifyContent: "space-between",
        alignItems: "flex-start",
        overflow: "hidden",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <ActionIcon
        style={{ position: "absolute", right: "1rem", top: "1rem" }}
        onClick={flipCard}
        value="filled"
        color="blue"
      >
        <IconArrowBack color="white" />
      </ActionIcon>
      <Group >
        <Button
          component="a"
          href="https://www.linkedin.com/in/alexmaingot"
          target="_blank"
          color="primary"
          variant="contained"
          leftSection={<IconBrandLinkedin style={{ color: "white" }} />}
        >
          Connect on LinkedIn
        </Button>
        <Button
          component="a"
          href="https://github.com/amaingot"
          target="_blank"
          color="primary"
          variant="contained"
          leftSection={<IconBrandGithub style={{ color: "white" }} />}
        >
          See my GitHub
        </Button>
        <Button
          component="a"
          href="https://twitter.com/alexmaingot"
          target="_blank"
          color="primary"
          variant="contained"
          leftSection={<IconBrandX style={{ color: "white" }} />}
        >
          Follow on X
        </Button>
      </Group>
    </Box>
  );
};

export default BusinessCardBack;
