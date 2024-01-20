import { connectToDB } from "@/db/database";
import { Cart } from "@/db/models/cart";
import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

export async function DELETE(request) {
    connectToDB();
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('id')
    if (query) {
        await Cart.findByIdAndDelete(query);
        return Response.json({ "error": false })
    }
    else {
        const headersList = headers();
        const token = headersList.get('usertoken');
        try {
            const data = jwt.verify(token, process.env.JWT_KEY);
            const uid = data.uid;
            await Cart.deleteMany({ uid });
            return Response.json({ status: 'ok' });
        }
        catch (error) {
            return Response.json({ error })
        }
    }
}