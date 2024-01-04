import { connectToDB } from "@/db/database";
import { Cartitem } from "@/db/models/cartItem";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function GET(request) {
    connectToDB();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try{
        const data = jwt.verify(token, process.env.JWT_KEY);
        const uid = data.uid;
        let items = await Cartitem.find({ "uid": uid });
        return Response.json(items);
    }
    catch{
        return Response.json({ "error": true })
    }
}