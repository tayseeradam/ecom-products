import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"], // fixed underscore
  });

  const plainProduct = JSON.parse(JSON.stringify(product)); // fixed assignment
  return <ProductDetail product={plainProduct} />;
}
