import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import HeaderAdmin from "../admin/HeaderAdmin";

const AdminLayout = () => {
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
