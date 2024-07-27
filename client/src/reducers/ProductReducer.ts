import { ProductTs } from "src/types/Product";

type State = {
  products: ProductTs[];
};

export type Action =
  | { type: "GET_PRODUCTS"; payload: ProductTs[] }
  | { type: "DELETE_PRODUCT"; payload: number | string }
  | { type: "ADD_PRODUCT"; payload: ProductTs }
  | { type: "EDIT_PRODUCT"; payload: ProductTs };

const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        )
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        )
      };
    default:
      return state;
  }
};

export default productReducer;
