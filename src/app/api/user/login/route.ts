import Users from "@/model/userModel";
import jwt from "jsonwebtoken"
import { connect } from "@/dbConfig/dbConfig"; 
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;
        const user = await Users.findOne({email: email});
        const token = jwt.sign({email: email}, "SECRET", { expiresIn: '1d' });

        if(!user) {
            return NextResponse.json({message: "User does not exist"});
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if(passwordMatch) {
            return NextResponse.json({
                message: "Logged In successfully",
                success: true,
                token
            });
        }

        return NextResponse.json({
            message: "Password incorrect",
            success: false,
            token
        });        
        
    } catch(error: any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}


