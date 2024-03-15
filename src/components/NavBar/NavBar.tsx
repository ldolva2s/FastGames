import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const routeChange = (route: string) => {
    navigate(route);
  };
  const settings = [
    {
      label: "Home",
      route: "/",
      icon: (
        <HomeIcon fontSize="small" sx={{ marginRight: 2 }} color="secondary" />
      ),
    },
    {
      label: "Add game",
      route: "/addgame",
      icon: (
        <PostAddIcon
          fontSize="small"
          sx={{ marginRight: 2 }}
          color="secondary"
        />
      ),
    },
    {
      label: "Add player",
      route: "addplayer",
      icon: (
        <PersonAddIcon
          fontSize="small"
          sx={{ marginRight: 2 }}
          color="secondary"
        />
      ),
    },
    {
      label: "Leaderboard",
      route: "leaderboard",
      icon: (
        <EmojiEventsIcon
          fontSize="small"
          sx={{ marginRight: 2 }}
          color="secondary"
        />
      ),
    },
    {
      label: "Settings",
      route: "settings",
      icon: (
        <SettingsIcon
          fontSize="small"
          sx={{ marginRight: 2 }}
          color="secondary"
        />
      ),
    },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleRouteChange = (route: string) => {
    routeChange(route);
    handleCloseUserMenu();
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" sx={{ mr: 2 }}>
            <SportsTennisIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            Fast Games
          </Typography>
          <IconButton sx={{ marginRight: 3, color: "white" }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton
            sx={{}}
            onClick={handleOpenUserMenu}
            size="large"
            edge="start"
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting.label}
                onClick={() => handleRouteChange(setting.route)}
              >
                {setting.icon}
                <Typography textAlign="center">{setting.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
