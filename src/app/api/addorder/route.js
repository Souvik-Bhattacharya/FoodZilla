import { connectToDB } from "@/db/database";
import { Orderitem } from "@/db/models/order";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

const JWT_KEY = "souvikrox";

export async function POST(request) {
    connectToDB();
    const res = await request.json();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try {
        const data = jwt.verify(token, JWT_KEY);
        const uid = data.uid;
        const date = new Date();
        const dateString = date.toDateString();
        const order = await Orderitem.create({
            "uid": uid,
            "date": dateString,
            "fid": res.fid,
            "name": res.name,
            "category": res.category,
            "desc": res.desc,
            "price": res.price,
            "cid": res.cid,
            "quantity": res.quantity,
            "amount": res.amount
        })
        return Response.json({ "error": false })
    }
    catch {
        return Response.json({ "error": true })
    }
}