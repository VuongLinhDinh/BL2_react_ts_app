export type ICartItem = {
  product: {
    _id: string | number;
    images: string;
    name: string;
    price: number;
  };
  quantity: number;
};
