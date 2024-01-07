import { connectToDB } from "@/db/database";
import { Order } from "@/db/models/order";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function GET(request) {
    connectToDB();
    const headersList = headers();
    const token = headersList.get('admintoken');
    try{
        jwt.verify(token, process.env.JWT_KEY);
        let orders = await Order.find({});
        return Response.json(orders);
    }
    catch(error){
        return Response.json({ "error": error })
    }
}