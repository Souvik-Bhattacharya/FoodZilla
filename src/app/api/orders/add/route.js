import { connectToDB } from "@/db/database";
import { Order } from "@/db/models/order";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function POST(request) {
    connectToDB();
    const res = await request.json();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        const uid = data.uid;
        const date = new Date();
        const dateString = date.toDateString();
        await Order.create({
            uid: uid,
            user: res.user,
            address: res.address,
            pincode: res.pincode,
            date: dateString,
            image: res.image,
            name: res.name,
            price: res.price,
            quantity: res.quantity,
            amount: res.amount
        })
        return Response.json({ "error": false })
    }
    catch(error) {
        return Response.json({ "error": true })
    }
}