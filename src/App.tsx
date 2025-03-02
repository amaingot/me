import React from "react";

import LogoIcon from "./svg/LogoIcon";
import BusinessCard from "./components/BusinessCard";
import { Box } from "@mantine/core";

const App: React.FC = () => {
  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        position: "relative",
      }}
    >
      <LogoIcon
        style={{
          color: "white",
          position: "absolute",
          left: "2rem",
          top: "2rem",
          height: "4rem",
          width: "4rem",
        }}
      />
      <BusinessCard />
    </Box>
  );
};

export default App;
