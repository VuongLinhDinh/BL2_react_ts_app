/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import instance from "src/axious"; // Ensure this path is correct
import { Category } from "src/types/Category"; // Ensure this type is correctly defined
import { categorySchema } from "src/untils/validation"; // Ensure this schema is correctly defined and imported

const CategoryForm = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Category>({
    resolver: zodResolver(categorySchema)
  });

  const handleCategory = async (data: Category) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      if (id) {
        await instance.patch(`/categories/${id}`, data);
        setSuccessMessage("Category updated successfully");
        setTimeout(() => {
          nav("/admin/category/list");
        }, 1000);
      } else {
        await instance.post(`/categories`, data);
        setSuccessMessage("Category added successfully");
        setTimeout(() => {
          nav("/admin/category/list");
        }, 1000);
      }
      reset();
    } catch (error) {
      setError("Failed to submit the category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const { data } = await instance.get(`/categories/${id}`);
          reset(data);
        } catch (error) {
          setError("Failed to fetch category details. Please try again.");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, reset]);

  return (
    <Container>
      <Typography variant="h4" textAlign="center" mb={2}>
        {id ? "Update Category" : "Add Category"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleCategory)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          variant="standard"
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          variant="standard"
          label="Description"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? (
            <CircularProgress size={24} />
          ) : id ? (
            "Update Category"
          ) : (
            "Add Category"
          )}
        </Button>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSuccessMessage(null)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CategoryForm;
