import { connectToDB } from "@/db/database";
import { Food } from "@/db/models/food";

export async function GET(request) {
    connectToDB();
    const searchParams = request.nextUrl.searchParams
    let query = searchParams.get('id')
    let foods;
    if (query) {
        foods = await Food.find({ "_id": query });
    }
    else {
        query = searchParams.get('category')
        if (query) {
            foods = await Food.find({ "category": query })
        }
        else {
            foods = await Food.find({});
        }
    }
    return Response.json(foods);
}