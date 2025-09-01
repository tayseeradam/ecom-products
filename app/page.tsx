import { Carousel } from "@/components/carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {

  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit:5,
  });

  console.log(products);
  return (
    <div>
      <section className="rounded bg-neutral-100 px-8 sm:py-12">
        <div className=" mx-auto grid grid-cols-1 items-center justify-items-center gap-8 sm:scroll-px-16">
      <div className="max-w-md space-y-4">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl flex">Welcome to My Ecommerce 🛒</h2>
        <p className="text-neutral-600">Discover the latest products at the best prices</p>
        <Button
         asChild
          variant="default"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-3xl"
          >
         <Link href="/products"
          className="inline-flex items-center justify-center rounded-full px-6 py-3">
            Browse All Products</Link>
       
        </Button> 
        </div>
        <Image
         alt="Hero Image" 
         className="rounded"
         width={450} height={450} 
        src={products.data[0].images[0]}/>
       </div>
    </section>
    <section className="py-8">
     <Carousel products={products.data} />
      </section>
    </div>
  );
}
