import { Box, Typography } from "@mui/material";
import MainMenuOption from "./components/MainMenuOption";

const MainView = () => {
  return (
    <Box
      sx={{
        width: 500,
        backgroundColor: "lightgrey",
        mx: "auto",
        mb: 6,
        mt: 6,
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        borderRadius: 1,
      }}
    >
      <Typography
        sx={{
          mx: "auto",
          pt: 3,
          pb: 3,
          fontSize: 50,
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
        }}
        variant="h1"
      >
        Product Manager
      </Typography>

      <MainMenuOption text="Ny produkt"></MainMenuOption>
      <MainMenuOption text="Sök produkt"></MainMenuOption>
      <MainMenuOption text="Ny kategori"></MainMenuOption>
      <MainMenuOption text="Avsluta"></MainMenuOption>
    </Box>
  );
};

export default MainView;
