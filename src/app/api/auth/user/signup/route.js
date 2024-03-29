import { connectToDB } from "@/db/database";
import { User } from "@/db/models/user";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(request) {
    connectToDB();
    const res = await request.json();
    let result = await User.find({ "email": res.email });
    let userToken;
    if (result.length == 0) {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(res.password, salt);
        let user = await User.create({
            name: res.name,
            email: res.email,
            contact: res.contact,
            address: res.address,
            pincode: res.pincode,
            district: res.district,
            state: res.state,
            country: res.country,
            password: hashedPassword,
            image: res.image
        });
        let data = {
            uid: user._id
        }
        userToken = jwt.sign(data, process.env.JWT_KEY);
        return Response.json({ userToken })
    }
    else {
        return Response.json({ error: true })
    }
}