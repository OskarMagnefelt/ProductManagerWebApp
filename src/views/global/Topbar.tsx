import React, { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import jwtDecode from "jwt-decode";

const Topbar = ({ onSearch }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = React.useContext(ColorModeContext);
  const [searchValue, setSearchValue] = useState("");
  const [decodedToken, setDecodedToken] = useState<any | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setDecodedToken(decodedToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    if (searchValue === "") return;
    onSearch(searchValue);
    setSearchValue("");
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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
          onKeyDown={handleKeyDown}
        />
        <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="space-between">
        {decodedToken && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: colors.greenAccent[300],
            }}
          >
            {`Signed in as ${decodedToken.given_name} ${decodedToken.family_name}`}
          </div>
        )}

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
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
