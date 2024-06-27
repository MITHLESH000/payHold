import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

connectDB();
console.log("signup route");

export async function POST(req, res) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        console.log(`reqBody :${reqBody}`);
        // Validate input
        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save()
        console.log("saved user" + savedUser);
        // Send verification email
        const userId = savedUser._id.toString();

        await sendEmail({ email, emailType: "VERIFY", userId:userId});

        return NextResponse.json({ message: "User registered successfully", success: true, savedUser });
    } catch (error) {
        console.error("signup connection error", error);
        return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 });
    }
}
