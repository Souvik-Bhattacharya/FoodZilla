import { connectToDB } from "@/db/database";
import { Cartitem } from "@/db/models/cartItem";
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
        const cart = await Cartitem.create({
            "uid": uid,
            "fid": res.fid,
            "quantity": res.quantity,
            "amount": res.amount
        })
        return Response.json({ "error": false })
    }
    catch{
        return Response.json({ "error": true })
    }
}