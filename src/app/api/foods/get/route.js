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
        let page = searchParams.get('page')
        if (query) {
            foods = await Food.find({ "category": query }).skip(page * 10).limit(10)
        }
        else {
            foods = await Food.find({}).skip(page * 10).limit(10);
        }
    }
    return Response.json(foods);
}