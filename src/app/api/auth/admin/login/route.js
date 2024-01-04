import { connectToDB } from "@/db/database";
import { Admin } from "@/db/models/admin";
const jwt = require("jsonwebtoken")

export async function POST(request){
    connectToDB();
    const res = await request.json();
    let admin = await Admin.find({"email": res.email});
    let adminToken;
    if(admin[0].password === res.password){
        let data = {
            aid: admin[0]._id
        }
        adminToken = jwt.sign(data, process.env.JWT_KEY);
    }
    return Response.json({adminToken})
}