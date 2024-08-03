import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
const Footer = () => {
  return (
    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
        padding={"100px 20px"}
        bgcolor={"#FAF3EA"}
        sx={{ width: "100%" }}
      >
        <Stack direction={"row"} spacing={1}>
          <img src="/trophy.svg" alt="" />
          <Stack
            direction={"column"}
            alignItems={"start"}
            justifyContent={"center"}
          >
            <Typography
              variant={"h5"}
              sx={{
                fontSize: "25px",
                fontWeight: "600",
                lineHeight: "150%"
              }}
            >
              High Quality
            </Typography>{" "}
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "400",
                lineHeight: "130%",
                color: "#898989"
              }}
            >
              crafted from top materials
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <img src="/guarantee.svg" alt="" />
          <Stack
            direction={"column"}
            alignItems={"start"}
            justifyContent={"center"}
          >
            <Typography
              variant={"h5"}
              sx={{
                fontSize: "25px",
                fontWeight: "600",
                lineHeight: "150%"
              }}
            >
              Warranty Protection
            </Typography>{" "}
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "400",
                lineHeight: "130%",
                color: "#898989"
              }}
            >
              Over 2 years
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <img src="/shipping.svg" alt="" />
          <Stack
            direction={"column"}
            alignItems={"start"}
            justifyContent={"center"}
          >
            <Typography
              variant={"h5"}
              sx={{
                fontSize: "25px",
                fontWeight: "600",
                lineHeight: "150%"
              }}
            >
              Free Shipping
            </Typography>{" "}
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "400",
                lineHeight: "130%",
                color: "#898989"
              }}
            >
              Order over 150 $
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <img src="/customer-support.svg" alt="" />
          <Stack
            direction={"column"}
            alignItems={"start"}
            justifyContent={"center"}
          >
            <Typography
              variant={"h5"}
              sx={{
                fontSize: "25px",
                fontWeight: "600",
                lineHeight: "150%"
              }}
            >
              24 / 7 Support
            </Typography>{" "}
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "400",
                lineHeight: "130%",
                color: "#898989"
              }}
            >
              Dedicated support
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box component="footer" sx={{ p: 6, width: "100%" }}>
        <Container maxWidth={"xl"}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                <img src="./nike.png" alt="" style={{ width: "100px" }} />
              </Typography>
              <Typography variant="body2" color="textSecondary">
                400 University Drive Suite 202 Coral Gables, FL 33134 USA
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h6" gutterBottom>
                Links
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Home
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Shop
              </Typography>
              <Typography variant="body2" color="textSecondary">
                About
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Contact
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="h6" gutterBottom>
                Help
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Payment Options
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Returns
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Privacy Policies
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Newsletter
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Enter Your Email Address"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" fullWidth>
                SUBSCRIBE
              </Button>
            </Grid>
          </Grid>
          <Box mt={5} display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              © 2023 Funiro. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Stack>
  );
};

export default Footer;
