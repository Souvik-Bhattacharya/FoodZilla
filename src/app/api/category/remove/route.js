import { connectToDB } from "@/db/database";
import { Category } from "@/db/models/category";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function DELETE(request){
    connectToDB();
    const headersList = headers();
    const token = headersList.get('admintoken');
    const res = await request.json();
    try {
        jwt.verify(token, process.env.JWT_KEY);
        await Category.deleteMany(res);
        return Response.json({"error": false})
    } catch (error) {
        return Response.json({"error": error.message()})
    }
}