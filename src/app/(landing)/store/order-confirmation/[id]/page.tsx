"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Mail,
  Download,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface Order {
  id: string;
  items: Array<{
    productId: string;
    variantIndex: number;
    size: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
      colorName: string;
      colorHex: string;
    };
  }>;
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  shippingMethod: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o: Order) => o.id === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Redirect if order not found
      router.push("/store");
    }
  }, [orderId, router]);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package
            size={80}
            className="mx-auto text-zinc-700 mb-6 animate-pulse"
          />
          <p className="text-zinc-500 font-mono">Loading order details...</p>
        </div>
      </div>
    );
  }

  const paymentMethodLabels = {
    "credit-card": "Credit/Debit Card",
    "e-wallet": "E-Wallet",
    "bank-transfer": "Bank Transfer",
  };

  const shippingMethodLabels = {
    standard: "Standard Shipping (5-7 days)",
    express: "Express Shipping (2-3 days)",
    overnight: "Overnight Shipping (Next day)",
  };

  const estimatedDelivery = new Date(order.createdAt);
  if (order.shippingMethod === "overnight") {
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 1);
  } else if (order.shippingMethod === "express") {
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
  } else {
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Success Header */}
      <div className="border-b border-zinc-800 bg-gradient-to-b from-green-950/20 to-transparent">
        <div className="max-w-4xl mx-auto px-8 py-12 text-center">
          <CheckCircle2 size={80} className="mx-auto text-green-500 mb-6" />
          <h1 className="text-5xl font-bold italic mb-4">ORDER CONFIRMED!</h1>
          <p className="text-zinc-400 font-mono mb-2">
            Thank you for your order. We've sent a confirmation to
          </p>
          <p className="text-blue-600 font-mono font-bold">
            {order.shippingInfo.email}
          </p>
          <div className="mt-6 inline-block bg-zinc-900 border border-zinc-800 rounded-lg px-6 py-3">
            <p className="text-sm text-zinc-500 font-mono mb-1">ORDER ID</p>
            <p className="text-2xl font-bold font-mono">{order.id}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Order Timeline */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Order Status</h2>
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-800 -z-10"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <span className="text-xs font-mono text-green-500">
                CONFIRMED
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                <Package size={20} />
              </div>
              <span className="text-xs font-mono text-zinc-500">
                PROCESSING
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                <Truck size={20} />
              </div>
              <span className="text-xs font-mono text-zinc-500">SHIPPED</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <span className="text-xs font-mono text-zinc-500">DELIVERED</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-950/20 border border-blue-600/30 rounded-lg">
            <p className="text-sm">
              <span className="font-bold">Estimated Delivery:</span>{" "}
              <span className="text-blue-600">
                {estimatedDelivery.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Shipping Information */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold">Shipping Address</h2>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-bold">
                {order.shippingInfo.firstName} {order.shippingInfo.lastName}
              </p>
              <p className="text-zinc-400">{order.shippingInfo.address}</p>
              <p className="text-zinc-400">
                {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
                {order.shippingInfo.postalCode}
              </p>
              <p className="text-zinc-400">{order.shippingInfo.country}</p>
              <Separator className="my-3" />
              <p className="text-zinc-400">{order.shippingInfo.phone}</p>
              <p className="text-zinc-400">{order.shippingInfo.email}</p>
            </div>
          </div>

          {/* Payment & Shipping Method */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={20} className="text-blue-600" />
                <h2 className="text-lg font-bold">Payment Method</h2>
              </div>
              <p className="text-sm">
                {
                  paymentMethodLabels[
                    order.paymentMethod as keyof typeof paymentMethodLabels
                  ]
                }
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Truck size={20} className="text-blue-600" />
                <h2 className="text-lg font-bold">Shipping Method</h2>
              </div>
              <p className="text-sm">
                {
                  shippingMethodLabels[
                    order.shippingMethod as keyof typeof shippingMethodLabels
                  ]
                }
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 bg-zinc-800 rounded-lg"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-700 flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{item.product.name}</h3>
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
                      Size: {item.size}
                    </span>
                    <span className="text-xs text-zinc-600">•</span>
                    <span className="text-xs text-zinc-400">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    Rp{" "}
                    {(item.product.price * item.quantity).toLocaleString(
                      "id-ID",
                    )}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-zinc-500">
                      Rp {item.product.price.toLocaleString("id-ID")} each
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Order Summary */}
          <div className="space-y-3 text-sm max-w-md ml-auto">
            <div className="flex justify-between">
              <span className="text-zinc-400 font-mono">Subtotal</span>
              <span>Rp {order.subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 font-mono">Shipping</span>
              <span
                className={order.shippingCost === 0 ? "text-green-500" : ""}
              >
                {order.shippingCost === 0
                  ? "FREE"
                  : `Rp ${order.shippingCost.toLocaleString("id-ID")}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 font-mono">Tax (PPN 11%)</span>
              <span>Rp {order.tax.toLocaleString("id-ID")}</span>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-bold">
              <span className="font-mono">TOTAL</span>
              <span>Rp {order.total.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/store" className="flex-1">
            <Button variant="outline" className="w-full font-mono">
              <ArrowLeft className="mr-2" size={18} />
              CONTINUE SHOPPING
            </Button>
          </Link>
          <Button
            variant="outline"
            className="flex-1 font-mono"
            onClick={() => {
              toast.success("Invoice download will be available soon");
            }}
          >
            <Download className="mr-2" size={18} />
            DOWNLOAD INVOICE
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-lg text-center">
          <Mail size={32} className="mx-auto text-blue-600 mb-4" />
          <h3 className="font-bold mb-2">Need Help?</h3>
          <p className="text-sm text-zinc-400 mb-4">
            If you have any questions about your order, please contact our
            support team
          </p>
          <Button variant="outline" className="font-mono">
            CONTACT SUPPORT
          </Button>
        </div>
      </div>
    </div>
  );
}
