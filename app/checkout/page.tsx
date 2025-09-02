// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useCartStore } from "@/store/cart-store";

// export default function CheckoutPage() {
//   const { items, removeItem, addItem } = useCartStore();

//   const total = items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   if (total === 0 || items.length === 0) {
//     return (
//       <div>
//         <h1>Your Cart is Empty</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//        <h1 className="text-3xl font-bold">Checkout</h1>
//       <Card>
//         <CardHeader>
//           <CardTitle>Order Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul>
//             {items.map((item, key) => (
//               <li key={key}>
//                 <div>
//                   <span>{item.name}</span>
//                   <span>
//                     {((item.price * item.quantity) / 100).toFixed(2)}
//                   </span>
//                 </div>
//                 <div>
//                   <Button variant="outline" onClick={() => removeItem(item.id)}>
//                     -
//                   </Button>
//                   <span className="text-lg font-semibold">{item.quantity}</span>
//                   <Button
//                    type="button"
//                    variant="outline"
//                     onClick={() =>
//                   addItem({
//                   ...item,
//                      quantity: 1, // force adding just one more
//                    })
//                   }
//                   >
//                   +
//               </Button>

//                 </div>
//               </li>
//             ))}
//           </ul>
//         <div>Total:${(total / 100).toFixed(2)}</div>
//         </CardContent>
//       </Card>

//       <form>
//         <Button variant={"default"}>"Prodceed to payment </Button>
//       </form>
//     </div>
//   );
// }



"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutaction } from "./checkout-action";
import { Input } from "postcss";

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();

  // ✅ Dev-only seeding: makes sure checkout UI shows up
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && items.length === 0) {
      addItem({
        id: "dev-test-1",
        name: "Dev Test Product",
        price: 1999, // cents
        quantity: 1,
      });
    }
  }, [items, addItem]);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl mb-4 font-bold">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className=" font-semibold">${((item.price * item.quantity) / 100).toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addItem({
                        ...item,
                        quantity: 1, // add one more
                      })
                    }
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t  pt-2 text-lg font-semibold">
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <form  action={checkoutaction}className="max-w-md mx-auto ">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button variant="default" type="submit" className="w-full">
          Proceed to payment
        </Button>

        {/* <Button onClick={() => clearCart()} type="submit" className="w-full">
          Clear Cart 
        </Button> */}
      </form>
    </div>
  );
}



