import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import AppsIcon from "@mui/icons-material/Apps";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const ListNavigate = [
    { text: "Dashboard", link: "/admin" },
    { text: "Categories", link: "/admin/category/list" },
    { text: "Products", link: "/admin/product/list" },
    { text: "Message", link: "/admin/message" },
    { text: "All Mail", link: "/admin/allmail" },
    { text: "Trash", link: "/admin/trash" },
    { text: "Spam", link: "/admin/spam" }
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {ListNavigate.slice(0, 4).map(({ text, link }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={link}>
              <ListItemIcon>
                {index === 0 ? (
                  <DashboardIcon />
                ) : index === 1 ? (
                  <CategoryIcon />
                ) : index === 2 ? (
                  <ProductionQuantityLimitsIcon />
                ) : (
                  <SendIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {ListNavigate.slice(4).map(({ text, link }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={link}>
              <ListItemIcon>
                {index === 0 ? (
                  <AccountCircleIcon />
                ) : index === 1 ? (
                  <ChatIcon />
                ) : index === 2 ? (
                  <LogoutIcon />
                ) : (
                  <AppsIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <ListIcon
        sx={{ fontSize: "35px", marginX: "10px" }}
        onClick={toggleDrawer(true)}
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
