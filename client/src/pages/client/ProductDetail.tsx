import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tab,
  Typography
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "src/axious";
import Loading from "src/components/Loading";

import { useLoading } from "src/contexts/loading";
import { ProductTs } from "src/types/Product";
import axios from "axios";
import { useCart } from "src/hooks/useCart";

function ProductDetail() {
  const { id } = useParams();
  const { setLoading } = useLoading();
  const { addToCart } = useCart(); // Lấy hàm addToCart từ CartContext
  const [product, setProduct] = useState<ProductTs | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [tab, setTab] = useState("desc");
  const [error, setError] = useState<string | null>(null);
  const [navigateAfterError, setNavigateAfterError] = useState<boolean>(false);
  const navigate = useNavigate();

  const getProduct = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message || "Failed to fetch product data"
          );
        } else {
          setError("Failed to fetch product data. Please try again.");
        }

        setNavigateAfterError(true);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setProduct, setError, setNavigateAfterError]
  );

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id, getProduct]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const QuantitySelector = () => (
    <Button variant="outlined" sx={{ display: "flex", borderRadius: "15px" }}>
      <IconButton onClick={handleDecreaseQuantity} aria-label="decrease">
        <RemoveIcon color="primary" />
      </IconButton>
      <Typography>{quantity}</Typography>
      <IconButton onClick={handleIncreaseQuantity} aria-label="increase">
        <AddIcon color="primary" />
      </IconButton>
    </Button>
  );

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleCloseError = () => {
    setError(null);
    if (navigateAfterError) {
      navigate("/404");
    }
  };

  return (
    <>
      <Loading />
      <Container sx={{ p: "40px" }}>
        <Stack
          direction={"row"}
          justifyContent={"start"}
          alignItems={"center"}
          bgcolor={"#F9F1E7"}
          height={"50px"}
          p={5}
          marginBottom={"35px"}
          gap={2}
        >
          <Typography color={"#9F9F9F"} fontSize={"16px"}>
            Home
          </Typography>
          <ArrowForwardIosIcon
            sx={{ color: "#000", fontSize: "20px" }}
            width={"15px"}
            height={"15px"}
          />
          <Typography color={"#9F9F9F"} fontSize={"16px"}>
            Shop
          </Typography>
          <ArrowForwardIosIcon
            sx={{ color: "#000", fontSize: "20px" }}
            width={"15px"}
            height={"15px"}
          />
          <HorizontalRuleIcon
            sx={{
              transform: "rotate(90deg)",
              fontWeight: "200",
              color: "#9F9F9F"
            }}
          />
          {product?.name}
        </Stack>
        {product && (
          <Stack direction={"row"} gap={7} p={5}>
            <Stack direction={"row"} gap={4}>
              <img
                src={product.images}
                alt=""
                width={"340px"}
                height={"550px"}
                style={{ borderRadius: "10px" }}
              />
            </Stack>

            <Stack>
              <Typography component="h1" fontSize={"42px"}>
                {product.name}
              </Typography>
              <Typography
                fontWeight={"400"}
                sx={{
                  fontSize: "24px",
                  color: "#9F9F9F",
                  marginBottom: "5px"
                }}
              >
                {(
                  product.price -
                  product.price * (product.discount / 100)
                ).toLocaleString()}
                đ
              </Typography>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.1}
                sx={{ fontSize: 20, marginY: "5px" }}
                readOnly
              />
              <Typography
                sx={{ fontSize: "13px", width: "424px", marginBottom: "15px" }}
              >
                {product.description}
              </Typography>
              <Stack direction={"row"} spacing={2} marginBottom={"30px"}>
                <QuantitySelector />
                <Button
                  variant="outlined"
                  sx={{ borderRadius: "15px" }}
                  onClick={handleAddToCart} // Thêm vào giỏ hàng
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <AddIcon sx={{ fontSize: "23px", fontWeight: "400" }} />
                  Compare
                </Button>
              </Stack>
              <Divider
                sx={{ borderBottomWidth: "2px", marginBottom: "10px" }}
              />
              <Stack direction={"column"} spacing={2}>
                <Typography
                  fontWeight={"700"}
                  sx={{
                    color: "#9F9F9F",
                    fontSize: "14px",
                    marginBottom: "10px"
                  }}
                >
                  Brand:{" "}
                  <Typography
                    component="span"
                    fontWeight={"400"}
                    sx={{
                      color: "#000",
                      fontSize: "14px"
                    }}
                  >
                    Nike
                  </Typography>
                </Typography>
                <Typography
                  fontWeight={"700"}
                  sx={{
                    color: "#9F9F9F",
                    fontSize: "14px",
                    marginBottom: "10px"
                  }}
                >
                  Category:{" "}
                  <Typography
                    component="span"
                    fontWeight={"400"}
                    sx={{
                      color: "#000",
                      fontSize: "14px"
                    }}
                  >
                    {product.category.name}
                  </Typography>
                </Typography>
                <Typography
                  fontWeight={"700"}
                  sx={{
                    color: "#9F9F9F",
                    fontSize: "14px",
                    marginBottom: "10px"
                  }}
                >
                  Tags: #sneakers, #nike, #shoes
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Container>
      <Stack justifyContent={"center"}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons
            >
              <Tab label="Description" value="desc" />
              <Tab label="Additional Information" value="2" />
              <Tab label="Reviews [5]" value="3" />
            </TabList>
          </Box>
          <TabPanel value="desc">...</TabPanel>
          <TabPanel value="2">...</TabPanel>
          <TabPanel value="3">...</TabPanel>
        </TabContext>
      </Stack>
      {error && (
        <Dialog
          open={Boolean(error)}
          onClose={handleCloseError}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {error}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseError} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ProductDetail;
