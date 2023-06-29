import { STRIPE_API_VERSION } from "@/config";
import { formatPrice } from "@/utils/helpers";
import { NextResponse } from "next/server"
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: STRIPE_API_VERSION
});

export async function GET() {

    // Get products
    const products = await stripe.products.list()

    // Get prices
    const prices = await stripe.prices.list()

    // Match products with prices
    const finalProducts = products.data.map(product => {
        const price = prices.data.find(p => p.id === product.default_price)
        if (price && price.unit_amount) {
            const cents = price.unit_amount % 100
            const priceInDecimal = (price.unit_amount / 100) + (cents / 100)
            return {
                id: product.id,
                name: product.name,
                object: product.object,
                active: product.active,
                created: product.created,
                updated: product.updated,
                description: product.description,
                images: product.images,
                url: product.url,
                default_price: product.default_price,
                price: {
                    value: priceInDecimal,
                    currency: price.currency,
                    formatted: formatPrice(price.currency, priceInDecimal)
                }
            }
        }
    })
    return NextResponse.json(finalProducts)
}