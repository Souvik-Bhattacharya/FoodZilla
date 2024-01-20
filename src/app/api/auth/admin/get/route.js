import { connectToDB } from "@/db/database";
import { Admin } from "@/db/models/admin";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function GET(request) {
    connectToDB();
    const headersList = headers();
    const token = headersList.get('admintoken');
    try{
        const data = jwt.verify(token, process.env.JWT_KEY);
        const aid = data.aid;
        let admin = await Admin.findById(aid).select("-_id -__v");
        return Response.json(admin);
    }
    catch(error){
        return Response.json({ error })
    }
}