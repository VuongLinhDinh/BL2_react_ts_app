/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  styled,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress
} from "@mui/material";
import { AxiosError } from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "src/axious";
import Loading from "src/components/Loading";
import ProductCard from "src/components/ProductCard";
import { useLoading } from "src/contexts/loading";
import { ProductTs } from "src/types/Product";

function Product() {
  const [products, setProducts] = useState<ProductTs[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();

  const navigate = useNavigate();

  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortCriteria(event.target.value as string);
  };

  const handleCategoryFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategoryFilter(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchTerm(event.target.value as string);
  };

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get("/products");
      setProducts(data.data);
    } catch (error: AxiosError | unknown) {
      setError((error as AxiosError).response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const getUniqueCategories = () => {
    const categorySet = new Set(
      products.map((product) => product.category?.name)
    );
    return Array.from(categorySet).filter((category) => category);
  };

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category && product.category.name === categoryFilter
      );
    }

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortCriteria) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (sortCriteria === "price_asc") {
          return a.price - b.price;
        } else if (sortCriteria === "price_desc") {
          return b.price - a.price;
        } else if (sortCriteria === "rating_asc") {
          return a.rating - b.rating;
        } else if (sortCriteria === "rating_desc") {
          return b.rating - a.rating;
        } else {
          return 0;
        }
      });
    }

    return filteredProducts;
  };

  const uniqueCategories = getUniqueCategories();
  const filteredProducts = getFilteredProducts();

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
      <Loading />
      <Stack
        direction={"row"}
        gap={2}
        alignItems={"center"}
        justifyContent={"start"}
        sx={{ margin: "20px 185px 30px" }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select value={sortCriteria} onChange={handleSortChange}>
            <MenuItem value={"price_asc"}>Price: Low to High</MenuItem>
            <MenuItem value={"price_desc"}>Price: High to Low</MenuItem>
            <MenuItem value={"rating_asc"}>Rating: Low to High</MenuItem>
            <MenuItem value={"rating_desc"}>Rating: High to Low</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select value={categoryFilter} onChange={handleCategoryFilterChange}>
            <MenuItem value={""}>All</MenuItem>
            {uniqueCategories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ minWidth: 200 }}
        />
      </Stack>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
        alignItems={"start"}
        justifyContent={"center"}
        sx={{ margin: "20px 0 30px" }}
      >
        {filteredProducts.length === 0 ? (
          <CircularProgress />
        ) : (
          filteredProducts.map((product: ProductTs, index: number) => (
            <Item key={index}>
              <ProductCard product={product} />
            </Item>
          ))
        )}
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
