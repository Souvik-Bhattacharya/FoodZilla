import { connectToDB } from "@/db/database";
import { Like } from "@/db/models/like";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function GET(request) {
    connectToDB();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        const uid = data.uid;
        let likes = await Like.find({ "uid": uid });
        return Response.json(likes);
    }
    catch (error) {
        return Response.json({ error })
    }
}