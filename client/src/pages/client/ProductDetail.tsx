/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import RemoveIcon from "@mui/icons-material/Remove";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tab,
  Typography
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "src/axious";
import Loading from "src/components/Loading";
import { useLoading } from "src/contexts/loading";
import { ProductTs } from "src/types/Product";

function ProductDetail() {
  const { id } = useParams();
  const { setLoading } = useLoading();
  const [product, setProduct] = useState<ProductTs | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [tab, setTab] = useState("desc");
  const [error, setError] = useState<string | null>(null);
  const [navigateAfterError, setNavigateAfterError] = useState<boolean>(false);
  const navigate = useNavigate();

  const getProduct = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data.data);
    } catch (error) {
      setError("Failed to fetch product data. Please try again.");
      setNavigateAfterError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const QuantitySelector = () => {
    return (
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
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} of ${product?.name} to cart`);
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
        {/*! Cần viết lại khúc này --> tách thành cpmponent  */}
        {product && (
          <Stack direction={"row"} gap={7} p={5}>
            <Stack direction={"row"} gap={4}>
              <Stack direction={"column"} gap={3}>
                <img
                  src={product.images}
                  alt=""
                  width={"90px"}
                  height={"120px"}
                  style={{ borderRadius: "10px" }}
                />
                <img
                  src={product.images}
                  alt=""
                  width={"90px"}
                  height={"120px"}
                  style={{ borderRadius: "10px" }}
                />
                <img
                  src={product.images}
                  alt=""
                  width={"90px"}
                  height={"120px"}
                  style={{ borderRadius: "10px" }}
                />
                <img
                  src={product.images}
                  alt=""
                  width={"90px"}
                  height={"120px"}
                  style={{ borderRadius: "10px" }}
                />
              </Stack>

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
                  sx={{
                    borderRadius: "15px"
                  }}
                  onClick={handleAddToCart}
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
                  onClick={handleAddToCart}
                >
                  <AddIcon sx={{ fontSize: "23px", fontWeight: "400" }} />
                  Compare
                </Button>
              </Stack>
              <Divider sx={{ borderBottomWidth: "2px", color: "#D9D9D9" }} />
              <Stack direction={"column"}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginTop: "20px",
                    marginBottom: "10px"
                  }}
                >
                  Product Details
                </Typography>
                <Stack direction={"row"} gap={2}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#9F9F9F",
                      width: "100px"
                    }}
                  >
                    Category :
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    {" "}
                    {product.category ? product.category.name : "No Category"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={2}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#9F9F9F",
                      width: "100px"
                    }}
                  >
                    Brand :
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>Nike</Typography>
                </Stack>
                <Stack direction={"row"} gap={2}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#9F9F9F",
                      width: "100px"
                    }}
                  >
                    Material :
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>none</Typography>
                </Stack>
                <Stack direction={"row"} gap={2}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#9F9F9F",
                      width: "100px"
                    }}
                  >
                    Color :
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    red, blue, green
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={2}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#9F9F9F",
                      width: "100px"
                    }}
                  >
                    Size :
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    38, 39, 40, 41, 42
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
        <Divider sx={{ borderBottomWidth: "2px" }} />
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
            <TabPanel value="desc">
              It looks like you’ve shared the review I provided earlier. Is
              there anything specific you’d like to add or modify in the review?
              Or do you need help with something else related to Nike Air shoes?
              Let me know how I can assist you further! Responsive cushioning in
              the Pegasus provides an energised ride for everyday road running.
              Experience lighter-weight energy return with dual Air Zoom units
              and a ReactX foam midsole. Plus, improved engineered mesh on the
              upper decreases weight and increases breathability.
            </TabPanel>
            <TabPanel value="2">
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h6">Comfort and Fit</Typography>
                  <Typography>
                    The Nike Air shoes are designed with the latest cushioning
                    technology, ensuring maximum comfort for your feet. The
                    shoes come in various sizes and widths, catering to
                    different foot shapes and sizes. The breathable material
                    used in the upper part of the shoe helps keep your feet cool
                    and dry, even during intense activities.
                  </Typography>
                </Box>
                <Divider sx={{ borderBottomWidth: 2 }} />
                <Box>
                  <Typography variant="h6">Design and Style</Typography>
                  <Typography>
                    Nike Air shoes are known for their sleek and modern design.
                    They are available in a wide range of colors and styles,
                    making it easy to find a pair that matches your personal
                    taste. Whether you prefer a classic look or something more
                    vibrant and trendy, there’s a Nike Air shoe for you.
                  </Typography>
                </Box>
                <Divider sx={{ borderBottomWidth: 2 }} />
                <Box>
                  <Typography variant="h6">Performance</Typography>
                  <Typography>
                    These shoes are not just about looks; they are built for
                    performance. The advanced cushioning system provides
                    excellent shock absorption, reducing the impact on your
                    joints during high-impact activities like running and
                    jumping. The durable outsole offers great traction on
                    various surfaces, ensuring stability and preventing slips.
                  </Typography>
                </Box>
                <Divider sx={{ borderBottomWidth: 2 }} />
                <Box>
                  <Typography variant="h6">Durability</Typography>
                  <Typography>
                    Nike Air shoes are made with high-quality materials that
                    ensure long-lasting durability. Even after months of regular
                    use, the shoes maintain their shape and performance. The
                    reinforced stitching and sturdy construction make them a
                    reliable choice for everyday wear and athletic activities.
                  </Typography>
                </Box>
                <Divider sx={{ borderBottomWidth: 2 }} />
                <Box>
                  <Typography variant="h6">Versatility</Typography>
                  <Typography>
                    One of the best things about Nike Air shoes is their
                    versatility. They are suitable for a wide range of
                    activities, from casual walks to intense workouts. Whether
                    you’re hitting the gym, going for a run, or just running
                    errands, these shoes provide the comfort and support you
                    need.
                  </Typography>
                </Box>
                <Divider sx={{ borderBottomWidth: 2 }} />
                <Box>
                  <Typography variant="h6">Customer Satisfaction</Typography>
                  <Typography>
                    Nike has a strong reputation for customer satisfaction. Many
                    users have praised the Nike Air shoes for their comfort,
                    style, and performance. The brand’s commitment to innovation
                    and quality ensures that you get a product that meets your
                    expectations.
                  </Typography>
                </Box>
              </Stack>
            </TabPanel>
            <TabPanel value="3">
              <Box>
                <Typography variant="h5" gutterBottom>
                  Review Title: Walking on Air!
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h6">Rating:</Typography>
                  <Rating value={5} readOnly />
                </Stack>
                <Typography variant="body1" paragraph>
                  I recently purchased a pair of Nike Air shoes, and I must say,
                  they have exceeded my expectations! From the moment I put them
                  on, I felt like I was walking on air. The cushioning is
                  incredibly comfortable, providing excellent support for my
                  feet throughout the day.
                </Typography>
                <Typography variant="body1" paragraph>
                  The design is sleek and stylish, making them perfect for both
                  casual wear and workouts. I particularly appreciate the
                  breathable material, which keeps my feet cool even during
                  intense activities. The fit is true to size, and the shoes
                  feel lightweight, which is a big plus for me.
                </Typography>
                <Typography variant="body1" paragraph>
                  One of the standout features is the durability. After several
                  weeks of use, they still look and feel brand new. The grip on
                  the soles is also impressive, providing great traction on
                  various surfaces.
                </Typography>
                <Typography variant="body1" paragraph>
                  Overall, I highly recommend Nike Air shoes to anyone looking
                  for a combination of comfort, style, and performance. They are
                  worth every penny!
                </Typography>
                <Typography variant="body1" paragraph>
                  Would you like to know more about a specific model or feature
                  of Nike Air shoes?
                </Typography>
              </Box>
            </TabPanel>
          </TabContext>
        </Stack>
      </Container>
      <Dialog open={!!error} onClose={handleCloseError}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductDetail;
