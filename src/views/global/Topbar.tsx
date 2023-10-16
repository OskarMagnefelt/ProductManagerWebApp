import React, { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = ({ onSearch }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = React.useContext(ColorModeContext);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    // Call the onSearch function and pass the searchValue as a parameter
    onSearch(searchValue);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        style={{ backgroundColor: colors.primary[400] }}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search product by SKU"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton
          onClick={() => {
            console.log("Button clicked");
            colorMode.toggleColorMode();
          }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
