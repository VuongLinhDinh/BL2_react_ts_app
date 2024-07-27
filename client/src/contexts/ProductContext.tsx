import React, { createContext } from "react";
import useProduct from "src/hooks/useProduct";
import { Action } from "src/reducers/ProductReducer";
import { ProductTs } from "src/types/Product";

export type ProductContextType = {
  state: { products: ProductTs[] };
  dispatch: React.Dispatch<Action>;
  removeProduct: (id: number | string) => Promise<void>;
  handleProduct: (product: ProductTs) => Promise<void>;
};

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, dispatch, removeProduct, handleProduct } = useProduct();

  return (
    <ProductContext.Provider
      value={{ state, dispatch, removeProduct, handleProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
