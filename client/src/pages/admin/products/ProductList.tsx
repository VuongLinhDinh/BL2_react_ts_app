import { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  CircularProgress,
  Switch,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Pagination
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { ProductContext } from "src/contexts/ProductContext";

const ProductList = () => {
  const { state, dispatch, removeProduct } = useContext(ProductContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(5);

  useEffect(() => {
    setLoading(true);
    dispatch({ type: "GET_PRODUCTS", payload: [] });
    setLoading(false);
  }, [dispatch]);

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  const handleToggleShow = (id: string) => {
    const updatedProduct = state.products.find(
      (product) => product._id.toString() === id
    );

    if (updatedProduct) {
      updatedProduct.isShow = !updatedProduct.isShow;
      dispatch({ type: "EDIT_PRODUCT", payload: updatedProduct });
    }
  };

  const handleOpenDialog = (id: string) => {
    setProductToDelete(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    setLoading(true);
    await removeProduct(productToDelete);
    setLoading(false);
    setOpenDialog(false);
    setProductToDelete(null);
    setSuccess("Bạn đã xóa sản phẩm thành công!");
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortCriteria(event.target.value as string);
  };

  const handleCategoryFilterChange = (event: SelectChangeEvent<string>) => {
    setCategoryFilter(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const getUniqueCategories = () => {
    const categorySet = new Set(
      state.products.map((product) => product.category?.name)
    );
    return Array.from(categorySet).filter((category) => category); // Filter out undefined categories
  };

  const getFilteredProducts = () => {
    let filteredProducts = state.products;

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
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
      <Stack
        direction={"row"}
        gap={2}
        sx={{ color: "#219C90", padding: "5px 10px", marginBottom: "10px" }}
      >
        <AddCircleIcon />
        <Link
          style={{ textDecoration: "none", color: "#219C90" }}
          to={"/admin/product/add"}
        >
          Add new product
        </Link>
      </Stack>
      <Box sx={{ marginBottom: "20px" }}>
        <FormControl sx={{ minWidth: 120, marginRight: "10px" }}>
          <InputLabel>Sort by</InputLabel>
          <Select value={sortCriteria} onChange={handleSortChange}>
            <MenuItem value={"price_asc"}>Price: Low to High</MenuItem>
            <MenuItem value={"price_desc"}>Price: High to Low</MenuItem>
            <MenuItem value={"rating_asc"}>Rating: Low to High</MenuItem>
            <MenuItem value={"rating_desc"}>Rating: High to Low</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, marginRight: "10px" }}>
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
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Price After Discount</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Is Show</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ borderRadius: "10px" }}>
                {paginatedProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <img
                        src={product.images}
                        alt={product.name}
                        width="80"
                        height="100"
                        style={{ borderRadius: "5px" }}
                      />
                    </TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price.toLocaleString()}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {product.discount} %
                    </TableCell>
                    <TableCell>
                      {(
                        product.price -
                        product.price * (product.discount / 100)
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center"
                      }}
                    >
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"start"}
                      >
                        <Box> {product.rating}</Box>
                        <StarBorderIcon />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {product.category ? product.category.name : "No Category"}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.isShow}
                        onChange={() =>
                          handleToggleShow(product._id.toString())
                        }
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        sx={{ color: "#219C90" }}
                        onClick={() => alert("View: " + product._id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton sx={{ color: "#e3b309" }}>
                        <Link
                          style={{ color: "#e3b309" }}
                          to={`/admin/product/edit/${product._id}`}
                        >
                          <EditIcon />
                        </Link>
                      </IconButton>
                      <IconButton
                        sx={{ color: "#EE4E4E" }}
                        onClick={() => handleOpenDialog(product._id.toString())}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px"
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </>
      )}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={error}
      />
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
