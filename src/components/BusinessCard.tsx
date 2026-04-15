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
        width: "680px",
        maxWidth: "90vw",
        height: "380px",
        position: "relative",
        backgroundColor: "transparent",
        perspective: "1200px",
        cursor: "pointer",
        animation: "cardEntrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
      onClick={flipCard}
    >
      <Box
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transformStyle: "preserve-3d",
          transform: showBack ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        className={showBack ? undefined : "card-hover"}
      >
        <Paper
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "#ffffff",
            overflow: "hidden",
            transition: showBack ? "opacity 0.4s" : "all 0.4s ease",
            transitionDelay: showBack ? "0.4s" : undefined,
            opacity: showBack ? 0 : 1,
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.06), 0 32px 64px rgba(0,0,0,0.04)",
            borderRadius: "2px",
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
            backgroundColor: "#1a1a1a",
            overflow: "hidden",
            opacity: 1,
            transform: "rotateY(180deg)",
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.06), 0 32px 64px rgba(0,0,0,0.04)",
            borderRadius: "2px",
          }}
        >
          <BusinessCardBack flipCard={flipCard} />
        </Paper>
      </Box>
    </Box>
  );
};

export default BusinessCard;
