import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  styled,
  Typography
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "src/axious";
import Loading from "src/components/Loading";
import ProductCard from "src/components/ProductCard";
import { ProductTs } from "src/types/Product";

function Product() {
  const [products, setProducts] = useState<ProductTs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  // get api
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get("/products");
      setProducts(data);
    } catch (error) {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  // handle error
  const handleCloseError = () => {
    setError(null);
    navigate("/404");
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }));

  return (
    <>
      <Loading showLoading={loading} />
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
        alignItems={"start"}
        justifyContent={"center"}
        sx={{ margin: "20px 0 30px" }}
      >
        {products.map((product: ProductTs, index: number) => (
          <Item key={index}>
            <ProductCard product={product} />
          </Item>
        ))}
      </Stack>
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

export default Product;
