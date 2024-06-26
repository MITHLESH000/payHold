import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from  "jsonwebtoken"
connectDB();
console.log("login route");

export async function POST(request:NextRequest) {
    try {
        
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(`reqBody :${reqBody}`);

        console.log(`${reqBody.email}and ${reqBody.password}`)
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({message:"User does not exists"}, {status:400})
        }
        console.log("user exists");

        const validPassword = bcryptjs.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json({error:"Check your credentials"}, {status:400})
        }
        // jwt token
        const tokenData ={
            id: user._id,
            username:user.username,
            email:user.email
        }
       const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1d"});
         
        const respons = NextResponse.json({
            messsge:"Logged In Success",
            success:true
        })

        respons.cookies.set("token",token, {
            httpOnly:true
        })
        return respons

    } catch (error:any) {
        console.error("signup connection error", error);
        return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 });
        
    }
}