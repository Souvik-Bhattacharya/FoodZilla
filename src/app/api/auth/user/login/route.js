import { connectToDB } from "@/db/database";
import { User } from "@/db/models/user";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const JWT_KEY = "souvikrox"

export async function POST(request){
    connectToDB();
    const res = await request.json();
    let user = await User.find({"email": res.email});
    let userToken;
    if(user.length != 0){
        let result = await bcrypt.compare(res.password, user[0].password)
        if(result){
            let data = {
                uid: user[0]._id
            }
            userToken = jwt.sign(data, JWT_KEY);
            return Response.json({userToken});
        }
        else{
            return Response.json({error: true});
        }
    }
    else{
        return Response.json({error: true});
    }
}