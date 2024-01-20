import { connectToDB } from "@/db/database";
import { User } from "@/db/models/user";
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});

export async function POST(request) {
    connectToDB();
    const res = await request.json();
    let user = await User.find({ "email": res.email });
    let userToken;
    if (user.length != 0) {
        let data = {
            uid: user[0]._id
        }
        try {
            userToken = jwt.sign(data, process.env.JWT_KEY);
            await transporter.sendMail({
                from: '"FoodZilla" <support@foodzilla.org.in>', // sender address
                to: `${user[0].email}`, // list of receivers
                subject: "Reset Password", // Subject line
                html:
                    `<h4>To change your password click on the link below!</h4>
                <hr/>
                <b>${process.env.HOST}/user/reset/${userToken}</b>`, // html body
            });
            return Response.json({ status: 'ok' });
        } catch (error) {
            return Response.json({ error })
        }
    }
    else {
        return Response.json({ error: true });
    }
}