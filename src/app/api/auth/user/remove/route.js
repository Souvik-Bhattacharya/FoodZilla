import { connectToDB } from "@/db/database";
import { User } from "@/db/models/user";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function DELETE(request) {
    connectToDB();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        const uid = data.uid;
        await User.findByIdAndDelete(uid);
        return Response.json({ status: 'ok' })
    }
    catch (error) {
        return Response.json({ error })
    }
}