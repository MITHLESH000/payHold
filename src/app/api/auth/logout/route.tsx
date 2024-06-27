import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();
console.log("login route");

export async function GET(request:NextRequest){
    try {
       const response = NextResponse.json({
            message:"Logout Successfully",
            success:true
        })

        response.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0)
        })

        return response

    } catch (error:any) {
        console.error("signup connection error", error);
        return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 });
        
    }
}