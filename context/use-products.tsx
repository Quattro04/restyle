'use client'

import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';

// Create a new context
const ProductsContext = createContext<
    {
        products: Product[]
    }
>(
    {
        products: [],
    }
);

// Custom hook to access the context value
const useProductContext = () => useContext(ProductsContext);

export interface Product {
    id: string
    name: string
    object: string
    active: boolean
    created: number
    updated: number
    description: string | null
    images: string[]
    url: string | null
    default_price: string
    price: {
        value: number,
        currency: string,
        formatted: string
    }
}

const ProductsProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('api/products')
            const responseData = await response.json()
            setProducts(responseData)
        }
        fetchProducts()
    }, [])

    const value = {
        products
    };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export { ProductsProvider, useProductContext };
