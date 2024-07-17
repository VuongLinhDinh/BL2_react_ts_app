/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "src/axious";
import Loading from "src/components/Loading";
import { useLoading } from "src/contexts/loading";
import { ProductTs } from "src/types/Product";

function ProductDetail() {
  const { id } = useParams();
  const { loading, setLoading } = useLoading();
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
        {product && (
          <Stack direction={"row"} gap={3}>
            <img src={product.images} alt="" width={"500px"} />
            <Stack gap={2}>
              <Typography component="h1" fontSize={"26px"}>
                {product.name}
              </Typography>
              <Typography component="h6" fontSize={"15px"}>
                {product.category.name ? product.category.name : "No Category"}
              </Typography>
              <Typography
                fontWeight={"bold"}
                color={"Highlight"}
                fontSize={"20px"}
              >
                ${product.price}
              </Typography>
              <Typography fontSize={"20px"}>Rate: {product.rating}</Typography>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.1}
                sx={{ fontSize: 20 }}
                readOnly
              />
              <Typography>{product.description}</Typography>
              <Stack direction="row" alignItems="center" gap={1}>
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
                  sx={{ width: 50, textAlign: "center" }}
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
