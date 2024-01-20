import { connectToDB } from "@/db/database";
import { Order } from "@/db/models/order";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function GET(request) {
    connectToDB();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        const uid = data.uid;
        let items = await Order.find({ "uid": uid });
        return Response.json(items);
    }
    catch (error) {
        return Response.json({ error })
    }
}