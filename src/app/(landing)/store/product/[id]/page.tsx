import { notFound } from "next/navigation";
import { products } from "@/data/product-data";
import ProductDetailPage from "@/components/features/store/product-detail-page";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Store`,
    description: product.description,
  };
}
