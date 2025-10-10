import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }

    let message = "¡Hola! Me gustaría hacer un pedido:%0A%0A";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}%0A`;
      message += `   Cantidad: ${item.quantity}%0A`;
      message += `   Color: ${colorOptions.find((c) => c.value === item.customization.color)?.label}%0A`;
      message += `   Estampado: ${patternOptions.find((p) => p.value === item.customization.pattern)?.label}%0A`;
      if (item.customization.name) {
        message += `   Nombre: ${item.customization.name}%0A`;
      }
      message += `   Precio: $${(item.price * item.quantity).toFixed(2)}%0A%0A`;
    });

    message += `Total: $${getTotalPrice().toFixed(2)}`;

    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const colorOptions = [
    { id: "red", label: "Rojo", value: "#EF4444" },
    { id: "blue", label: "Azul", value: "#3B82F6" },
    { id: "green", label: "Verde", value: "#10B981" },
    { id: "pink", label: "Rosa", value: "#EC4899" },
    { id: "purple", label: "Morado", value: "#A855F7" },
    { id: "orange", label: "Naranja", value: "#F97316" },
    { id: "yellow", label: "Amarillo", value: "#FACC15" },
    { id: "black", label: "Negro", value: "#1F2937" },
  ];

  const patternOptions = [
    { id: "solid", label: "Sólido", value: "solid" },
    { id: "stripes", label: "Rayas", value: "stripes" },
    { id: "dots", label: "Puntos", value: "dots" },
    { id: "hearts", label: "Corazones", value: "hearts" },
    { id: "paws", label: "Huellas", value: "paws" },
    { id: "bones", label: "Huesos", value: "bones" },
  ];

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-8">
              ¡Agrega algunos productos personalizados para tu mascota!
            </p>
            <Button variant="hero" onClick={() => navigate("/")}>
              Explorar Productos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continuar Comprando
        </Button>

        <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">
                        {item.product.name}
                      </h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                          Color:{" "}
                          {colorOptions.find((c) => c.value === item.customization.color)?.label}
                        </p>
                        <p>
                          Estampado:{" "}
                          {patternOptions.find((p) => p.value === item.customization.pattern)?.label}
                        </p>
                        {item.customization.name && (
                          <p>Nombre: {item.customization.name}</p>
                        )}
                      </div>
                      <p className="font-bold text-primary mt-2">
                        ${item.price.toFixed(2)} c/u
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Resumen del Pedido</h2>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product.name} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="cart"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Ordenar por WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
