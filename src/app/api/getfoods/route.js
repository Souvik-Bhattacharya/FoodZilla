import { connectToDB } from "@/db/database";
import { Food } from "@/db/models/food";

export async function GET(request) {
    connectToDB();
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('item')
    let foods;
    if(query){
        foods = await Food.find({"category": query});
    }
    else{
        foods = await Food.find({});
    }
    return Response.json(foods);
  }