import React from "react";
import { Box, Button, Group, Text } from "@mantine/core";
import {
  IconArrowBack,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

interface Props {
  flipCard: () => void;
}

const socialLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 20px",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "2px",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.5px",
  textDecoration: "none",
  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  backgroundColor: "transparent",
  height: "auto",
};

const BusinessCardBack: React.FC<Props> = (props) => {
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#1a1a1a",
      }}
    >
      {/* Top accent line */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "#e63946",
        }}
      />

      {/* Header */}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <Text
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-1px",
            }}
          >
            Let's connect.
          </Text>
          <Text
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginTop: "6px",
            }}
          >
            Find me on these platforms
          </Text>
        </div>
        <Box
          component="button"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            props.flipCard();
          }}
          style={{
            width: "36px",
            height: "36px",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.5)",
            background: "transparent",
            transition: "all 0.3s ease",
            padding: 0,
          }}
        >
          <IconArrowBack size={18} />
        </Box>
      </Box>

      {/* Social links */}
      <Group>
        <Button
          component="a"
          href="https://www.linkedin.com/in/alexmaingot"
          target="_blank"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          leftSection={<IconBrandLinkedin size={16} style={{ opacity: 0.7 }} />}
          styles={{
            root: {
              ...socialLinkStyle,
              "&:hover": {
                borderColor: "#e63946",
                backgroundColor: "rgba(230, 57, 70, 0.1)",
                transform: "translateY(-2px)",
              },
            },
          }}
        >
          Connect on LinkedIn
        </Button>
        <Button
          component="a"
          href="https://github.com/amaingot"
          target="_blank"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          leftSection={<IconBrandGithub size={16} style={{ opacity: 0.7 }} />}
          styles={{
            root: {
              ...socialLinkStyle,
              "&:hover": {
                borderColor: "#e63946",
                backgroundColor: "rgba(230, 57, 70, 0.1)",
                transform: "translateY(-2px)",
              },
            },
          }}
        >
          See my GitHub
        </Button>
        <Button
          component="a"
          href="https://twitter.com/alexmaingot"
          target="_blank"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          leftSection={<IconBrandX size={16} style={{ opacity: 0.7 }} />}
          styles={{
            root: {
              ...socialLinkStyle,
              "&:hover": {
                borderColor: "#e63946",
                backgroundColor: "rgba(230, 57, 70, 0.1)",
                transform: "translateY(-2px)",
              },
            },
          }}
        >
          Follow on X
        </Button>
      </Group>
    </Box>
  );
};

export default BusinessCardBack;
