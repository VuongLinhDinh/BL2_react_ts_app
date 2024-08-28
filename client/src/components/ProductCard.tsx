import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Stack,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "src/hooks/useCart";
import { ProductTs } from "src/types/Product";

const HoverBox = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.3s",
  "&:hover": {  
    opacity: 1
  }
});

type ProductCardProps = {
  product: ProductTs;
  isFavorite: boolean; // Add isFavorite prop
  removeFromFavorites: (productId: string | number) => void; // Add removeFromFavorites prop
};

const ProductCard = ({
  product,
  isFavorite: initialFavorite,
  removeFromFavorites
}: ProductCardProps) => {
  const { addToCart } = useCart(); // Use the cart context

  const [addedToCart, setAddedToCart] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAddToCart = () => {
    addToCart(product, 1); // Use addToCart from context and pass the quantity argument
    setAddedToCart(true);
    setSnackbarMessage("Product added to cart!");
    setSnackbarOpen(true);
  };

  const handleToggleFavorite = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/favorites/${product._id}/${
          isFavorite ? "remove" : "add"
        }`,
        {
          method: isFavorite ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (response.ok) {
        setIsFavorite(!isFavorite);
        if (isFavorite) {
          removeFromFavorites(product._id);
        }
        setSnackbarMessage(
          isFavorite ? "Removed from favorites!" : "Added to favorites!"
        );
        setSnackbarOpen(true);
      } else {
        throw new Error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Ensure valid numbers for price and discount
  const price = Number(product.price) || 0;
  const discount = Number(product.discount) || 0;
  const discountedPrice = price - price * (discount / 100);

  return (
    <>
      <Card sx={{ maxWidth: 345, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            padding: "15px 10px",
            m: "5px",
            borderRadius: "50%",
            backgroundColor: discount === 0 ? "#2EC1AC" : "#E97171",
            color: "#fff"
          }}
        >
          {discount === 0 ? "New" : `-${discount}%`}
        </Box>
        <CardMedia
          component="img"
          height="446"
          image={product.images}
          alt="Product Image"
          sx={{ objectFit: "cover" }}
        />
        <HoverBox>
          <Stack direction={"column"} spacing={1} sx={{ mb: 1 }}>
            <Box
              sx={{
                padding: "5px 15px",
                mb: "22px",
                color: "#B88E2F",
                bgcolor: "#fff",
                cursor: "pointer"
              }}
            >
              <Link
                to={`/product/${product._id}`}
                style={{ color: "#B88E2F", textDecoration: "none" }}
              >
                View Product
              </Link>
            </Box>
            <Box
              sx={{
                padding: "5px 15px",
                mb: "22px",
                color: "#B88E2F",
                bgcolor: "#fff",
                cursor: "pointer"
              }}
              onClick={handleAddToCart}
            >
              {addedToCart ? "Added to Cart" : "Add To Cart"}
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
            marginTop={"20px"}
          >
            <Stack direction={"row"} gap={1} sx={{ cursor: "pointer" }}>
              <ShareIcon /> Share
            </Stack>
            <Stack direction={"row"} gap={1} sx={{ cursor: "pointer" }}>
              <CompareArrowsIcon /> Compare
            </Stack>
            <Stack
              direction={"row"}
              gap={1}
              sx={{ cursor: "pointer" }}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              Like
            </Stack>
          </Stack>
        </HoverBox>
        <CardContent>
          <Box
            sx={{
              display: "block",
              overflow: "hidden",
              maxHeight: "3.6em",
              lineHeight: "1.8em"
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                maxHeight: "3.6em",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical"
              }}
            >
              {product.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "block",
              overflow: "hidden",
              maxHeight: "3.6em",
              lineHeight: "1.8em"
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                maxHeight: "3.6em",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical"
              }}
            >
              {product.description}
            </Typography>
          </Box>

          <Stack
            direction={"row"}
            marginTop={"10px"}
            justifyContent={"space-between"}
            alignContent={"center"}
          >
            <Typography variant="h6" color="textPrimary">
              {discountedPrice.toLocaleString()} đ
            </Typography>
            {discount !== 0 && (
              <Typography
                variant="h6"
                color="#B0B0B0"
                sx={{ fontSize: "16px", textDecoration: "line-through" }}
              >
                {price.toLocaleString()} đ
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
