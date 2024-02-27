import React from "react";

import LogoIcon from "./svg/LogoIcon";
import BusinessCard from "./components/BusinessCard";
import { Box, useMantineTheme } from "@mantine/core";

const App: React.FC = () => {
  const theme = useMantineTheme();
  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.blue[9],
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
