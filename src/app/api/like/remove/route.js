import { connectToDB } from "@/db/database";
import { Like } from "@/db/models/like";
import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

export async function DELETE(request) {
    connectToDB();
    const res = await request.json();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try {
        jwt.verify(token, process.env.JWT_KEY);
        await Like.deleteMany({ fid: res.fid });
        return Response.json({ status: 'ok' });
    }
    catch (error) {
        return Response.json({ error })
    }
}