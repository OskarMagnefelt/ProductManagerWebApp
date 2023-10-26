import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import jwtDecode from "jwt-decode";

const Item = ({ title, to, icon, selected, setSelected }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

interface SideBarProps {
  setAuthenticationStatus: (status: boolean) => void;
  // userRole: string;
}

const Sidebar = ({ setAuthenticationStatus }: SideBarProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("MainView");
  const [decodedToken, setDecodedToken] = useState<any | null>(null);

  const handleSignOut = () => {
    setAuthenticationStatus(false);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setDecodedToken(decodedToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Product Manager
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
            </Box>
          )}
          {decodedToken && decodedToken.role === "Admin" ? (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="List products"
                to="/"
                icon={<FormatListBulletedOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Add new product"
                to="/addproduct"
                icon={<AddCircleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Add new category"
                to="/addcategory"
                icon={<AddCircleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Add product to category"
                to="/addproducttocategory"
                icon={<ControlPointDuplicateOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="List categories"
                to="/listcategories"
                icon={<FormatListBulletedOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <MenuItem
                // active={selected === title}
                style={{
                  color: colors.grey[100],
                }}
                onClick={handleSignOut}
                icon={<PersonOutlinedIcon />}
              >
                <Typography>Sign out</Typography>
                <Link to={"/"} />
              </MenuItem>
            </Box>
          ) : (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="List products"
                to="/"
                icon={<FormatListBulletedOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="List categories"
                to="/listcategories"
                icon={<FormatListBulletedOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
