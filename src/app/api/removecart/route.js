import { connectToDB } from "@/db/database";
import { Cartitem } from "@/db/models/cartItem";
import { headers } from 'next/headers'
const jwt = require("jsonwebtoken");

export async function DELETE(request) {
    connectToDB();
    const headersList = headers();
    const token = headersList.get('usertoken');
    try{
        const data = jwt.verify(token, process.env.JWT_KEY);
        const uid = data.uid;
        await Cartitem.deleteMany({ "uid": uid });
        return Response.json({"error": false});
    }
    catch(error){
        return Response.json({ "error": error })
    }
}