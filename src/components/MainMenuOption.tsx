import { Chip } from "@mui/material";
import React from "react";

interface MainMenuOptionProps {
  text: string;
}

const MainMenuOption = ({ text }: MainMenuOptionProps) => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Chip
        label={text}
        onClick={handleClick}
        sx={{
          pt: 3,
          pb: 3,
          fontSize: 30,
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
        }}
      />
    </div>
  );
};

export default MainMenuOption;
