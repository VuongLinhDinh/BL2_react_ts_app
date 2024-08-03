import { useContext } from "react";
import { CartContext, CartContextProps } from "src/contexts/CardContext";

export const useCart: () => CartContextProps = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
