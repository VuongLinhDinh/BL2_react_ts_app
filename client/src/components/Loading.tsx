import React, { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoading } from "src/contexts/loading";

const Loading: FC = () => {
  const { loading } = useLoading();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
