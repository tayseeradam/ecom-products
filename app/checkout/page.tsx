"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store"

export default function CheckoutPage () {

    const {items} = useCartStore();
    const total = items.reduce((acc,item) =>
         acc + item.price * item.quantity, 0

  );

    if(total === 0 || items.length === 0){
    return <div>

        <h1>Your Cart Is Empty</h1>
    </div>
    }

    return 

      <div>
        <h1>checkout</h1>
        <Card>
       <CardHeader>
        <CardTitle>
        Order Summary
        </CardTitle>
       </CardHeader>
        <CardContent>
            <ul>
            {items.map((item, key) => (
                <li key={key}>
                  <div>
                    
                  </div>
                </li>
            ))}
            </ul>
        </CardContent>
        </Card>
        </div>
}