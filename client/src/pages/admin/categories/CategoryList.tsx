import { useEffect, useState } from "react";

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

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import instance from "src/axious";
import { Category } from "src/types/Category";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const getAllCate = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get("/categories");
      setCategories(data.data);
    } catch (error) {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCate();
  }, []);

  const handleCloseError = () => {
    setError(null);
  };

  const handleOpenDialog = (id: string) => {
    setCategoryToDelete(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCategoryToDelete(null);
  };

  const handleDeleteProduct = async () => {
    if (!categoryToDelete) return;
    try {
      setLoading(true);
      await instance.delete(`/categories/${categoryToDelete}`);
      setCategories((prevCategoris) =>
        prevCategoris.filter(
          (categories) => categories._id.toString() !== categoryToDelete
        )
      );
      setOpenDialog(false);
      setCategoryToDelete(null);
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
          to={"/admin/category/add"}
        >
          Add new category
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
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ borderRadius: "10px" }}>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>

                  <TableCell>{category.description}</TableCell>

                  <TableCell>
                    <IconButton
                      sx={{ color: "#219C90" }}
                      onClick={() => alert("View: " + category._id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#e3b309" }}>
                      <Link
                        style={{ color: "#e3b309" }}
                        to={`/admin/category/edit/${category._id}`}
                      >
                        <EditIcon />
                      </Link>
                    </IconButton>
                    <IconButton
                      sx={{ color: "#EE4E4E" }}
                      onClick={() => handleOpenDialog(category._id.toString())}
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

export default CategoryList;
