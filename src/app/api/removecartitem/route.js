import { connectToDB } from "@/db/database";
import { Cartitem } from "@/db/models/cartItem";

export async function GET(request) {
    connectToDB();
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('id')
    if (query) {
        await Cartitem.findByIdAndDelete(query);
        return Response.json({ "error": false })
    }
    else {
        return Response.json({ "error": true })
    }
}