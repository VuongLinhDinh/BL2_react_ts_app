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
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const menus = [
  { label: "Home", link: "/" },
  { label: "Shop", link: "/product" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" }
];

function Header() {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false); // Thêm trạng thái cho hộp tìm kiếm
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLImageElement) | null
  >(null);
  const isLogin = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

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

  const handleMenuClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        gap={1}
      >
        <img src="./logo.svg" alt="logo" />
        <Box fontSize={34} fontWeight={600}>
          Furniro
        </Box>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        gap={"50px"}
        height={"100px"}
      >
        {menus.map((menu, index) => (
          <Link key={index} to={menu.link}>
            <Typography key={index} sx={{ color: "black" }}>
              {menu.label}
            </Typography>
          </Link>
        ))}
      </Stack>
      {isLogin ? (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
          gap={"20px"}
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
            <MenuItem>Edit Profile</MenuItem>
          </Menu>
          <img
            src="/search.svg"
            alt="search"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
            onClick={handleClickOpenSearch} // Thêm sự kiện onClick để mở hộp tìm kiếm
          />
          <img
            src="/heart.svg"
            alt="heart"
            style={{ width: "25px", height: "25px" }}
          />
          <img
            src="/cart.svg"
            alt="cart"
            style={{ width: "25px", height: "25px" }}
          />
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
          <Button onClick={handleLogout} color="primary" autoFocus>
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
    </Stack>
  );
}

export default Header;
