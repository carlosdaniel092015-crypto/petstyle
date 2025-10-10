interface ProductPreviewProps {
  image: string;
  color: string;
  pattern: string;
  name?: string;
  hasName: boolean;
}

export const ProductPreview = ({ image, color, pattern, name, hasName }: ProductPreviewProps) => {
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
      stripes: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.15) 10px, rgba(0,0,0,0.15) 20px)",
      dots: "radial-gradient(circle, rgba(0,0,0,0.15) 25%, transparent 25%), radial-gradient(circle, rgba(0,0,0,0.15) 25%, transparent 25%)",
      hearts: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M20,35 C20,35 5,25 5,15 C5,10 8,7 12,7 C15,7 18,9 20,12 C22,9 25,7 28,7 C32,7 35,10 35,15 C35,25 20,35 20,35 Z\" fill=\"rgba(0,0,0,0.15)\"/%3E%3C/svg%3E')",
      paws: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"20\" cy=\"25\" r=\"8\" fill=\"rgba(0,0,0,0.15)\"/%3E%3Ccircle cx=\"12\" cy=\"15\" r=\"5\" fill=\"rgba(0,0,0,0.15)\"/%3E%3Ccircle cx=\"28\" cy=\"15\" r=\"5\" fill=\"rgba(0,0,0,0.15)\"/%3E%3Ccircle cx=\"15\" cy=\"8\" r=\"4\" fill=\"rgba(0,0,0,0.15)\"/%3E%3Ccircle cx=\"25\" cy=\"8\" r=\"4\" fill=\"rgba(0,0,0,0.15)\"/%3E%3C/svg%3E')",
      bones: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect x=\"15\" y=\"12\" width=\"10\" height=\"16\" fill=\"rgba(0,0,0,0.15)\" rx=\"2\"/%3E%3Ccircle cx=\"20\" cy=\"10\" r=\"4\" fill=\"rgba(0,0,0,0.15)\"/%3E%3Ccircle cx=\"20\" cy=\"30\" r=\"4\" fill=\"rgba(0,0,0,0.15)\"/%3E%3C/svg%3E')",
    };

    return (
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          backgroundImage: patterns[pattern],
          backgroundSize: pattern === "dots" ? "30px 30px, 30px 30px" : "50px 50px",
          backgroundPosition: pattern === "dots" ? "0 0, 15px 15px" : "0 0",
        }}
      />
    );
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden shadow-[var(--shadow-medium)]">
        <img
          src={image}
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
