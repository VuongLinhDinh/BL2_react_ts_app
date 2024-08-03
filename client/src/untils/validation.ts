import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  images: z.string().url("Invalid image URL").min(1, "Image is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  discount: z.number().min(0).max(100, "Discount must be between 0 and 100"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  category: z.string().min(1, "Category is required"),
  isShow: z.boolean()
});

export const categorySchema = z.object({
  name: z.string().min(6),
  description: z.string().optional()
});

// src/validation/orderSchema.ts

export const orderSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone: z.string().nonempty("Phone is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  country: z.string().nonempty("Country is required"),
  address: z.string().nonempty("Address is required")
});

export type OrderFormData = z.infer<typeof orderSchema>;
