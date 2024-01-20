import { connectToDB } from "@/db/database";
import { Food } from "@/db/models/food";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function POST(request) {
    connectToDB();
    const headersList = headers();
    const token = headersList.get("usertoken");
    const res = await request.json();
    try {
        jwt.verify(token, process.env.JWT_KEY);
        await Food.findByIdAndUpdate(res.fid, { "likes": res.like })
        return Response.json({ status: 'ok' })
    } catch (error) {
        return Response.json({ error })
    }
}