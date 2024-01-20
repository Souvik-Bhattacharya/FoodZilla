import { connectToDB } from "@/db/database";
import { Like } from "@/db/models/like";
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
        let likes = await Like.create({
            fid: res.fid,
            uid: uid
        })
        return Response.json(likes)
    }
    catch (error) {
        return Response.json({ error })
    }
}