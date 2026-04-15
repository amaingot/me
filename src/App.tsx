import React from "react";

import BusinessCard from "./components/BusinessCard";
import { Box, Text } from "@mantine/core";

const App: React.FC = () => {
  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f7f5",
        backgroundImage:
          "radial-gradient(circle, #d0ccc6 0.8px, transparent 0.8px)",
        backgroundSize: "24px 24px",
        position: "relative",
      }}
    >
      <Text
        component="span"
        style={{
          position: "absolute",
          left: "2rem",
          top: "2rem",
          fontSize: "14px",
          fontWeight: 900,
          color: "#1a1a1a",
          letterSpacing: "2px",
          animation: "logoEntrance 0.6s ease 0.3s both",
        }}
      >
        AM<span style={{ color: "#e63946" }}>.</span>
      </Text>
      <BusinessCard />
    </Box>
  );
};

export default App;
