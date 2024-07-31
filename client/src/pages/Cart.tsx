import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, { useState } from "react";

const Cart = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
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
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={5}
      margin={"20px 30px"}
    >
      <Stack width={"50%"}>
        <TableContainer component={"aside"} sx={{ borderRadius: "10px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ borderRadius: "10px" }}>
              <TableRow>
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1
                  }}
                >
                  <img
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7a1cf2fc-158a-47b6-95e1-8d65c992f731/WMNS+AIR+JORDAN+1+MID+SE.png"
                    alt=""
                    width={"90px"}
                    height={"120px"}
                    style={{ borderRadius: "10px" }}
                  />
                  <Typography> Air Jordan 1 Mid SE</Typography>
                </TableCell>
                <TableCell>4,109,000đ</TableCell>
                <TableCell>
                  <QuantitySelector />
                </TableCell>
                <TableCell>4,109,000đ</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Stack direction={"column"} width={"50%"}>
        <Typography variant="h3" sx={{ marginY: "5px" }}>
          total amount
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>Provisional:</Typography>
          <Typography>4,109,000đ</Typography>
        </Stack>
        <Divider sx={{ borderBottomWidth: "1px", marginY: "2px" }} />
      </Stack>
    </Stack>
  );
};

export default Cart;
