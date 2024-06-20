import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET as string);

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: data.amount,
            currency: "eur",
        });
        return NextResponse.json({ client_secret: paymentIntent.client_secret });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}; 

