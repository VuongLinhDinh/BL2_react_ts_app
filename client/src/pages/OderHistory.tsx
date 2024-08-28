import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "src/axious";

// Định nghĩa kiểu dữ liệu cho sản phẩm trong đơn hàng
interface Product {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  description?: string;
}

// Định nghĩa kiểu dữ liệu cho mục đơn hàng
interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
}

// Định nghĩa kiểu dữ liệu cho đơn hàng
interface Order {
  _id: string;
  createdAt: string;
  updatedAt: string;
  products: OrderItem[];
  totalPrice: number;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await instance.post("/orders/history");
        setOrders(response.data.orders);
        console.log(response.data.orders);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Stack spacing={2}>
      {orders.map((order) => (
        <Card key={order._id}>
          <CardContent>
            <Box
              sx={{
                backgroundColor: "#f1f2f3",
                padding: "5px 10px",
                marginBottom: "10px",
                borderRadius: "10px 10px 0 0"
              }}
            >
              <Typography variant="h6">
                Order At: {new Date(order.createdAt).toLocaleString()}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", marginBottom: "2px" }}
              >
                Total Price: {order.totalPrice.toLocaleString()} đ
              </Typography>
            </Box>

            {order.products.map((item) => (
              <Stack direction="row" spacing={2} key={item._id} gap={1}>
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  src={item.product.thumbnail}
                  alt={item.product.title}
                />
                <Stack width={"80%"}>
                  <Typography variant="h5">{item.product.title}</Typography>
                  <Typography variant="body2">
                    Price: {item.product.price.toLocaleString()} đ
                  </Typography>
                  <Typography variant="body2">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    {item.product.description}
                  </Typography>
                  <Divider sx={{ marginY: "3px" }} />
                </Stack>
                <Stack>
                  <Button component={Link} to={`/product/${item.product._id}`}>
                    Mua lại
                  </Button>
                </Stack>
              </Stack>
            ))}
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default OrderHistory;
