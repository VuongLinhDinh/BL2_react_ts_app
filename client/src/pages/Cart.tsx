import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert
} from "@mui/material";
import instance from "src/axious";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const nav = useNavigate();
  const [cartItems, setCartItems] = useState<
    {
      product: { _id: string; images: string; name: string; price: number };
      quantity: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await instance.get("/cart");
        setCartItems(response.data.cart.products || []);
      } catch (error) {
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const fetchUpdatedCart = async () => {
    try {
      const response = await instance.get("/cart");
      setCartItems(response.data.cart.products || []);
    } catch (error) {
      setError("Failed to fetch updated cart.");
    }
  };

  const handleIncreaseQuantity = async (productId: string) => {
    try {
      await instance.post("/cart/increase", { productId });
      await fetchUpdatedCart(); // Lấy dữ liệu giỏ hàng mới
    } catch (error) {
      setError("Failed to increase quantity.");
    }
  };

  const handleDecreaseQuantity = async (productId: string) => {
    try {
      await instance.post("/cart/decrease", { productId });
      await fetchUpdatedCart(); // Lấy dữ liệu giỏ hàng mới
    } catch (error) {
      setError("Failed to decrease quantity.");
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    try {
      await instance.post("/cart/remove", { productId });
      await fetchUpdatedCart(); // Lấy dữ liệu giỏ hàng mới
      setSuccessMessage("Product removed from cart successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setError("Failed to remove product from cart.");
    }
  };

  const handleNavigateToOrder = () => {
    nav("/order"); // Chuyển hướng đến trang Order
  };

  const QuantitySelector = ({
    productId,
    quantity
  }: {
    productId: string;
    quantity: number;
  }) => {
    return (
      <Button variant="outlined" sx={{ display: "flex", borderRadius: "15px" }}>
        <IconButton
          onClick={() => handleDecreaseQuantity(productId)}
          aria-label="decrease"
          disabled={quantity <= 1}
        >
          <RemoveIcon color="primary" />
        </IconButton>
        <Typography>{quantity}</Typography>
        <IconButton
          onClick={() => handleIncreaseQuantity(productId)}
          aria-label="increase"
        >
          <AddIcon color="primary" />
        </IconButton>
      </Button>
    );
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
        margin={"20px 30px"}
      >
        <Stack width={"50%"}>
          <TableContainer component={"aside"} sx={{ borderRadius: "10px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ borderRadius: "10px" }}>
                {cartItems.map((item) => (
                  <TableRow key={item.product._id}>
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1
                      }}
                    >
                      <img
                        src={item.product.images}
                        alt={item.product.name}
                        width={"90px"}
                        height={"120px"}
                        style={{ borderRadius: "10px" }}
                      />
                      <Typography>{item.product.name}</Typography>
                    </TableCell>
                    <TableCell>
                      {item.product.price.toLocaleString()}đ
                    </TableCell>
                    <TableCell>
                      <QuantitySelector
                        productId={item.product._id}
                        quantity={item.quantity}
                      />
                    </TableCell>
                    <TableCell>
                      {(item.product.price * item.quantity).toLocaleString()}đ
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRemoveFromCart(item.product._id)}
                        aria-label="remove"
                      >
                        <DeleteIcon sx={{ color: "#ccc" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "#000"
            }}
          >
            <ArrowBackIcon />
            <Link style={{ color: "#000" }} to={"/product"}>
              Continues Shopping...
            </Link>
          </Button>
        </Stack>
        <Stack direction={"column"} width={"50%"}>
          <Typography variant="h3" sx={{ marginY: "5px" }}>
            Total Amount
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            marginBottom={"10px"}
          >
            <Typography>Provisional:</Typography>
            <Typography fontWeight={"600"}>
              {cartItems
                .reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0
                )
                .toLocaleString()}
              đ
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            marginBottom={"10px"}
          >
            <Typography>Ship:</Typography>
            <Typography>30,000đ</Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            marginBottom={"10px"}
          >
            <Typography>Total:</Typography>
            <Typography fontWeight={"600"}>
              {(
                cartItems.reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0
                ) + 30000
              ).toLocaleString()}
              đ
            </Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: "1px", marginY: "2px" }} />
          <Button
            variant="contained"
            sx={{ marginBottom: "10px" }}
            fullWidth
            onClick={handleNavigateToOrder} // Chuyển hướng đến trang Order
          >
            Checkout
          </Button>
          <TextField placeholder="voucher" sx={{ margin: "10px 0" }} />
          <Button variant="outlined" sx={{ marginBottom: "10px" }} fullWidth>
            Use
          </Button>
        </Stack>
      </Stack>
      {successMessage && (
        <Alert
          severity="success"
          sx={{ position: "fixed", top: "80px", right: "20px", zIndex: 1000 }}
        >
          {successMessage}
        </Alert>
      )}
    </>
  );
};

export default Cart;
