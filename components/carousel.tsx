// "use client";

// import { useEffect, useState } from "react"
// import Stripe from "stripe"
// import { clearInterval } from "timers";
// import {Card, CardContent} from "./ui/card";
// import Image from "next/image";

// interface Props {
//     products:Stripe.Product
// }


// export const Carousel = ({products}:Props) =>{
//  const [ current,seCurrent] = useState<number>(0);

//  useEffect(() =>{
//     const interval =setInterval(() => {
//         setCurrent((prev) => (prev +1) % products.length);
//     }, 3000);

//     return() => clearInterval(interval);
//  }, [products.length]);

//  const currentProduct = products[current];
// const price = currentProduct.default_price as Stripe.Price;

//     return  <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">{currentProduct.images && currentProduct.images(0) &&(
//             <div className="relative h-80w-full">
//         <Image 
//          alt={currentProduct.name}
//           src={currentProduct.images[0]}
//            layout="fill"
//            objectFit="cover"
//            className="transition-opcity duration-500 ease-in-out"/>
//      </div>
//     )}
//     <CardContent  className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-op">
//         <CardTitle className="text-3xlf font-bold text-white mb-2">{currentProduct.name}</CardTitle>
//         {price && price.unit_amount &&
//           (<p>${(price.unit_amount/10).toFixed(2)}</p>)}
//     </CardContent>
//      </Card>
// };


"use client";

import { useEffect, useState } from "react";
import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];

  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-80 w-full">
          <Image
            alt={currentProduct.name}
            src={currentProduct.images[0]}
           layout="fill"
           objectFit="cover"
            className="object-cover transition-opacity duration-500 ease-in-out"
          />
        </div>
      )}
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <CardTitle className="text-3xl font-bold text-white mb-2">
          {currentProduct.name}
        </CardTitle>
          {price && price.unit_amount && (
          <p className="text-white text-lg">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
