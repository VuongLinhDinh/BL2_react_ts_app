/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Rating from "@mui/material/Rating";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "src/axious";
import Loading from "src/components/Loading";
import { useLoading } from "src/contexts/loading";
import { ProductTs } from "src/types/Product";

function ProductDetail() {
  const { id } = useParams();
  const { setLoading } = useLoading();
  const [product, setProduct] = useState<ProductTs | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [navigateAfterError, setNavigateAfterError] = useState<boolean>(false);
  const navigate = useNavigate();

  const getProduct = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      setError("Failed to fetch product data. Please try again.");
      setNavigateAfterError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product?.name} to cart`);
  };

  const handleCloseError = () => {
    setError(null);
    if (navigateAfterError) {
      navigate("/404");
    }
  };

  return (
    <>
      <Loading />
      <Container sx={{ p: "40px" }}>
        <Stack
          direction={"row"}
          justifyContent={"start"}
          alignItems={"center"}
          bgcolor={"#F9F1E7"}
          height={"50px"}
          p={5}
          marginBottom={"35px"}
          gap={2}
        >
          <Typography color={"#9F9F9F"} fontSize={"16px"}>
            Home
          </Typography>
          <ArrowForwardIosIcon
            sx={{ color: "#000", fontSize: "20px" }}
            width={"15px"}
            height={"15px"}
          />
          <Typography color={"#9F9F9F"} fontSize={"16px"}>
            Shop
          </Typography>
          <ArrowForwardIosIcon
            sx={{ color: "#000", fontSize: "20px" }}
            width={"15px"}
            height={"15px"}
          />
          <HorizontalRuleIcon
            sx={{
              transform: "rotate(90deg)",
              fontWeight: "200",
              color: "#9F9F9F"
            }}
          />
          {product?.name}
        </Stack>
        {product && (
          <Stack direction={"row"} gap={7} p={5}>
            <Stack direction={"row"} gap={4}>
              <Stack direction={"column"} gap={3}>
                <img
                  src={product.images}
                  alt=""
                  width={"100px"}
                  height={"100px"}
                  style={{ borderRadius: "10px" }}
                />
                <img
                  src={product.images}
                  alt=""
                  width={"100px"}
                  height={"100px"}
                  style={{ borderRadius: "10px" }}
                />
                <img
                  src={product.images}
                  alt=""
                  width={"100px"}
                  height={"100px"}
                  style={{ borderRadius: "10px" }}
                />
                <img
                  src={product.images}
                  alt=""
                  width={"100px"}
                  height={"100px"}
                  style={{ borderRadius: "10px" }}
                />
              </Stack>

              <img
                src={product.images}
                alt=""
                width={"423px"}
                style={{ borderRadius: "10px" }}
              />
            </Stack>

            <Stack>
              <Typography component="h1" fontSize={"42px"}>
                {product.name}
              </Typography>
              <Typography
                fontWeight={"400"}
                sx={{
                  fontSize: "24px",
                  color: "#9F9F9F",
                  marginBottom: "5px"
                }}
              >
                {product.price.toLocaleString()}đ
              </Typography>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.1}
                sx={{ fontSize: 20, marginY: "5px" }}
                readOnly
              />
              <Typography sx={{ fontSize: "13px", width: "424px" }}>
                {product.description}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                p={2}
                bgcolor={"#ccc"}
                border={"1px solid #816DFA"}
              >
                <IconButton
                  onClick={handleDecreaseQuantity}
                  aria-label="decrease"
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={quantity}
                  inputProps={{ readOnly: true }}
                  size="small"
                  sx={{
                    width: 50,
                    textAlign: "center",
                    outline: "none",
                    boder: "none"
                  }}
                />
                <IconButton
                  onClick={handleIncreaseQuantity}
                  aria-label="increase"
                >
                  <AddIcon />
                </IconButton>
              </Stack>
              <Button variant="contained" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Stack>
          </Stack>
        )}
      </Container>
      <Dialog open={!!error} onClose={handleCloseError}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductDetail;
