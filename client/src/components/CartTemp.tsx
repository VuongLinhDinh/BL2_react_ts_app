import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const CartTemp = () => {
  return (
    <>
      <Stack sx={{ position: "relative" }}>
        <CloseIcon sx={{ position: "absolute", top: 0, right: 0 }} />
        <Typography variant="h5" marginTop={"20px"} marginX={"auto"}>
          Cart
        </Typography>
        <Divider
          variant="middle"
          sx={{
            borderBottomWidth: "5px",
            width: "30px",
            marginX: "auto",
            marginY: "10px"
          }}
        />
        <Stack direction={"column"} gap={3}>
          <Stack direction={"row"} spacing={2}>
            <img
              src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7a1cf2fc-158a-47b6-95e1-8d65c992f731/WMNS+AIR+JORDAN+1+MID+SE.png"
              alt=""
              width={"50px"}
              height={"70px"}
              style={{ borderRadius: "10px" }}
            />
            <Stack width={"50%"}>
              <Link
                style={{ textDecoration: "none", color: "#a3a3a3" }}
                to={`/product/66964ef48d0c2f59afaff4d6`}
              >
                Air Jordan 1 Mid SE
              </Link>
              <Typography fontSize={"13px"}>2 x 4,109,000đ</Typography>
            </Stack>

            <HighlightOffIcon sx={{ color: "#a3a3a3" }} />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <img
              src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2b1598df-b56f-4be9-a684-42d4c2b7d8a2/AIR+JORDAN+1+LOW+Q54.png"
              alt=""
              width={"50px"}
              height={"70px"}
              style={{ borderRadius: "10px" }}
            />
            <Stack width={"50%"}>
              <Link
                style={{ textDecoration: "none", color: "#a3a3a3" }}
                to={`/product/66964ef48d0c2f59afaff4d6`}
              >
                Air Jordan 1 Low Quai 54
              </Link>
              <Typography fontSize={"13px"}>2 x 3,100,000đ</Typography>
            </Stack>
            <HighlightOffIcon sx={{ color: "#a3a3a3" }} />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <img
              src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7a1cf2fc-158a-47b6-95e1-8d65c992f731/WMNS+AIR+JORDAN+1+MID+SE.png"
              alt=""
              width={"50px"}
              height={"70px"}
              style={{ borderRadius: "10px" }}
            />
            <Stack width={"50%"}>
              <Link
                style={{ textDecoration: "none", color: "#a3a3a3" }}
                to={`/product/66964ef48d0c2f59afaff4d6`}
              >
                Air Jordan 1 Mid SE
              </Link>
              <Typography fontSize={"13px"}>2 x 4,109,000đ</Typography>
            </Stack>

            <HighlightOffIcon sx={{ color: "#a3a3a3" }} />
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={2} margin={"25px auto"}>
          <Typography sx={{ color: "#a3a3a3" }}>Estimated total: </Typography>
          11,318,000đ
        </Stack>
        <Stack direction={"column"} gap={2} margin={"25px auto"}>
          <Button>View Cart</Button>
          <Button>Checkout</Button>
        </Stack>
      </Stack>
    </>
  );
};

export default CartTemp;
