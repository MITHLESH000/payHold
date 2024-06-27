import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connectDB();
console.log("verifyemail route");

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        // const token = "$2a$10$S2D4R0E308wGnLt70J.gcemvNHhQX9hfL0ZFnBPouwAd4KUOCFgHW"
        const newToken = token.toString();
        console.log(`token: ${newToken}`);
        //,verifyTokenExpiry: {$gt:Date.now()}
        const user = await User.findOne({ verifyToken: newToken })
        console.log(`user: ${user}`);

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }
        console.log(`user: ${user}`);

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({ message: "Email verified successfully", success: true },
            { status: 200 })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}