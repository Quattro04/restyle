'use client'

import Image from "next/image";
import Layout from "../components/Layout";
import { useShoppingCartContext } from "@/context/use-shopping-cart";
import { useProductContext } from "@/context/use-products";

export default function Products() {

    const { addItem } = useShoppingCartContext();
    const { products } = useProductContext();

    return (
        <Layout>
            <main className="flex-1 flex flex-col items-center justify-between p-24 bg-zinc-900 overflow-auto">
                <div className="flex flex-wrap items-center justify-center">
                    {products.map((product) => (
                        <div key={product.id} className="w-64 h-96 flex flex-col m-3 rounded-xl bg-zinc-800">
                            <div className="flex-[2_2_0%] overflow-hidden relative">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-between p-5 mt-2">
                                <h2 className="text-white">{product.name}</h2>
                                <p className="text-white my-2">
                                    {product.price.formatted}
                                </p>
                                <button
                                    className="px-3 py-2 text-sm font-semibold rounded-xl bg-sky-400"
                                    onClick={() => addItem(product)}
                                >
                                    V KOŠARICO
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </Layout>
    )
}