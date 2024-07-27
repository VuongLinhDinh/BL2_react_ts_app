import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  Alert,
  Switch,
  FormControlLabel
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import instance from "src/axious";
import { Category } from "src/types/Category"; // Assume this type is defined
import { productSchema } from "src/untils/validation";

// Define the form schema with zod

type ProductFormInputs = z.infer<typeof productSchema>;

const ProductAdd = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema)
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get("/categories");
      setCategories(data);
    } catch (error) {
      setError("Failed to fetch categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    try {
      setLoading(true);
      await instance.post("/products", data);
      setSuccessMessage("Product added successfully!");
      reset();
      setTimeout(() => {
        navigate("/admin/product/list");
      }, 1000); // Delay for a smooth transition
    } catch (error) {
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center" mb={2}>
        Add Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
          label="Image"
          {...register("images")}
          error={!!errors.images}
          helperText={errors.images?.message}
        />
        <TextField
          variant="standard"
          label="Description"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          variant="standard"
          label="Price"
          type="number"
          {...register("price", { valueAsNumber: true })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />
        <TextField
          variant="standard"
          label="Discount"
          type="number"
          {...register("discount", { valueAsNumber: true })}
          error={!!errors.discount}
          helperText={errors.discount?.message}
        />
        <TextField
          variant="standard"
          label="Rating"
          type="number"
          {...register("rating", { valueAsNumber: true })}
          error={!!errors.rating}
          helperText={errors.rating?.message}
          InputProps={{ inputProps: { step: 0.1 } }}
        />
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            {...register("category")}
            error={!!errors.category}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors.category && (
          <Typography color="error">{errors.category.message}</Typography>
        )}
        <FormControlLabel
          control={
            <Switch
              {...register("isShow")}
              color="primary"
              defaultChecked={false}
            />
          }
          label="Is Show"
        />
        {errors.isShow && (
          <Typography color="error">{errors.isShow.message}</Typography>
        )}
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Add Product"}
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

export default ProductAdd;
