import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/features/products/components/product-detail-page";
import { getProductDetailBySlug, getRelatedProducts as getMockRelatedProducts } from "@/features/products/data/product-details";
import { mapWooCommerceProduct, mapWooCommerceProductDetail } from "@/features/products/woocommerce-mapper";
import { getProductBySlug, getRelatedProducts as getWooRelatedProducts } from "@/features/products/woocommerce-service";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (product) {
    const relatedProducts = await getWooRelatedProducts(product).catch(() => []);

    return <ProductDetailPage product={mapWooCommerceProductDetail(product)} relatedProducts={relatedProducts.map(mapWooCommerceProduct)} />;
  }

  const mockProduct = getProductDetailBySlug(slug);

  if (!mockProduct) {
    notFound();
  }

  return <ProductDetailPage product={mockProduct} relatedProducts={getMockRelatedProducts(mockProduct)} />;
}
