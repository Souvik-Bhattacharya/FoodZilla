import { connectToDB } from "@/db/database";
import { Food } from "@/db/models/food";

export async function GET(request) {
    connectToDB();
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('id')
    let foods;
    if (query) {
        foods = await Food.find({ "_id": query });
        return Response.json(foods);
    }
    else {
        return Response.json({ "error": true })
    }
}