import { connectToDB } from "@/db/database";
import { User } from "@/db/models/user";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(request) {
    connectToDB();
    const res = await request.json();
    try {
        const data = jwt.verify(res.userToken, process.env.JWT_KEY);
        const uid = data.uid;
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(res.password, salt);
        await User.findByIdAndUpdate(uid, {password: hashedPassword});
        return Response.json({ "status": "Password Updated Successfully" })
    } catch (error) {
        return Response.json({"error": error})
    }
}