import { connectToDB } from "@/db/database";
import { Cart } from "@/db/models/cart";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function POST(request) {
    connectToDB();
    const res = await request.json();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try{
        const data = jwt.verify(token, process.env.JWT_KEY);
        const uid = data.uid;
        await Cart.create({
            uid: uid,
            image: res.image,
            name: res.name,
            price: res.price,
            quantity: res.quantity,
            amount: res.amount
        })
        return Response.json({ "error": false })
    }
    catch(error){
        return Response.json({ "error": true })
    }
}