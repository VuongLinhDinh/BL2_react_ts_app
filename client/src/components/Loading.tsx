import { FC } from "react";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type LoadingProps = {
  showLoading: boolean;
};

const Loading: FC<LoadingProps> = ({ showLoading }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // Call handleOpen() outside of JSX if showLoading is true
  React.useEffect(() => {
    if (showLoading) {
      handleOpen();
    }
  }, [showLoading]);

  return (
    <>
      {showLoading && (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      )}
    </>
  );
};

export default Loading;
