import { connectToDB } from "@/db/database";
import { User } from "@/db/models/user";
import { headers } from "next/headers";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(request) {
    connectToDB();
    const res = await request.json();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        const uid = data.uid;
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(res.password, salt);
        await User.findByIdAndUpdate(uid, {password: hashedPassword});
        return Response.json({ "error": false })
    } catch (error) {
        return Response.json({error})
    }
}