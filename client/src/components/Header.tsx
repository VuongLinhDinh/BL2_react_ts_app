import React, { useState } from "react";
import {
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Menu,
  MenuItem,
  TextField,
  Drawer,
  Badge,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import { Link } from "react-router-dom";
import CartTemp from "./CartTemp";
import { useCart } from "src/hooks/useCart";
import { useAuth } from "src/contexts/AuthContext";

const menus = [
  { label: "Home", link: "/home" },
  { label: "Shop", link: "/product" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" }
];

function Header() {
  const { getCartItemCount } = useCart();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const [openSearch, setOpenSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLImageElement) | null
  >(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpenCart, setDrawerOpenCart] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenSearch = () => {
    setOpenSearch(true);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };
  const handleDrawerOpenCart = () => {
    setDrawerOpenCart(true);
  };

  const handleDrawerCloseCart = () => {
    setDrawerOpenCart(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"0 30px"}
    >
      <Box>
        <img src="./nike.png" alt="logo" style={{ width: "90px" }} />
      </Box>
      {isMobile ? (
        <IconButton onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
      ) : (
        <Stack direction={"row"} alignItems={"center"} gap={"50px"}>
          {menus.map((menu, index) => (
            <Link key={index} to={menu.link}>
              <Typography
                key={index}
                sx={{
                  color: "black",
                  fontSize: "18px",
                  fontWeight: "600",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    bottom: "-2px",
                    left: "0",
                    backgroundColor: "black",
                    transition: "width 0.3s ease-in-out"
                  },
                  "&:hover::after": {
                    width: "100%"
                  }
                }}
              >
                {menu.label}
              </Typography>
            </Link>
          ))}
        </Stack>
      )}
      {user ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="start"
          gap="20px"
          padding="5px 10px"
          lineHeight="25px"
        >
          <img
            src="/user.svg"
            alt="user"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
            onClick={handleMenuClick}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>hi, {user.email}</MenuItem>
            <MenuItem>
              <AccountCircleIcon sx={{ marginRight: "2px" }} /> Edit Profile
            </MenuItem>
            <Link
              to="/history"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "black"
              }}
            >
              <MenuItem>
                <HistoryIcon sx={{ marginRight: "2px" }} /> History Order
              </MenuItem>
            </Link>
          </Menu>
          <img
            src="/search.svg"
            alt="search"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
            onClick={handleClickOpenSearch}
          />
          <Link to="/wishlist">
            <img
              src="/heart.svg"
              alt="heart"
              style={{
                width: "25px",
                height: "25px",
                lineHeight: "25px",
                marginTop: "5px"
              }}
            />
          </Link>
          <Badge badgeContent={getCartItemCount()} color="secondary">
            <img
              src="/cart.svg"
              alt="cart"
              style={{ width: "25px", height: "25px", cursor: "pointer" }}
              onClick={handleDrawerOpenCart}
            />
          </Badge>
          <img
            onClick={handleClickOpen}
            src="/logout.svg"
            alt="logout"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
        </Stack>
      ) : (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
          gap={"20px"}
          sx={{ color: "white", padding: "5px 10px" }}
        >
          <Box
            borderRadius={10}
            bgcolor={"#000000cf"}
            padding={"5px 20px"}
            color={"#fff"}
          >
            <Link to="/login" style={{ color: "#fff" }}>
              Login
            </Link>
          </Box>
          <Box
            borderRadius={10}
            bgcolor={"#000000cf"}
            padding={"5px 20px"}
            color={"#fff"}
          >
            <Link to="/register" style={{ color: "#fff" }}>
              Register
            </Link>
          </Box>
        </Stack>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={logout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSearch}
        onClose={handleCloseSearch}
        aria-labelledby="search-dialog-title"
        aria-describedby="search-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="search-dialog-title">{"Search"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="search"
            label="Search"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSearch} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseSearch} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer
        anchor="right"
        open={drawerOpenCart}
        onClose={handleDrawerCloseCart}
      >
        <Box sx={{ width: 350, padding: 2 }} role="presentation">
          <CartTemp close={handleDrawerCloseCart} />
        </Box>
      </Drawer>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 250, padding: 2 }} role="presentation">
          <Stack direction={"column"} gap={2}>
            {menus.map((menu, index) => (
              <Link key={index} to={menu.link}>
                <Typography key={index} sx={{ color: "black" }}>
                  {menu.label}
                </Typography>
              </Link>
            ))}
            {user ? (
              <Stack direction={"column"} gap={1}>
                <Typography>Hi, {user.email}</Typography>
                <Stack direction={"column"} gap={1}>
                  <MenuItem sx={{ fontSize: "15px" }}>Edit Profile</MenuItem>
                  <MenuItem sx={{ fontSize: "15px" }}>
                    <Link style={{ color: "#000" }} to={"/history"}>
                      Hítory Order
                    </Link>{" "}
                  </MenuItem>
                </Stack>
              </Stack>
            ) : (
              <Stack gap={2}>
                <Box
                  borderRadius={10}
                  bgcolor={"#000000cf"}
                  padding={"5px 20px"}
                  color={"#fff"}
                >
                  <Link to="/login" style={{ color: "#fff" }}>
                    Login
                  </Link>
                </Box>
                <Box
                  borderRadius={10}
                  bgcolor={"#000000cf"}
                  padding={"5px 20px"}
                  color={"#fff"}
                >
                  <Link to="/register" style={{ color: "#fff" }}>
                    Register
                  </Link>
                </Box>
              </Stack>
            )}
          </Stack>
        </Box>
      </Drawer>
    </Stack>
  );
}

export default Header;
