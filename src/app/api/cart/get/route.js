import { connectToDB } from "@/db/database";
import { Cart } from "@/db/models/cart";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function GET(request) {
    connectToDB();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try{
        const data = jwt.verify(token, process.env.JWT_KEY);
        const uid = data.uid;
        let items = await Cart.find({ "uid": uid });
        return Response.json(items);
    }
    catch(error){
        return Response.json({ error })
    }
}