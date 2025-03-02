import React from "react";

import BusinessCardFront from "./BusinessCardFront";
import BusinessCardBack from "./BusinessCardBack";
import { Box, Paper } from "@mantine/core";

const BusinessCard: React.FC = () => {
  const [showBack, setShowBack] = React.useState(false);

  const flipCard = () => {
    setShowBack((v) => !v);
  };

  return (
    <Box
      style={{
        width: "40rem",
        height: "23rem",
        position: "relative",
        backgroundColor: "transparent",
        perspective: "1000px",
      }}
    >
      <Box
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.8s",
          transformStyle: "preserve-3d",
          transform: showBack ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <Paper
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "white",
            overflow: "hidden",
            transition: showBack ? "opacity 0.4s" : "all 0.4s ease",
            transitionDelay: showBack ? "0.4s" : undefined,
            opacity: showBack ? 0 : 1,
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            borderRadius: "4px",
            transform: "translateY(-5px)",
          }}
        >
          <BusinessCardFront flipCard={flipCard} />
        </Paper>
        <Paper
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "white",
            overflow: "hidden",
            opacity: 1,
            transform: "rotateY(180deg) translateY(-5px)",
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            transition: "all 0.4s ease",
            borderRadius: "4px",
          }}
        >
          <BusinessCardBack flipCard={flipCard} />
        </Paper>
      </Box>
    </Box>
  );
};

export default BusinessCard;
