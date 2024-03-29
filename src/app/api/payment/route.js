const stripe = require("stripe")(process.env.STRIPE_KEY);
// demo card no: 4000003560000008

export async function POST(request) {
    const res = await request.json();
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: res.items.map(item => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name
                        },
                        unit_amount: (item.price) * 100
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.HOST}/payment/success`,
            cancel_url: `${process.env.HOST}/payment/cancel`
        })

        return Response.json({ "url": session.url, 'status': 'ok' })
    } catch (error) {
        return Response.json({ error })
    }
}