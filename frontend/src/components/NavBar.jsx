import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import { Typography } from "@mui/material";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { auth } = useAuth();
  const username = auth.username;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="flex justify-end items-center m-7">
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography
          sx={{
            minWidth: 80,
            fontSize: "20px",
            fontFamily: "Cairo, sans-serif",
            color: '#022B3A',
            margin: '0 10px'
          }}
        >
          {username || "Not logged in"}
        </Typography>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 45, height: 45 }}>
            <UserRound color="#ffffff" />
          </Avatar>
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 22,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={"/account"}>
          <MenuItem onClick={handleClose}>
            <Avatar /> My Account
          </MenuItem>
        </Link>
        <Divider />
        <Link to={"/settings"}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
        {/* <Link to={"/"}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Se déconnecter
          </MenuItem>
        </Link> */}
      </Menu>
    </nav>
  );
};

export default NavBar;
