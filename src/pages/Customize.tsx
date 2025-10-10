import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ProductPreview } from "@/components/ProductPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, colorOptions, patternOptions } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { ArrowLeft, ShoppingCart } from "lucide-react";

const Customize = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === productId);

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedPattern, setSelectedPattern] = useState(patternOptions[0]);
  const [petName, setPetName] = useState("");

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const calculatePrice = () => {
    return product.basePrice + selectedColor.priceModifier + selectedPattern.priceModifier;
  };

  const handleAddToCart = () => {
    if (product.hasName && !petName.trim()) {
      toast.error("Por favor ingresa el nombre de tu mascota");
      return;
    }

    addToCart({
      id: "",
      product,
      customization: {
        color: selectedColor.value,
        pattern: selectedPattern.value,
        name: product.hasName ? petName : undefined,
      },
      price: calculatePrice(),
      quantity: 1,
    });

    toast.success("¡Producto agregado al carrito!");
  };

  const handleContinueShopping = () => {
    handleAddToCart();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Product Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <ProductPreview
              image={product.image}
              color={selectedColor.value}
              pattern={selectedPattern.value}
              name={petName}
              hasName={product.hasName}
            />
          </div>

          {/* Right: Customization Options */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              <p className="text-3xl font-bold text-primary">${calculatePrice().toFixed(2)}</p>
            </div>

            {/* Color Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Color</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`relative aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedColor.id === color.id
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-border"
                      }`}
                      style={{ backgroundColor: color.value }}
                    >
                      <span className="sr-only">{color.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Seleccionado: {selectedColor.label}
                </p>
              </CardContent>
            </Card>

            {/* Pattern Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Estampado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {patternOptions.map((pattern) => (
                    <button
                      key={pattern.id}
                      onClick={() => setSelectedPattern(pattern)}
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedPattern.id === pattern.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card"
                      }`}
                    >
                      <p className="font-medium">{pattern.label}</p>
                      {pattern.priceModifier > 0 && (
                        <p className="text-sm text-muted-foreground">
                          +${pattern.priceModifier.toFixed(2)}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Name Input (only for products with name) */}
            {product.hasName && (
              <Card>
                <CardHeader>
                  <CardTitle>Nombre de tu mascota</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="petName">Nombre</Label>
                  <Input
                    id="petName"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Ej: Max"
                    className="mt-2"
                    maxLength={15}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Máximo 15 caracteres
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                variant="hero"
                size="lg"
                onClick={handleAddToCart}
                className="w-full"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al Carrito
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleContinueShopping}
                className="w-full"
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
