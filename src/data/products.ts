import { Product } from "@/types/product";
import collarWithTag from "@/assets/collar-with-tag.png";
import collarOnly from "@/assets/collar-only.png";
import nameTag from "@/assets/name-tag.png";
import leash from "@/assets/leash.png";

export const products: Product[] = [
  {
    id: "collar-with-tag",
    name: "Collar con Plaquita",
    type: "collar-with-tag",
    basePrice: 25.00,
    image: collarWithTag,
    description: "Collar personalizado con plaquita incluida, perfecto para identificar a tu mascota con estilo",
    hasName: true,
  },
  {
    id: "collar-only",
    name: "Collar",
    type: "collar",
    basePrice: 15.00,
    image: collarOnly,
    description: "Collar resistente y cómodo para tu mascota",
    hasName: false,
  },
  {
    id: "name-tag",
    name: "Plaquita",
    type: "tag",
    basePrice: 12.00,
    image: nameTag,
    description: "Plaquita personalizada con el nombre de tu mascota",
    hasName: true,
  },
  {
    id: "leash",
    name: "Correa",
    type: "leash",
    basePrice: 18.00,
    image: leash,
    description: "Correa resistente y cómoda para pasear a tu mascota",
    hasName: false,
  },
];

export const colorOptions = [
  { id: "red", label: "Rojo", value: "#EF4444", priceModifier: 0 },
  { id: "blue", label: "Azul", value: "#3B82F6", priceModifier: 0 },
  { id: "green", label: "Verde", value: "#10B981", priceModifier: 0 },
  { id: "pink", label: "Rosa", value: "#EC4899", priceModifier: 0 },
  { id: "purple", label: "Morado", value: "#A855F7", priceModifier: 0 },
  { id: "orange", label: "Naranja", value: "#F97316", priceModifier: 0 },
  { id: "yellow", label: "Amarillo", value: "#FACC15", priceModifier: 0 },
  { id: "black", label: "Negro", value: "#1F2937", priceModifier: 0 },
];

export const materialOptions = [
  { id: "nylon", label: "Nylon", value: "nylon", priceModifier: 0 },
  { id: "leather", label: "Cuero", value: "leather", priceModifier: 5 },
  { id: "polyester", label: "Poliéster", value: "polyester", priceModifier: 2 },
  { id: "cotton", label: "Algodón", value: "cotton", priceModifier: 3 },
];

export const patternOptions = [
  { id: "plain", label: "Liso", value: "plain", priceModifier: 0 },
  { id: "stripes", label: "Rayas", value: "stripes", priceModifier: 2 },
  { id: "dots", label: "Puntos", value: "dots", priceModifier: 2 },
  { id: "hearts", label: "Corazones", value: "hearts", priceModifier: 3 },
  { id: "paws", label: "Huellas", value: "paws", priceModifier: 3 },
  { id: "bones", label: "Huesos", value: "bones", priceModifier: 3 },
];
