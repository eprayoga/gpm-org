"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/product-data";
import { useCartStore } from "@/store/useCartStore";
import { CartItemWithProduct } from "@/types/store.types";
import {
  Building2,
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  Package,
  Truck,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Indonesia",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);

  // Get cart items with product details
  const cartItemsWithProducts: CartItemWithProduct[] = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;

      const variant = product.variants[item.variantIndex];
      const size = variant.sizes.find((s) => s.size === item.size);

      return {
        ...item,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: variant.images[0] || "/images/products/placeholder.png",
          colorName: variant.color.name,
          colorHex: variant.color.hex,
          tech: product.tech,
          stock: size?.stock || 0,
        },
      };
    })
    .filter(Boolean) as CartItemWithProduct[];

  const subtotal = getCartTotal(products);

  const shippingCosts = {
    standard: 0,
    express: 50000,
    overnight: 100000,
  };

  const shippingCost =
    shippingCosts[shippingMethod as keyof typeof shippingCosts];
  const tax = Math.round(subtotal * 0.11); // PPN 11%
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
    ];

    for (const field of required) {
      if (!shippingInfo[field as keyof typeof shippingInfo]) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
        );
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Phone validation
    if (shippingInfo.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order object
    const order = {
      id: `ORD-${Date.now()}`,
      items: cartItemsWithProducts,
      shippingInfo,
      paymentMethod,
      shippingMethod,
      subtotal,
      shippingCost,
      tax,
      total,
      createdAt: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    clearCart();

    toast.success("Order placed successfully!", {
      description: `Order ID: ${order.id}`,
    });

    setIsProcessing(false);

    // Redirect to order confirmation
    router.push(`/store/order-confirmation/${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package size={80} className="mx-auto text-zinc-700 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-zinc-500 mb-6 font-mono">
            Add some items to your cart to checkout
          </p>
          <Link href="/store">
            <Button className="font-mono">START SHOPPING</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-zinc-800 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-4">
            <Link href="/store" className="hover:text-white transition-colors">
              STORE
            </Link>
            <ChevronRight size={16} />
            <Link href="/cart" className="hover:text-white transition-colors">
              CART
            </Link>
            <ChevronRight size={16} />
            <span className="text-white">CHECKOUT</span>
          </div>
          <h1 className="text-5xl font-bold italic">CHECKOUT</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Shipping Information</h2>
                  <p className="text-sm text-zinc-500 font-mono">
                    Where should we send your order?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="font-mono text-xs">
                    FIRST NAME *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="font-mono text-xs">
                    LAST NAME *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-mono text-xs">
                    EMAIL *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-mono text-xs">
                    PHONE *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="+62 812 3456 7890"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address" className="font-mono text-xs">
                    ADDRESS *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="Jl. Sudirman No. 123"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="font-mono text-xs">
                    CITY *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="Jakarta"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="font-mono text-xs">
                    STATE/PROVINCE *
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="DKI Jakarta"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode" className="font-mono text-xs">
                    POSTAL CODE *
                  </Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="12345"
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="font-mono text-xs">
                    COUNTRY *
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    className="mt-2"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Truck size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Shipping Method</h2>
                  <p className="text-sm text-zinc-500 font-mono">
                    How fast do you need it?
                  </p>
                </div>
              </div>

              <RadioGroup
                value={shippingMethod}
                onValueChange={setShippingMethod}
              >
                <div className="space-y-3">
                  <div
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      shippingMethod === "standard"
                        ? "border-blue-600 bg-blue-600/10"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                    onClick={() => setShippingMethod("standard")}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="standard" id="standard" />
                      <div>
                        <Label
                          htmlFor="standard"
                          className="font-bold cursor-pointer"
                        >
                          Standard Shipping
                        </Label>
                        <p className="text-xs text-zinc-500 font-mono">
                          5-7 business days
                        </p>
                      </div>
                    </div>
                    <span className="text-green-500 font-bold font-mono">
                      FREE
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      shippingMethod === "express"
                        ? "border-blue-600 bg-blue-600/10"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                    onClick={() => setShippingMethod("express")}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="express" id="express" />
                      <div>
                        <Label
                          htmlFor="express"
                          className="font-bold cursor-pointer"
                        >
                          Express Shipping
                        </Label>
                        <p className="text-xs text-zinc-500 font-mono">
                          2-3 business days
                        </p>
                      </div>
                    </div>
                    <span className="font-bold font-mono">
                      Rp {shippingCosts.express.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      shippingMethod === "overnight"
                        ? "border-blue-600 bg-blue-600/10"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                    onClick={() => setShippingMethod("overnight")}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <div>
                        <Label
                          htmlFor="overnight"
                          className="font-bold cursor-pointer"
                        >
                          Overnight Shipping
                        </Label>
                        <p className="text-xs text-zinc-500 font-mono">
                          Next day delivery
                        </p>
                      </div>
                    </div>
                    <span className="font-bold font-mono">
                      Rp {shippingCosts.overnight.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Method */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Payment Method</h2>
                  <p className="text-sm text-zinc-500 font-mono">
                    All transactions are secure and encrypted
                  </p>
                </div>
              </div>

              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <div className="space-y-3">
                  <div
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "credit-card"
                        ? "border-blue-600 bg-blue-600/10"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                    onClick={() => setPaymentMethod("credit-card")}
                  >
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <CreditCard size={20} />
                    <Label
                      htmlFor="credit-card"
                      className="font-bold cursor-pointer"
                    >
                      Credit / Debit Card
                    </Label>
                  </div>

                  <div
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "e-wallet"
                        ? "border-blue-600 bg-blue-600/10"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                    onClick={() => setPaymentMethod("e-wallet")}
                  >
                    <RadioGroupItem value="e-wallet" id="e-wallet" />
                    <Wallet size={20} />
                    <Label
                      htmlFor="e-wallet"
                      className="font-bold cursor-pointer"
                    >
                      E-Wallet (GoPay, OVO, Dana)
                    </Label>
                  </div>

                  <div
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "bank-transfer"
                        ? "border-blue-600 bg-blue-600/10"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                    onClick={() => setPaymentMethod("bank-transfer")}
                  >
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Building2 size={20} />
                    <Label
                      htmlFor="bank-transfer"
                      className="font-bold cursor-pointer"
                    >
                      Bank Transfer
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              <div className="mt-6 p-4 bg-zinc-800 rounded-lg flex items-start gap-3">
                <Lock size={16} className="text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-bold">Secure Payment</p>
                  <p className="text-xs text-zinc-400">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItemsWithProducts.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantIndex}-${item.size}`}
                    className="flex gap-4"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-1 right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm line-clamp-2">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-4 h-4 rounded-full border border-zinc-600"
                          style={{ backgroundColor: item.product.colorHex }}
                        />
                        <span className="text-xs text-zinc-400">
                          {item.product.colorName}
                        </span>
                        <span className="text-xs text-zinc-600">•</span>
                        <span className="text-xs text-zinc-400">
                          {item.size}
                        </span>
                      </div>
                      <p className="text-sm font-bold mt-2">
                        Rp{" "}
                        {(item.product.price * item.quantity).toLocaleString(
                          "id-ID",
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-mono">Subtotal</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-mono">Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-500" : ""}>
                    {shippingCost === 0
                      ? "FREE"
                      : `Rp ${shippingCost.toLocaleString("id-ID")}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-mono">Tax (PPN 11%)</span>
                  <span>Rp {tax.toLocaleString("id-ID")}</span>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold">
                  <span className="font-mono">TOTAL</span>
                  <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                className="w-full mt-6 py-6 text-lg font-bold font-mono"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? "PROCESSING..." : "PLACE ORDER"}
              </Button>

              <p className="text-xs text-zinc-500 text-center mt-4 font-mono">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
