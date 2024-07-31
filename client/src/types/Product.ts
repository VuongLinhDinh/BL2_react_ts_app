// add types for product here
export interface ProductTs {
  _id: number;
  name: string;
  description: string;
  price: number;
  images: string;
  discount: number;
  rating: number;
  slug: string;
  category: {
    _id: number;
    name: string;
    description: string;
    isHidden: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
  isShow: boolean;
}
