import { createContext, useState, ReactNode } from "react";
import { ProductTs } from "src/types/Product";
import instance from "src/axious"; // Import your axios instance

interface CartProduct {
  product: ProductTs;
  quantity: number;
}

export interface CartContextProps {
  cart: CartProduct[];
  addToCart: (product: ProductTs, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const addToCart = async (product: ProductTs, quantity: number) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.product._id === product._id
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });

    try {
      await instance.post("/cart", { productId: product._id, quantity });
    } catch (error) {
      console.error("Failed to add to cart in the database", error);
    }
  };

  const removeFromCart = (productId: string | number) => {
    setCart((prevCart: CartProduct[]) =>
      prevCart.filter((item) => item.product._id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
