import { connectToDB } from "@/db/database";
import { User } from "@/db/models/user";
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
        let users = await User.find({ "_id": uid });
        return Response.json(users);
    }
    catch{
        return Response.json({ "error": true })
    }
}