import React from "react";
import { Box, Button, Text } from "@mantine/core";

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
        display: "flex",
        position: "relative",
      }}
    >
      {/* Type side */}
      <Box
        style={{
          flex: 1,
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Text
            style={{
              fontSize: "52px",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-2.5px",
              color: "#1a1a1a",
            }}
          >
            Alex
            <br />
            Maingot
          </Text>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            <Box
              style={{
                width: "32px",
                height: "3.5px",
                background: "#e63946",
                borderRadius: "1px",
              }}
            />
            <Text
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#666",
                textTransform: "uppercase",
                letterSpacing: "2.5px",
              }}
            >
              Engineering Leader
            </Text>
          </Box>
          <Text
            style={{
              fontSize: "11px",
              color: "#999",
              letterSpacing: "1px",
              marginTop: "6px",
              paddingLeft: "44px",
            }}
          >
            Austin, Texas
          </Text>
        </div>
        <div>
          <Button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              props.flipCard();
            }}
            styles={{
              root: {
                backgroundColor: "#1a1a1a",
                color: "#fff",
                borderRadius: "2px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "10px 24px",
                height: "auto",
                transition:
                  "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                "&:hover": {
                  backgroundColor: "#e63946",
                  transform: "translateY(-1px)",
                },
              },
            }}
          >
            Connect <span style={{ marginLeft: "4px" }}>&rarr;</span>
          </Button>
        </div>
      </Box>

      {/* Photo side */}
      <Box
        style={{
          width: "45%",
          backgroundImage: `url(${headshot})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Bottom rule */}
      <Box
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "#1a1a1a",
        }}
      />
    </Box>
  );
};

export default BusinessCardFront;
