import axios from "axios";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import instance from "src/axious";
import productReducer from "src/reducers/ProductReducer";
import { ProductTs } from "src/types/Product";

const useProduct = () => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  const nav = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await instance.get("/products");
        dispatch({ type: "GET_PRODUCTS", payload: data.data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error?.response?.data?.message || "An error occurred");
        } else {
          console.log("An unexpected error occurred");
        }
      }
    };

    fetchProducts();
  }, [nav]);

  const removeProduct = async (id: number | string) => {
    try {
      await instance.delete(`/products/${id}`);
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const handleProduct = async (product: ProductTs) => {
    try {
      if (product._id) {
        const { data } = await instance.patch(
          `/products/${product._id}`,
          product
        );
        dispatch({ type: "EDIT_PRODUCT", payload: data.data });
        alert(data.message);
      } else {
        const { data } = await instance.post("/products", product);
        dispatch({ type: "ADD_PRODUCT", payload: data.data });
        alert(data.message);
      }
      nav("/admin");
    } catch (error) {
      console.error("Error handling product:", error);
    }
  };

  return {
    state,
    dispatch,
    removeProduct,
    handleProduct
  };
};

export default useProduct;
