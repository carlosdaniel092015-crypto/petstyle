import { ProductType } from "@/types/product";

interface ProductPreviewProps {
  productType: ProductType;
  material: string;
  color: string;
  pattern: string;
  name?: string;
  hasName: boolean;
}

export const ProductPreview = ({ productType, material, color, pattern, name, hasName }: ProductPreviewProps) => {
  const getMaterialImage = () => {
    const materialImagesMap: Record<ProductType, Record<string, string>> = {
      collar: {
        nylon: "/src/assets/materials/collar-nylon.png",
        leather: "/src/assets/materials/collar-leather.png",
        polyester: "/src/assets/materials/collar-polyester.png",
        cotton: "/src/assets/materials/collar-cotton.png",
      },
      "collar-with-tag": {
        nylon: "/src/assets/materials/collar-with-tag-nylon.png",
        leather: "/src/assets/materials/collar-with-tag-leather.png",
        polyester: "/src/assets/materials/collar-with-tag-polyester.png",
        cotton: "/src/assets/materials/collar-with-tag-cotton.png",
      },
      leash: {
        nylon: "/src/assets/materials/leash-nylon.png",
        leather: "/src/assets/materials/leash-leather.png",
        polyester: "/src/assets/materials/leash-polyester.png",
        cotton: "/src/assets/materials/leash-cotton.png",
      },
      tag: {
        nylon: "/src/assets/materials/tag-metal.png",
        leather: "/src/assets/materials/tag-metal.png",
        polyester: "/src/assets/materials/tag-metal.png",
        cotton: "/src/assets/materials/tag-metal.png",
      },
    };

    return materialImagesMap[productType]?.[material] || materialImagesMap[productType]?.nylon;
  };
  const getPatternStyle = () => {
    const baseStyle = {
      filter: `hue-rotate(${getHueRotation(color)}deg) saturate(1.5)`,
    };

    return baseStyle;
  };

  const getHueRotation = (color: string) => {
    const colorMap: { [key: string]: number } = {
      "#EF4444": 0,
      "#3B82F6": 220,
      "#10B981": 140,
      "#EC4899": 330,
      "#A855F7": 270,
      "#F97316": 30,
      "#FACC15": 50,
      "#1F2937": 0,
    };
    return colorMap[color] || 0;
  };

  const getPatternOverlay = () => {
    if (pattern === "plain") return null;

    const patterns: { [key: string]: string } = {
      stripes: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.2) 8px, rgba(0,0,0,0.2) 16px)",
      dots: "radial-gradient(circle, rgba(0,0,0,0.2) 20%, transparent 20%), radial-gradient(circle, rgba(0,0,0,0.2) 20%, transparent 20%)",
      hearts: "url('data:image/svg+xml,%3Csvg width=\"50\" height=\"50\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M25,45 C25,45 8,32 8,18 C8,12 12,8 17,8 C21,8 24,11 25,15 C26,11 29,8 33,8 C38,8 42,12 42,18 C42,32 25,45 25,45 Z\" fill=\"rgba(0,0,0,0.2)\"/%3E%3C/svg%3E')",
      paws: "url('data:image/svg+xml,%3Csvg width=\"50\" height=\"50\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"25\" cy=\"32\" r=\"10\" fill=\"rgba(0,0,0,0.2)\"/%3E%3Ccircle cx=\"15\" cy=\"20\" r=\"6\" fill=\"rgba(0,0,0,0.2)\"/%3E%3Ccircle cx=\"35\" cy=\"20\" r=\"6\" fill=\"rgba(0,0,0,0.2)\"/%3E%3Ccircle cx=\"18\" cy=\"10\" r=\"5\" fill=\"rgba(0,0,0,0.2)\"/%3E%3Ccircle cx=\"32\" cy=\"10\" r=\"5\" fill=\"rgba(0,0,0,0.2)\"/%3E%3C/svg%3E')",
      bones: "url('data:image/svg+xml,%3Csvg width=\"50\" height=\"50\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect x=\"20\" y=\"15\" width=\"10\" height=\"20\" fill=\"rgba(0,0,0,0.2)\" rx=\"2\"/%3E%3Ccircle cx=\"25\" cy=\"12\" r=\"5\" fill=\"rgba(0,0,0,0.2)\"/%3E%3Ccircle cx=\"25\" cy=\"38\" r=\"5\" fill=\"rgba(0,0,0,0.2)\"/%3E%3C/svg%3E')",
    };

    return (
      <div
        className="absolute inset-0 pointer-events-none z-20 mix-blend-multiply"
        style={{
          backgroundImage: patterns[pattern],
          backgroundSize: pattern === "dots" ? "40px 40px, 40px 40px" : "60px 60px",
          backgroundPosition: pattern === "dots" ? "0 0, 20px 20px" : "0 0",
        }}
      />
    );
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden shadow-[var(--shadow-medium)]">
        <img
          src={getMaterialImage()}
          alt="Product preview"
          className="w-full h-full object-contain relative z-10"
          style={getPatternStyle()}
        />
        {getPatternOverlay()}
      </div>
      {hasName && name && (
        <div className="mt-4 p-4 bg-card rounded-lg shadow-[var(--shadow-soft)] border border-border">
          <p className="text-sm text-muted-foreground mb-1">Nombre en la plaquita:</p>
          <p className="text-2xl font-bold text-primary text-center">{name}</p>
        </div>
      )}
    </div>
  );
};
