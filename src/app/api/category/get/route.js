import { connectToDB } from "@/db/database";
import { Category } from "@/db/models/category";

export async function GET(request) {
    connectToDB();
    try {
        const categories = await Category.find({});
        return Response.json(categories);
    } catch (error) {
        return Response.json({ error });
    }
}