import {connectDB} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connectDB()

export async function POST(request: NextRequest) {
    // data form token
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")

     if(!user){
        return NextResponse.json({message:"User not found in the token"
        })
     }
     return NextResponse.json({
        message:"User not found in the token",
        data:user
    })
}