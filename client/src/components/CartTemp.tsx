import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Button,
  Divider,
  Stack,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "src/hooks/useCart";

const CartTemp = ({ close }: { close: () => void }) => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Stack sx={{ position: "relative" }}>
        <Button onClick={close} sx={{ position: "absolute", top: 0, right: 0 }}>
          <CloseIcon />
        </Button>

        <Typography variant="h5" marginTop={"20px"} marginX={"auto"}>
          Cart
        </Typography>
        <Divider
          variant="middle"
          sx={{
            borderBottomWidth: "5px",
            width: "30px",
            marginX: "auto",
            marginY: "10px"
          }}
        />
        <Stack direction={"column"} gap={3}>
          {cart.map((item) => (
            <Stack direction={"row"} spacing={2} key={item.product._id}>
              <img
                src={item.product.images}
                alt={item.product.name}
                width={"50px"}
                height={"70px"}
                style={{ borderRadius: "10px" }}
              />
              <Stack width={"50%"}>
                <Link
                  style={{ textDecoration: "none", color: "#a3a3a3" }}
                  to={`/product/${item.product._id}`}
                >
                  {item.product.name}
                </Link>
                <Typography fontSize={"13px"}>
                  {item.quantity} x {item.product.price.toLocaleString()}đ
                </Typography>
              </Stack>
              <HighlightOffIcon
                sx={{ color: "#a3a3a3", cursor: "pointer" }}
                onClick={() => handleRemoveItem(String(item.product._id))}
              />
            </Stack>
          ))}
        </Stack>

        <Stack direction={"row"} gap={2} margin={"25px auto"}>
          <Typography sx={{ color: "#a3a3a3" }}>Estimated total: </Typography>
          {total.toLocaleString()}đ
        </Stack>
        <Stack direction={"column"} gap={2} margin={"25px auto"}>
          <Button onClick={() => navigate("/cart")}>View Cart</Button>
          <Button onClick={() => navigate("/order")}>Checkout</Button>
        </Stack>
      </Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Item removed from cart
        </Alert>
      </Snackbar>
    </>
  );
};

export default CartTemp;
