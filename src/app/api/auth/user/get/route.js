import { connectToDB } from "@/db/database";
import { User } from "@/db/models/user";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function GET(request) {
    connectToDB();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        const uid = data.uid;
        let user = await User.findById(uid).select("-_id -__v");
        return Response.json(user);
    }
    catch (error) {
        return Response.json({ error })
    }
}