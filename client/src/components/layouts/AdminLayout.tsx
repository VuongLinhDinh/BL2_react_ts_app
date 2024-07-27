import { Box, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import HeaderAdmin from "../admin/HeaderAdmin";

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("is user: " + user.role);
  if (user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <Stack
      direction={"row"}
      alignItems={"start"}
      justifyContent={"flex-start"}
      gap={"5"}
      spacing={2}
    >
      <Stack>
        <Box padding={"20px 10px"}>
          <Sidebar />
        </Box>
      </Stack>
      <Stack flex={"3"} marginX={"0 auto"}>
        <HeaderAdmin />
        <Box padding={"20px 10px"} maxWidth={"100%"}>
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
};

export default AdminLayout;
