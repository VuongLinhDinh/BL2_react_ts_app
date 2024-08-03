import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack
} from "@mui/material";
import { styled } from "@mui/system";
import { ProductTs } from "src/types/Product"; // Ensure you have a ProductTs type
import instance from "src/axious";
// Adjust the import path as needed

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

const FavoriteList = () => {
  const [favorites, setFavorites] = useState<ProductTs[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await instance.get("/favorites");
        setFavorites(response.data.data);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Stack
        direction="row"
        spacing={3}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {favorites.map((product) => {
          const price = Number(product.price) || 0;
          const discount = Number(product.discount) || 0;
          const discountedPrice = price - price * (discount / 100);

          return (
            <Box
              key={product._id}
              sx={{
                width: { xs: "100%", sm: "48%", md: "30%", lg: "22%" },
                mb: 2
              }}
            >
              <Card sx={{ position: "relative" }}>
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
                <HoverBox>{/* Add hover actions here if needed */}</HoverBox>
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
                    direction="row"
                    marginTop="10px"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" color="textPrimary">
                      {discountedPrice.toLocaleString()} đ
                    </Typography>
                    {discount !== 0 && (
                      <Typography
                        variant="h6"
                        color="#B0B0B0"
                        sx={{
                          fontSize: "16px",
                          textDecoration: "line-through"
                        }}
                      >
                        {price.toLocaleString()} đ
                      </Typography>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default FavoriteList;
