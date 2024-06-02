import Users from "@/model/userModel";
import jwt from "jsonwebtoken"
import { connect } from "@/dbConfig/dbConfig"; 
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();
        const {name, email, password} = reqBody;
        const user = await Users.findOne({email: email});
        if(user) {
            return NextResponse.json({message: "User already exist"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({
            name: name,
            email: email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });
    } catch(error: any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}


