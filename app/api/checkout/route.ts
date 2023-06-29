import { STRIPE_API_VERSION } from '@/config';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: STRIPE_API_VERSION
});

export async function POST(req: Request) {
    try {
        const { cartItems } = await req.json()

        const session = await stripe.checkout.sessions.create({
            success_url: `${req.headers.get('origin')}/order-success`,
            line_items: cartItems,
            mode: 'payment',
        });
        return NextResponse.json(session)
    } catch (err: any) {
        return NextResponse.json({ statusCode: 500, message: err.message })
    }
}
