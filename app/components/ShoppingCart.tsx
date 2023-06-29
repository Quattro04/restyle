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
        <div className="relative">
            <button className="ml-auto" onClick={() => setOpened(!opened)}>
                <Image width="28" height="28" src="/shopping-cart.svg" alt="shopping cart" />
            </button>
            {opened &&
                <div className="absolute top-12 right-0 w-80 p-5 overflow-auto bg-slate-900">
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