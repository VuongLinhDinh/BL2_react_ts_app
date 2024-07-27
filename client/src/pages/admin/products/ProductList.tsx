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
  Alert
} from "@mui/material";
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
              {state.products.map((product) => (
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
