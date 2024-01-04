import { connectToDB } from "@/db/database";
import { Orderitem } from "@/db/models/order";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

const JWT_KEY = "souvikrox";

export async function GET(request) {
    connectToDB();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try{
        const data = jwt.verify(token, JWT_KEY);
        const uid = data.uid;
        let items = await Orderitem.find({ "uid": uid });
        return Response.json(items);
    }
    catch{
        return Response.json({ "error": true })
    }
}