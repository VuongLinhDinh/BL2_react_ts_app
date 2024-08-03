import {
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { useEffect, useState } from "react";
import instance from "src/axious";
import { ICartItem } from "src/types/Cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OrderFormData, orderSchema } from "src/untils/validation";

const Order = () => {
  // const nav = useNavigate();
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema)
  });

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

  const handleCheckout = async (data: OrderFormData) => {
    try {
      await instance.post("/cart/checkout", data);
      setSnackbarMessage("Order placed successfully!");
      setSnackbarOpen(true);
      // Clear the cart
      setCartItems([]);
      window.location.href = "/";
    } catch (error) {
      setError("Failed to place order.");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Stack margin={"10px"}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Shipping Information</Typography>
            <form onSubmit={handleSubmit(handleCheckout)}>
              <TextField
                label="Name"
                {...register("name")}
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Phone"
                {...register("phone")}
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                label="Email"
                {...register("email")}
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Country"
                {...register("country")}
                fullWidth
                margin="normal"
                error={!!errors.country}
                helperText={errors.country?.message}
              />
              <TextField
                label="Address"
                {...register("address")}
                fullWidth
                margin="normal"
                error={!!errors.address}
                helperText={errors.address?.message}
              />

              <Divider sx={{ marginY: 2 }} />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Order
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Order Summary</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.product._id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>
                      {item.product.price.toLocaleString()}đ
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {(item.product.price * item.quantity).toLocaleString()}đ
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    Provisional:
                  </TableCell>
                  <TableCell>
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                      )
                      .toLocaleString()}
                    đ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    Ship:
                  </TableCell>
                  <TableCell>30,000đ</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    Total:
                  </TableCell>
                  <TableCell>
                    {(
                      cartItems.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                      ) + 30000
                    ).toLocaleString()}
                    đ
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Order;
