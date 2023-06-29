'use client'

import React, { useState, useContext, createContext, ReactNode } from 'react';
import { Product } from './use-products';
import { formatPrice } from '@/utils/helpers';

// Create a new context
const ShoppingCartContext = createContext<
    {
        items: ShoppingCartItem[]
        itemCount: number
        addItem: (product: Product) => void
    }
>(
    {
        items: [],
        itemCount: 0,
        addItem: () => {}
    }
);

// Custom hook to access the context value
const useShoppingCartContext = () => useContext(ShoppingCartContext);

interface ShoppingCartItem {
    id: string
    name: string
    formattedPrice: string
    quantity: number
}

// Provider component that wraps the components needing access to the shared state
const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<ShoppingCartItem[]>([]);

    const addItem = (product: Product) => {

        const idx = items.findIndex(i => i.id === product.id)
        if (idx > -1) {
            const newItems = JSON.parse(JSON.stringify(items))
            newItems[idx].quantity++
            newItems[idx].formattedPrice = formatPrice(product.price.currency, product.price.value * newItems[idx].quantity)
            setItems(newItems)
        } else {
            setItems([
                ...items,
                {
                    id: product.id,
                    name: product.name,
                    formattedPrice: formatPrice(product.price.currency, product.price.value),
                    quantity: 1
                }
            ]);
        }       
    };

    // Value object containing the state and update function
    const value = {
        items,
        itemCount: items.length,
        addItem,
    };

    return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
};

export { ShoppingCartProvider, useShoppingCartContext };
