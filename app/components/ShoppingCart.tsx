'use client'

import { useProductContext } from "@/context/use-products";
import { useShoppingCartContext } from "@/context/use-shopping-cart";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function ShoppingCart() {

    const [opened, setOpened] = useState<boolean>(false);
    const { items, itemCount } = useShoppingCartContext();
    const { products } = useProductContext();

    const lineItemsFromShoppingCartItems = useMemo(() => {
        return items.map(item => {
            const product = products.find(p => p.id === item.id)
            return {
                price: product?.default_price,
                quantity: `${item.quantity}`,
            }
        })
    }, [items, products])

    const checkout = async () => {
        try {
            const response = await fetch('api/checkout', {
                method: 'POST',
                body: JSON.stringify({ cartItems: lineItemsFromShoppingCartItems })
            })
            const responseData = await response.json()
            if (responseData.url) {
                window.location.href = responseData.url
            } else {
                console.error('Create checkout error: No url in response data')
            }
        } catch (e: any) {
            console.error('Create checkout error: ', e.message)
        }
    }

    return (
        <div className="relative flex items-center">
            <button className="ml-auto" onClick={() => setOpened(!opened)}>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"><path d="M4.78571 5H18.2251C19.5903 5 20.5542 6.33739 20.1225 7.63246L18.4558 12.6325C18.1836 13.4491 17.4193 14 16.5585 14H6.07142M4.78571 5L4.74531 4.71716C4.60455 3.73186 3.76071 3 2.76541 3H2M4.78571 5L6.07142 14M6.07142 14L6.25469 15.2828C6.39545 16.2681 7.23929 17 8.23459 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 17.8954 7.89543 17 9 17C10.1046 17 11 17.8954 11 19Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {opened &&
                <div className="absolute top-12 right-0 w-80 p-5 overflow-auto bg-zinc-800">
                    {itemCount > 0 && (
                        <div className="flex flex-col">
                            {items.map(item => (
                                <span key={item.id} className="text-white">{item.quantity}x {item.name} - {item.formattedPrice}</span>
                            ))}
                            <button
                                className="px-3 py-2 mt-3 text-sm font-semibold rounded-xl bg-sky-400"
                                onClick={() => checkout()}
                            >
                                NA BLAGAJNO
                            </button>
                        </div>
                    )}
                    {itemCount === 0 && (
                        <div className="flex">
                            <span className="text-white">
                                Blagajna je prazna :(
                            </span>
                        </div>
                    )}                
                </div>
            }
        </div>
    )
}