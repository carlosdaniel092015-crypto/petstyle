export type ProductType = "collar" | "tag" | "collar-with-tag" | "leash";

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  basePrice: number;
  image: string;
  description: string;
  hasName: boolean;
}

export interface CustomizationOption {
  id: string;
  label: string;
  value: string;
  priceModifier: number;
  preview?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  customization: {
    color: string;
    pattern: string;
    material: string;
    name?: string;
  };
  price: number;
  quantity: number;
}
