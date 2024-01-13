import { connectToDB } from "@/db/database";
import { User } from "@/db/models/user";
import { headers } from 'next/headers'
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(request){
    connectToDB();
    const headersList = headers();
    const token = headersList.get('usertoken');
    const res = await request.json();
    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        const uid = data.uid;
        // let salt = await bcrypt.genSalt(10);
        // let hashedPassword = await bcrypt.hash(res.password, salt);
        // res.password = hashedPassword
        await User.findByIdAndUpdate(uid, {$set: res});
        return Response.json({"error": false})
    } catch (error) {
        return Response.json({"error": error})
    }
}