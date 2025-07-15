import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/logoGameScript.png";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Divider,
  Container,
} from "@mui/material";

import { AccountCircle } from "@mui/icons-material";

import { CartWidget, SessionButton, NotificationsWidget } from "../";
import Searchbar from "./Searchbar";
import Sidebar from "../Sidebar/Sidebar";

const styles = {
  brand: {
    width: 200,
    height: "auto",
  },
  link: {
    textDecoration: "none",
  },
};

const Navbar = () => {
  const [input, setInput] = React.useState("");
  const { status } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { pathname } = useLocation();

  if (pathname === "/") return <></>;

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to={`/account/profile`}
      >
        My account
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "background.paper", color: "text.primary" }}
    >
      <Container maxWidth="lg" sx={{ marginX: "auto" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Sidebar />
            <Link className={styles.link} to="/home">
              <img style={styles.brand} src={logo} alt="logo" />
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Searchbar setInput={setInput} input={input} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CartWidget />
            {status !== "guest" && (
              <>
                <NotificationsWidget />
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            )}
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ marginX: 2, display: { xs: "none", md: "block" } }}
            />
            <Box display={{ xs: "none", md: "block" }}>
              <SessionButton />
            </Box>
          </Box>
        </Toolbar>
      </Container>
      {renderMenu}
    </AppBar>
  );
};

export default Navbar;
