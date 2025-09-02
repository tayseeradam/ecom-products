"use server";


import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";

export const checkoutaction = async (formData: FormData): Promise<void> => {
  const itemsJSON = formData.get("items") as string;

  const items = JSON.parse(itemsJSON);
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "cad", 
      product_data: { name: item.name },
      unit_amount: item.price, 
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items, 
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  redirect(session.url!);
};
