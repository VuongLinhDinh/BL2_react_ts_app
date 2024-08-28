import { Box, Stack, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import instance from "src/axious";
import ProductCard from "src/components/ProductCard";
import { ProductTs } from "src/types/Product"; // Ensure you have a ProductTs type

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

  const removeFromFavorites = async (productId: string | number) => {
    try {
      await instance.delete(`/favorites/${productId}/remove`);
      setFavorites(favorites.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error removing favorite product:", error);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 2, marginX: "30px" }}>
      <Stack
        direction="row"
        gap={2}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {favorites.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isFavorite={true}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default FavoriteList;
