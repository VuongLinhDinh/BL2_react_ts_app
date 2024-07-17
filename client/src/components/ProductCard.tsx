import ShareIcon from "@mui/icons-material/Share";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { ProductTs } from "src/types/Product";
import { Link } from "react-router-dom";

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
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Load initial state from localStorage (if available)
  useEffect(() => {
    const storedIsFavorite = localStorage.getItem("isFavorite");
    if (storedIsFavorite) {
      setIsFavorite(JSON.parse(storedIsFavorite));
    }
  }, []);

  // Handle click to toggle favorite status
  const handleToggleFavorite = () => {
    const updatedIsFavorite = !isFavorite;
    setIsFavorite(updatedIsFavorite);
    localStorage.setItem("isFavorite", JSON.stringify(updatedIsFavorite));
  };

  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
          padding: "15px 10px",
          m: "5px",
          borderRadius: "50%",
          backgroundColor: product.discount === 0 ? "#2EC1AC" : "#E97171",
          color: "#fff"
        }}
      >
        {product.discount === 0 ? "New" : `-${product.discount}%`}
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
              {" "}
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
          >
            Add To Card
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
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "#FF4C4C" }} />
            ) : (
              <FavoriteBorderIcon />
            )}{" "}
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
            {(
              product.price -
              product.price * (product.discount / 100)
            ).toLocaleString()}
            đ
          </Typography>
          {product.discount !== 0 && (
            <Typography
              variant="h6"
              color="#B0B0B0"
              sx={{ fontSize: "16px", textDecoration: "line-through" }}
            >
              {product.price.toLocaleString()}đ
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
