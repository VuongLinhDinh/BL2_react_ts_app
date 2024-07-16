// add types for product here
export interface ProductTs {
  _id: number;
  name: string;
  description: string;
  price: number;
  images: string;
  discount: number;
  rating: number;
  category: {
    _id: number;
    name: string;
  };
  isShow: boolean;
}
