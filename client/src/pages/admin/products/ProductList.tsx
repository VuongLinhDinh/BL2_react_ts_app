import { useEffect, useState } from "react";

import { ProductTs } from "src/types/Product";
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
  Button
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import instance from "src/axious";

const ProductList = () => {
  const [products, setProducts] = useState<ProductTs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

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

  const handleCloseError = () => {
    setError(null);
  };

  const handleToggleShow = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id.toString() === id.toString()
          ? { ...product, isShow: !product.isShow }
          : product
      )
    );
    const updatedProduct = products.find(
      (product) => product._id.toString() === id
    );
    if (updatedProduct) {
      localStorage.setItem(
        `product_${id}_isShow`,
        JSON.stringify(!updatedProduct.isShow)
      );
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

    try {
      setLoading(true);
      await instance.delete(`/products/${productToDelete}`);
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id.toString() !== productToDelete
        )
      );
      setOpenDialog(false);
      setProductToDelete(null);
    } catch (error) {
      setError("Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      {loading ? (
        <CircularProgress />
      ) : (
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
              {products.map((product) => (
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
                    {" "}
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
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>
                    <Switch
                      checked={product.isShow}
                      onChange={() => handleToggleShow(product._id.toString())}
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
      )}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={error}
      />
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
